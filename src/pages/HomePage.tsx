import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { setPageSEO } from '@/lib/seo';

/**
 * 홈페이지 컴포넌트
 * 카테고리별 툴 카드를 표시
 */
export const HomePage: React.FC = () => {
  useEffect(() => {
    setPageSEO(
      '홈',
      '다양한 인코딩, 변환, 유틸리티 도구를 무료로 제공하는 온라인 툴 모음'
    );
  }, []);

  return (
    <div className="space-y-8">
      {/* 환영 메시지 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ConvertHub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          빠르고 안전한 온라인 변환 도구 모음
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          모든 변환은 브라우저에서 처리되며, 파일이 서버로 전송되지 않습니다.
        </p>
      </div>

      {/* 카테고리별 툴 카드 */}
      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category.id);
        
        if (categoryTools.length === 0) {
          return null;
        }

        return (
          <div key={category.id}>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tool.keywords.slice(0, 3).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* 특징 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-2">
          <div className="text-4xl">🔒</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            100% 안전
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            모든 변환은 브라우저에서 처리되며 파일이 서버로 전송되지 않습니다.
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            빠른 속도
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            서버 업로드 없이 즉시 변환되어 빠른 결과를 얻을 수 있습니다.
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl">💯</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            무료 사용
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            모든 도구를 무료로 제한 없이 사용할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

