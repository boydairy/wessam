import { GoogleGenAI, Type } from '@google/genai';
import { GRADES } from '../constants';
import { Question } from '../types';

export function generateUniqueId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to find a lesson by ID
export function findLessonById(lessonId: string) {
  for (const grade of GRADES) {
    for (const semester of grade.semesters) {
      const lesson = semester.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

// Helper to find a quiz by ID
export function findQuizById(quizId: string) {
  for (const grade of GRADES) {
    for (const semester of grade.semesters) {
      for (const lesson of semester.lessons) {
        const quiz = lesson.quizzes.find(q => q.id === quizId);
        if (quiz) {
          return quiz;
        }
      }
    }
  }
  return undefined;
}

// AI Helper to generate quiz questions using Gemini
export async function generateQuizQuestions(lessonName: string, gradeName: string, semesterName: string, numQuestions: number): Promise<Question[]> {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const questionSchema = {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'معرف فريد للسؤال، مثال: "q1"' },
      type: { type: Type.STRING, description: "يجب أن يكون دائماً 'mcq'" },
      text: { type: Type.STRING, description: 'نص السؤال' },
      options: {
        type: Type.ARRAY,
        description: 'يجب أن يحتوي على 4 خيارات بالضبط.',
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "معرف فريد للخيار، مثال: 'opt1'" },
            text: { type: Type.STRING, description: 'نص خيار الإجابة' },
          },
          required: ['id', 'text']
        }
      },
      correctAnswerId: { type: Type.STRING, description: 'معرف الخيار الصحيح' },
      hintCost: { type: Type.INTEGER, description: 'تكلفة التلميح، يجب أن تكون دائماً 5' }
    },
    required: ['id', 'type', 'text', 'options', 'correctAnswerId', 'hintCost']
  };

  const quizSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        description: `مصفوفة تحتوي على ${numQuestions} سؤالاً.`,
        items: questionSchema
      }
    },
    required: ['questions']
  };

  const prompt = `أنت معلم خبير في قواعد اللغة العربية للمنهج العماني.
قم بإنشاء اختبار لطلاب ${gradeName} للفصل الدراسي ${semesterName}.
أنشئ ${numQuestions} سؤالاً اختيارياً حول موضوع الدرس "${lessonName}".
يجب أن تكون الأسئلة متوافقة تمامًا مع محتوى وأهداف المنهج الدراسي لسلطنة عمان.
يجب أن يكون لكل سؤال إجابة واحدة صحيحة وثلاث إجابات خاطئة ولكن معقولة.
يجب أن تكون اللغة واضحة وبسيطة ومناسبة للطلاب في هذا الصف.
تأكد من أن معرفات الأسئلة ومعرفات الخيارات فريدة من نوعها.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: quizSchema,
        temperature: 0.8, // Add some creativity to the questions
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result && result.questions && Array.isArray(result.questions)) {
      // Basic validation to ensure the response matches our expected structure
      return result.questions.map((q: any) => ({
        ...q,
        // Ensure options are always present as an array
        options: q.options || [],
      }));
    } else {
      throw new Error('Failed to parse questions from AI response.');
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Could not generate new questions. Please try again.");
  }
}