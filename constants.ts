
import { Grade, Lesson, Quiz, StoreItem } from './types';

export const EMOJI_AVATARS: string[] = [
  '😁', '🤩', '🥳', '😎', '🤓', '😇', '🚀', '🌟', '💡', '📚'
];

const createQuiz = (idPrefix: string, type: 'easy' | 'hard'): Quiz => {
  const numQuestions = type === 'easy' ? 5 : 10;
  return {
    id: `${idPrefix}-${type}`,
    type,
    coinsReward: type === 'easy' ? 10 : 20,
  };
};

// --- GRADE 5 SEMESTER 1 ---
const grade5_s1_l1_quizzes: Quiz[] = [createQuiz('g5s1l1', 'easy'), createQuiz('g5s1l1', 'hard')];
const grade5_s1_l2_quizzes: Quiz[] = [createQuiz('g5s1l2', 'easy'), createQuiz('g5s1l2', 'hard')];
const grade5_s1_l3_quizzes: Quiz[] = [createQuiz('g5s1l3', 'easy'), createQuiz('g5s1l3', 'hard')];
const grade5_s1_l4_quizzes: Quiz[] = [createQuiz('g5s1l4', 'easy'), createQuiz('g5s1l4', 'hard')];
const grade5_s1_l5_quizzes: Quiz[] = [createQuiz('g5s1l5', 'easy'), createQuiz('g5s1l5', 'hard')];
const grade5_s1_l6_quizzes: Quiz[] = [createQuiz('g5s1l6', 'easy'), createQuiz('g5s1l6', 'hard')];
const grade5_s1_l7_quizzes: Quiz[] = [createQuiz('g5s1l7', 'easy'), createQuiz('g5s1l7', 'hard')];
const grade5_s1_l8_quizzes: Quiz[] = [createQuiz('g5s1l8', 'easy'), createQuiz('g5s1l8', 'hard')];

// --- GRADE 5 SEMESTER 2 ---
const grade5_s2_l1_quizzes: Quiz[] = [createQuiz('g5s2l1', 'easy'), createQuiz('g5s2l1', 'hard')];
const grade5_s2_l2_quizzes: Quiz[] = [createQuiz('g5s2l2', 'easy'), createQuiz('g5s2l2', 'hard')];
const grade5_s2_l3_quizzes: Quiz[] = [createQuiz('g5s2l3', 'easy'), createQuiz('g5s2l3', 'hard')];
const grade5_s2_l4_quizzes: Quiz[] = [createQuiz('g5s2l4', 'easy'), createQuiz('g5s2l4', 'hard')];
const grade5_s2_l5_quizzes: Quiz[] = [createQuiz('g5s2l5', 'easy'), createQuiz('g5s2l5', 'hard')];
const grade5_s2_l6_quizzes: Quiz[] = [createQuiz('g5s2l6', 'easy'), createQuiz('g5s2l6', 'hard')];

// --- GRADE 6 SEMESTER 1 ---
const grade6_s1_l1_quizzes: Quiz[] = [createQuiz('g6s1l1', 'easy'), createQuiz('g6s1l1', 'hard')];
const grade6_s1_l2_quizzes: Quiz[] = [createQuiz('g6s1l2', 'easy'), createQuiz('g6s1l2', 'hard')];
const grade6_s1_l3_quizzes: Quiz[] = [createQuiz('g6s1l3', 'easy'), createQuiz('g6s1l3', 'hard')];
const grade6_s1_l4_quizzes: Quiz[] = [createQuiz('g6s1l4', 'easy'), createQuiz('g6s1l4', 'hard')];
const grade6_s1_l5_quizzes: Quiz[] = [createQuiz('g6s1l5', 'easy'), createQuiz('g6s1l5', 'hard')];
const grade6_s1_l6_quizzes: Quiz[] = [createQuiz('g6s1l6', 'easy'), createQuiz('g6s1l6', 'hard')];
const grade6_s1_l7_quizzes: Quiz[] = [createQuiz('g6s1l7', 'easy'), createQuiz('g6s1l7', 'hard')];

// --- GRADE 6 SEMESTER 2 ---
const grade6_s2_l1_quizzes: Quiz[] = [createQuiz('g6s2l1', 'easy'), createQuiz('g6s2l1', 'hard')];
const grade6_s2_l2_quizzes: Quiz[] = [createQuiz('g6s2l2', 'easy'), createQuiz('g6s2l2', 'hard')];
const grade6_s2_l3_quizzes: Quiz[] = [createQuiz('g6s2l3', 'easy'), createQuiz('g6s2l3', 'hard')];
const grade6_s2_l4_quizzes: Quiz[] = [createQuiz('g6s2l4', 'easy'), createQuiz('g6s2l4', 'hard')];
const grade6_s2_l5_quizzes: Quiz[] = [createQuiz('g6s2l5', 'easy'), createQuiz('g6s2l5', 'hard')];
const grade6_s2_l6_quizzes: Quiz[] = [createQuiz('g6s2l6', 'easy'), createQuiz('g6s2l6', 'hard')];


export const LESSONS: Lesson[] = [
  // Grade 5, Semester 1
  { id: 'g5s1l1', name: 'الإعراب والبناء', quizzes: grade5_s1_l1_quizzes },
  { id: 'g5s1l2', name: 'همزتا الوصل والقطع', quizzes: grade5_s1_l2_quizzes },
  { id: 'g5s1l3', name: 'الجملة الاسمية', quizzes: grade5_s1_l3_quizzes },
  { id: 'g5s1l4', name: 'الفاعل', quizzes: grade5_s1_l4_quizzes },
  { id: 'g5s1l5', name: 'إثبات همزة ابن وحذفها', quizzes: grade5_s1_l5_quizzes },
  { id: 'g5s1l6', name: 'المفعول به', quizzes: grade5_s1_l6_quizzes },
  { id: 'g5s1l7', name: 'شبه الجملة', quizzes: grade5_s1_l7_quizzes },
  { id: 'g5s1l8', name: 'من علامات الترقيم (الفاصلة)', quizzes: grade5_s1_l8_quizzes },
  // Grade 5, Semester 2
  { id: 'g5s2l1', name: 'كان وأخواتها', quizzes: grade5_s2_l1_quizzes },
  { id: 'g5s2l2', name: 'من علامات الترقيم (الفاصلة المنقوطة)', quizzes: grade5_s2_l2_quizzes },
  { id: 'g5s2l3', name: 'إعراب جملة كان وأخواتها', quizzes: grade5_s2_l3_quizzes },
  { id: 'g5s2l4', name: 'إن وأخواتها وإعرابها', quizzes: grade5_s2_l4_quizzes },
  { id: 'g5s2l5', name: 'الألف في آخر الأسماء والأفعال', quizzes: grade5_s2_l5_quizzes },
  { id: 'g5s2l6', name: 'من علامات الترقيم (التنصيص)', quizzes: grade5_s2_l6_quizzes },

  // Grade 6, Semester 1
  { id: 'g6s1l1', name: 'المضاف إليه', quizzes: grade6_s1_l1_quizzes },
  { id: 'g6s1l2', name: 'أنواع الخبر', quizzes: grade6_s1_l2_quizzes },
  { id: 'g6s1l3', name: 'الفعل المبني للمجهول', quizzes: grade6_s1_l3_quizzes },
  { id: 'g6s1l4', name: 'الفعل اللازم والمتعدي', quizzes: grade6_s1_l4_quizzes },
  { id: 'g6s1l5', name: 'الفعل المجرد والمزيد', quizzes: grade6_s1_l5_quizzes },
  { id: 'g6s1l6', name: 'الهمزة المتوسطة على ألف وواو', quizzes: grade6_s1_l6_quizzes },
  { id: 'g6s1l7', name: 'علامات الترقيم: القوسان الهلاليان وعلامة الحذف', quizzes: grade6_s1_l7_quizzes },
  // Grade 6, Semester 2
  { id: 'g6s2l1', name: 'جمع المذكر السالم', quizzes: grade6_s2_l1_quizzes },
  { id: 'g6s2l2', name: 'المثنى', quizzes: grade6_s2_l2_quizzes },
  { id: 'g6s2l3', name: 'جمع المؤنث السالم', quizzes: grade6_s2_l3_quizzes },
  { id: 'g6s2l4', name: 'جمع التكسير', quizzes: grade6_s2_l4_quizzes },
  { id: 'g6s2l5', name: 'الهمزة المتوسطة على الياء والسطر', quizzes: grade6_s2_l5_quizzes },
  { id: 'g6s2l6', name: 'الهمزة المتطرفة', quizzes: grade6_s2_l6_quizzes },
];

export const GRADES: Grade[] = [
  {
    id: '5',
    name: 'الصف الخامس',
    semesters: [
      {
        id: '1',
        name: 'الفصل الأول',
        lessons: LESSONS.filter(l => l.id.startsWith('g5s1'))
      },
      {
        id: '2',
        name: 'الفصل الثاني',
        lessons: LESSONS.filter(l => l.id.startsWith('g5s2'))
      },
    ],
  },
  {
    id: '6',
    name: 'الصف السادس',
    semesters: [
      {
        id: '1',
        name: 'الفصل الأول',
        lessons: LESSONS.filter(l => l.id.startsWith('g6s1')),
      },
      {
        id: '2',
        name: 'الفصل الثاني',
        lessons: LESSONS.filter(l => l.id.startsWith('g6s2')),
      },
    ],
  },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'hint_1',
    name: 'تلميح بسيط',
    description: 'يُظهر تلميحًا عامًا للسؤال.',
    price: 10,
    effect: 'reveal_answer', // Can be refined to a 'hint_text'
    icon: '💡',
  },
  {
    id: 'remove_options_1',
    name: 'إزالة خيارين',
    description: 'يزيل خيارين خاطئين من السؤال.',
    price: 20,
    effect: 'remove_wrong_options',
    icon: '🗑️',
  },
  {
    id: 'reveal_answer_1',
    name: 'كشف الإجابة',
    description: 'يُظهر الإجابة الصحيحة مباشرة.',
    price: 30,
    effect: 'reveal_answer',
    icon: '✅',
  },
  // New cosmetic items
  {
    id: 'frame_gold',
    name: 'إطار ذهبي',
    description: 'إطار ذهبي فاخر يزين صورتك الرمزية.',
    price: 50,
    effect: 'cosmetic_frame',
    icon: '🏆',
    visualAsset: 'ring-4 ring-yellow-500 ring-offset-2' // Tailwind class for frame
  },
  {
    id: 'frame_diamond',
    name: 'إطار ماسي',
    description: 'إطار ماسي لامع لصورتك الرمزية.',
    price: 75,
    effect: 'cosmetic_frame',
    icon: '💎',
    visualAsset: 'ring-4 ring-blue-400 ring-offset-2 ring-offset-blue-100' // Tailwind class for frame
  },
  {
    id: 'badge_star',
    name: 'شارة النجمة',
    description: 'شارة نجمة لامعة تضاف إلى إنجازاتك.',
    price: 25,
    effect: 'cosmetic_badge',
    icon: '🌟',
    visualAsset: '🌟' // Emoji for the badge
  },
  {
    id: 'badge_trophy',
    name: 'شارة الكأس',
    description: 'كأس صغير يظهر على لوحة تحكمك.',
    price: 40,
    effect: 'cosmetic_badge',
    icon: '🏆',
    visualAsset: '🏆' // Emoji for the badge
  },
  {
    id: 'badge_rocket',
    name: 'شارة الصاروخ',
    description: 'صاروخ يمثل سرعتك في التعلم!',
    price: 30,
    effect: 'cosmetic_badge',
    icon: '🚀',
    visualAsset: '🚀' // Emoji for the badge
  },
];

export const INITIAL_COINS = 50;
