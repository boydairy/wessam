import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findQuizById, findLessonById, generateQuizQuestions } from '../utils/helpers';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Option, Question, AppRoute, QuestionType, StoreItem } from '../types';
import { GRADES, STORE_ITEMS } from '../constants';

// Define `QuizCard` component outside `QuizScreen` to avoid re-rendering issues.
interface QuizCardProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  isAnswered: boolean;
  correctAnswerId: string | undefined;
  revealedAnswerId: string | undefined;
  optionsToDisplay: Option[]; // Added to allow modified options for 'remove_wrong_options'
}

const QuizCard: React.FC<QuizCardProps> = React.memo(({
  question,
  selectedOptionId,
  onSelectOption,
  isAnswered,
  correctAnswerId,
  revealedAnswerId,
  optionsToDisplay,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-indigo-300 animate-fade-in-up">
      <p className="text-2xl font-semibold mb-6 text-gray-800 text-center">{question.text}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {optionsToDisplay.map((option) => {
          let optionClasses = 'p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-lg text-gray-700';
          const isSelected = selectedOptionId === option.id;

          if (isAnswered) {
            if (option.id === correctAnswerId) {
              optionClasses += ' bg-green-200 border-green-500 text-green-800 font-bold';
            } else if (isSelected && option.id !== correctAnswerId) {
              optionClasses += ' bg-red-220 border-red-500 text-red-800 font-bold'; // Adjusted red shade for better visibility
            } else {
              optionClasses += ' bg-gray-100 border-gray-200';
            }
          } else {
            optionClasses += isSelected ? ' bg-blue-100 border-blue-500' : ' hover:bg-gray-50 border-gray-300';
          }

          if (revealedAnswerId === option.id) {
            optionClasses += ' bg-yellow-200 border-yellow-500 text-yellow-800 font-bold animate-pulse';
          }

          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={optionClasses}
              disabled={isAnswered}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
});


export const QuizScreen: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { addCoins, purchasedItems, applyHelp } = useGame();

  const quiz = findQuizById(quizId || '');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [revealedAnswerId, setRevealedAnswerId] = useState<string | undefined>(undefined);
  const [optionsToDisplay, setOptionsToDisplay] = useState<Option[]>([]);

  const fetchQuestions = useCallback(async () => {
    if (!quiz) return;
    setIsLoading(true);
    setError(null);
    try {
      const lessonId = quiz.id.substring(0, 6); // e.g., 'g5s1l1'
      const gradeId = quiz.id.charAt(1);
      const semesterId = quiz.id.charAt(3);
      
      const lesson = findLessonById(lessonId);
      const grade = GRADES.find(g => g.id === gradeId);
      const semester = grade?.semesters.find(s => s.id === semesterId);
      
      if (!lesson || !grade || !semester) throw new Error('Could not find lesson, grade, or semester details.');

      const numQuestions = quiz.type === 'easy' ? 5 : 10;
      const generatedQuestions = await generateQuizQuestions(lesson.name, grade.name, semester.name, numQuestions);
      setQuestions(generatedQuestions);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [quiz]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const shuffleArray = useCallback((array: Option[]): Option[] => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestionIndex]) {
      const currentQuestion = questions[currentQuestionIndex];
      setSelectedOptionId(null);
      setIsAnswered(false);
      setFeedback(null);
      setRevealedAnswerId(undefined);
      setOptionsToDisplay(currentQuestion.options ? shuffleArray(currentQuestion.options) : []);
    }
  }, [currentQuestionIndex, questions, shuffleArray]);
  
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!quiz) {
      navigate(AppRoute.DASHBOARD);
    }
  }, [quiz, navigate]);

  const handleSelectOption = useCallback((optionId: string) => {
    if (!isAnswered) {
      setSelectedOptionId(optionId);
      setRevealedAnswerId(undefined);
    }
  }, [isAnswered]);

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || selectedOptionId === null) return;

    setIsAnswered(true);
    if (selectedOptionId === currentQuestion.correctAnswerId) {
      setScore(prevScore => prevScore + 1);
      setFeedback('إجابة صحيحة! 🎉');
    } else {
      setFeedback(`إجابة خاطئة. الإجابة الصحيحة هي: ${currentQuestion.options?.find(o => o.id === currentQuestion.correctAnswerId)?.text} 🙁`);
    }
  }, [currentQuestion, selectedOptionId]);

  const handleNextQuestion = useCallback(() => {
    if (!quiz) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      addCoins(quiz.coinsReward);
      setShowResultModal(true);
    }
  }, [quiz, currentQuestionIndex, questions, addCoins]);

  const handleApplyHelp = useCallback((purchaseId: string, question: Question) => {
    const result = applyHelp(purchaseId, question);
    if (result.revealedAnswerId) {
      setRevealedAnswerId(result.revealedAnswerId);
      setFeedback('تم كشف الإجابة الصحيحة!');
    } else if (result.updatedOptions) {
      setOptionsToDisplay(result.updatedOptions);
      setFeedback('تم إزالة خيارين خاطئين!');
    }
    setShowHelpModal(false);
  }, [applyHelp]);


  if (!quiz) {
    return (
      <div className="text-center text-red-600 text-2xl animate-fade-in">
        <p>الاختبار غير موجود.</p>
        <Button onClick={() => navigate(AppRoute.DASHBOARD)} className="mt-4">
          العودة للوحة التحكم
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center text-indigo-700 text-2xl animate-fade-in">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-indigo-500"></div>
        <p>يتم إنشاء أسئلة جديدة وفريدة من أجلك...</p>
      </div>
    );
  }

  if (error || !currentQuestion) {
    return (
      <div className="text-center text-red-600 text-2xl animate-fade-in">
        <p>حدث خطأ أثناء إنشاء الأسئلة.</p>
        <p className="text-lg mt-2">{error}</p>
        <Button onClick={() => fetchQuestions()} className="mt-4">
          حاول مرة أخرى
        </Button>
      </div>
    );
  }

  const availableHelpItems: (StoreItem & { purchaseId: string })[] = purchasedItems
    .map(purchaseId => {
        const baseItemId = purchaseId.split('-')[0];
        const item = STORE_ITEMS.find(si => si.id === baseItemId);
        if (item && (item.effect === 'reveal_answer' || item.effect === 'remove_wrong_options')) {
            return { ...item, purchaseId };
        }
        return null;
    })
    .filter(Boolean) as (StoreItem & { purchaseId: string })[];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-4 md:p-8 bg-white rounded-3xl shadow-2xl border-4 border-indigo-400 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 text-center animate-bounce-text">
        {quiz.type === 'easy' ? 'اختبار سهل' : 'اختبار صعب'}
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        السؤال {currentQuestionIndex + 1} من {questions.length}
      </p>

      {currentQuestion.type === QuestionType.MCQ && (
        <QuizCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
          isAnswered={isAnswered}
          correctAnswerId={currentQuestion.correctAnswerId}
          revealedAnswerId={revealedAnswerId}
          optionsToDisplay={optionsToDisplay}
        />
      )}

      {feedback && (
        <p className={`text-xl font-bold mt-4 animate-fade-in ${isAnswered && selectedOptionId === currentQuestion.correctAnswerId ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
        {!isAnswered ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedOptionId === null}
            className="w-full sm:w-auto"
            variant="primary"
            size="lg"
          >
            تأكيد الإجابة
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full sm:w-auto" variant="success" size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
          </Button>
        )}
        <Button
            onClick={() => setShowHelpModal(true)}
            className="w-full sm:w-auto"
            variant="secondary"
            size="lg"
            disabled={isAnswered || availableHelpItems.length === 0}
        >
            مساعدة 💡 ({availableHelpItems.length})
        </Button>
      </div>

      <Modal isOpen={showResultModal} onClose={() => navigate(AppRoute.DASHBOARD)} title="نتيجة الاختبار">
        <p className="text-xl mb-4">
          لقد حصلت على {score} من {questions.length} إجابة صحيحة!
        </p>
        <p className="text-xl">
          فزت بـ {quiz.coinsReward} قطعة نقدية! 💰
        </p>
        <Button onClick={() => navigate(AppRoute.DASHBOARD)} className="mt-6 w-full" variant="primary">
          العودة للوحة التحكم
        </Button>
      </Modal>

      <Modal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} title="المساعدات المتوفرة">
        {availableHelpItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
                {availableHelpItems.map(item => (
                    <div key={item.purchaseId} className="p-4 border rounded-lg flex justify-between items-center bg-gray-50">
                        <div>
                            <p className="text-lg font-bold">{item.icon} {item.name}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Button
                            onClick={() => handleApplyHelp(item.purchaseId, currentQuestion)}
                            variant="primary"
                            size="sm"
                            disabled={isAnswered}
                        >
                            استخدام
                        </Button>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-lg text-gray-600">لا توجد مساعدات متوفرة. اذهب إلى المتجر لشراء المزيد!</p>
        )}
      </Modal>
    </div>
  );
};