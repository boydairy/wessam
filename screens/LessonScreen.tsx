
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { findLessonById } from '../utils/helpers';
import { Button } from '../components/Button';
import { AppRoute } from '../types';

export const LessonScreen: React.FC = () => {
  const { gradeId, semesterId, lessonId } = useParams<{ gradeId: string; semesterId: string; lessonId: string }>();
  const lesson = findLessonById(lessonId || '');

  if (!lesson) {
    return (
      <div className="text-center text-red-600 text-2xl animate-fade-in">
        <p>الدرس غير موجود.</p>
        <Link to={AppRoute.DASHBOARD} className="text-blue-600 hover:underline mt-4 block">
          العودة للوحة التحكم
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-4 md:p-8 bg-white rounded-3xl shadow-2xl border-4 border-yellow-400 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-700 mb-10 text-center animate-bounce-text">
        {lesson.name} - اختر الاختبار
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {lesson.quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            to={AppRoute.QUIZ.replace(':quizId', quiz.id)}
            className="block transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl"
          >
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-8 rounded-2xl flex flex-col items-center justify-center h-48 md:h-56 shadow-lg border-2 border-yellow-300">
              <span className="text-6xl mb-4" role="img" aria-label="quiz">
                {quiz.type === 'easy' ? '😊' : '🧠'}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-800">
                اختبار {quiz.type === 'easy' ? 'سهل (5 أسئلة)' : 'صعب (10 أسئلة)'}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
