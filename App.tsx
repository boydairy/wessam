
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGame } from './context/GameContext';
import { Layout } from './components/Layout';
import { LoginScreen } from './screens/LoginScreen';
import { Dashboard } from './screens/Dashboard';
import { GradeScreen } from './screens/GradeScreen';
import { SemesterScreen } from './screens/SemesterScreen';
import { LessonScreen } from './screens/LessonScreen';
import { QuizScreen } from './screens/QuizScreen';
import { StoreScreen } from './screens/StoreScreen';
import { AppRoute } from './types';

// PrivateRoute component to protect routes that require authentication
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useGame();
  return user ? <>{children}</> : <Navigate to={AppRoute.LOGIN} replace />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={AppRoute.LOGIN} element={<LoginScreen />} />
          <Route path={AppRoute.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path={AppRoute.GRADE} element={<PrivateRoute><GradeScreen /></PrivateRoute>} />
          <Route path={AppRoute.SEMESTER} element={<PrivateRoute><SemesterScreen /></PrivateRoute>} />
          <Route path={AppRoute.LESSON} element={<PrivateRoute><LessonScreen /></PrivateRoute>} />
          <Route path={AppRoute.QUIZ} element={<PrivateRoute><QuizScreen /></PrivateRoute>} />
          <Route path={AppRoute.STORE} element={<PrivateRoute><StoreScreen /></PrivateRoute>} />
          {/* Fallback for unmatched routes */}
          <Route path="*" element={<Navigate to={AppRoute.LOGIN} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
