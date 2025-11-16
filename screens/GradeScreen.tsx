
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GRADES } from '../constants';
import { Button } from '../components/Button';
import { AppRoute } from '../types';

export const GradeScreen: React.FC = () => {
  const { gradeId } = useParams<{ gradeId: string }>();
  const grade = GRADES.find((g) => g.id === gradeId);

  if (!grade) {
    return (
      <div className="text-center text-red-600 text-2xl animate-fade-in">
        <p>الصف الدراسي غير موجود.</p>
        <Link to={AppRoute.DASHBOARD} className="text-blue-600 hover:underline mt-4 block">
          العودة للوحة التحكم
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-4 md:p-8 bg-white rounded-3xl shadow-2xl border-4 border-pink-400 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-10 text-center animate-bounce-text">
        {grade.name} - اختر الفصل الدراسي
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {grade.semesters.map((semester) => (
          <Link
            key={semester.id}
            to={AppRoute.SEMESTER.replace(':gradeId', grade.id).replace(':semesterId', semester.id)}
            className="block transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 rounded-2xl"
          >
            <div className="bg-gradient-to-r from-pink-200 to-red-200 p-8 rounded-2xl flex flex-col items-center justify-center h-48 md:h-64 shadow-lg border-2 border-pink-300">
              <span className="text-6xl mb-4" role="img" aria-label="calendar">🗓️</span>
              <h3 className="text-3xl md:text-4xl font-bold text-pink-800">{semester.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
