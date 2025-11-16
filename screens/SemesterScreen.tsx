
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GRADES } from '../constants';
import { Button } from '../components/Button';
import { AppRoute } from '../types';

export const SemesterScreen: React.FC = () => {
  const { gradeId, semesterId } = useParams<{ gradeId: string; semesterId: string }>();
  const grade = GRADES.find((g) => g.id === gradeId);
  const semester = grade?.semesters.find((s) => s.id === semesterId);

  if (!grade || !semester) {
    return (
      <div className="text-center text-red-600 text-2xl animate-fade-in">
        <p>الفصل الدراسي غير موجود.</p>
        <Link to={AppRoute.DASHBOARD} className="text-blue-600 hover:underline mt-4 block">
          العودة للوحة التحكم
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-4 md:p-8 bg-white rounded-3xl shadow-2xl border-4 border-teal-400 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-10 text-center animate-bounce-text">
        {grade.name} - {semester.name} - الدروس
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {semester.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={AppRoute.LESSON.replace(':gradeId', grade.id).replace(':semesterId', semester.id).replace(':lessonId', lesson.id)}
            className="block transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 rounded-xl"
          >
            <div className="bg-gradient-to-r from-teal-200 to-green-200 p-6 rounded-xl flex flex-col items-center justify-center h-32 text-center shadow-md border-2 border-teal-300">
              <span className="text-4xl mb-2" role="img" aria-label="lesson">📖</span>
              <h3 className="text-xl md:text-2xl font-bold text-teal-800 leading-tight">{lesson.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
