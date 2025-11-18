import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { AdSlot } from '@/components/common/AdSlot';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * 메인 레이아웃 컴포넌트
 * 헤더, 사이드바, 메인 컨텐츠, 푸터, 광고 슬롯을 포함
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">              
                             
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">🔄</span>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  ConvertHub
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                홈
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">       
        {/* 메인 컨텐츠 */}
        <main
          className={`
            flex-1 transition-all duration-300
            ${isSidebarOpen ? 'ml-64' : 'ml-0'}
            pt-4
          `}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* 상단 광고 슬롯 */}
            <AdSlot slotId="top-ad" height={100} className="mb-6" />

            {/* 실제 컨텐츠 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {children}
            </div>

            {/* 하단 광고 슬롯 */}
            <AdSlot slotId="bottom-ad" height={100} className="mt-6" />
          </div>
        </main>
      </div>

      {/* 푸터 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 ConvertHub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                개인정보 처리방침
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

