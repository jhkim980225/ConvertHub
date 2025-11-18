import { CategoryInfo } from '@/types/tool';

/**
 * 카테고리 메타데이터
 */
export const categories: CategoryInfo[] = [
  {
    id: 'image',
    name: '이미지',
    description: '이미지 포맷 변환 및 편집 도구',
    icon: '🖼️',
  },
  {
    id: 'text',
    name: '텍스트',
    description: '텍스트 인코딩 및 변환 도구',
    icon: '📝',
  },
  {
    id: 'dev',
    name: '개발자',
    description: '개발자를 위한 유틸리티 도구',
    icon: '⚙️',
  },
  {
    id: 'util',
    name: '유틸리티',
    description: '기타 편리한 도구들',
    icon: '🔧',
  },  
];

/**
 * 카테고리 ID로 카테고리 정보 가져오기
 */
export const getCategoryById = (id: string): CategoryInfo | undefined => {
  return categories.find(cat => cat.id === id);
};

