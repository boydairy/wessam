
export interface User {
  name: string;
  avatar: string; // Emoji
}

export interface Option {
  id: string;
  text: string;
}

export enum QuestionType {
  MCQ = 'mcq',
  FILL_IN_BLANK = 'fill-in-blank', // Not explicitly used but good for extensibility
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: Option[]; // For MCQ
  correctAnswerId?: string; // For MCQ
  correctAnswerText?: string; // For fill-in-blank (not implemented yet)
  hintCost: number;
}

export interface Quiz {
  id: string;
  type: 'easy' | 'hard';
  questions?: Question[];
  coinsReward: number;
}

export interface Lesson {
  id: string;
  name: string;
  quizzes: Quiz[];
}

export interface Semester {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface Grade {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  effect: 'reveal_answer' | 'remove_wrong_options' | 'cosmetic_frame' | 'cosmetic_badge'; // Added new cosmetic effects
  icon: string; // Emoji
  visualAsset?: string; // New property for cosmetic items (e.g., CSS class, emoji string)
}

export enum AppRoute {
  LOGIN = '/',
  DASHBOARD = '/dashboard',
  GRADE = '/grade/:gradeId',
  SEMESTER = '/grade/:gradeId/semester/:semesterId',
  LESSON = '/grade/:gradeId/semester/:semesterId/lesson/:lessonId',
  QUIZ = '/quiz/:quizId',
  STORE = '/store',
}