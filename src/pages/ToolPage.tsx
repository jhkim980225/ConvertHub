import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getToolByPath } from '@/data/tools';
import { setPageSEO } from '@/lib/seo';

/**
 * 툴 페이지 컴포넌트
 * 경로에 맞는 툴 컴포넌트를 렌더링
 */
export const ToolPage: React.FC = () => {
  const { category, toolId } = useParams<{ category: string; toolId: string }>();
  const path = `/${category}/${toolId}`;
  const tool = getToolByPath(path);

  useEffect(() => {
    if (tool) {
      setPageSEO(tool.name, tool.description);
    }
  }, [tool]);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const ToolComponent = tool.component;

  return <ToolComponent />;
};

