import { ComponentType } from 'react';

/**
 * 툴 카테고리 타입
 */
export type ToolCategory = 'image' | 'text' | 'dev' | 'util';

/**
 * 툴 메타데이터 인터페이스
 */
export interface ToolMetadata {
  id: string;
  path: string;
  category: ToolCategory;
  name: string;
  description: string;
  keywords: string[];
  component: ComponentType;
}

/**
 * 카테고리 정보 인터페이스
 */
export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
}

