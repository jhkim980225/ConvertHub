import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getCategoryById } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { setPageSEO } from '@/lib/seo';

/**
 * 카테고리 페이지 컴포넌트
 * 특정 카테고리의 툴 목록을 표시
 */
export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || '');
  const tools = getToolsByCategory(categoryId || '');

  useEffect(() => {
    if (category) {
      setPageSEO(`${category.name} 도구`, category.description);
    }
  }, [category]);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        </div>
      </div>

      {tools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            이 카테고리에는 아직 도구가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
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
      )}
    </div>
  );
};

