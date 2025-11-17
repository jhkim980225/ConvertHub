import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ToolPage } from '@/pages/ToolPage';

/**
 * 애플리케이션 라우터 설정
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: '/category/:categoryId',
    element: (
      <MainLayout>
        <CategoryPage />
      </MainLayout>
    ),
  },
  {
    path: '/:category/:toolId',
    element: (
      <MainLayout>
        <ToolPage />
      </MainLayout>
    ),
  },
]);

