import { ToolMetadata } from '@/types/tool';
import { JpegToPngTool } from '@/features/image/JpegToPngTool';

/**
 * 모든 툴의 메타데이터
 * 새로운 툴을 추가할 때는 이 배열에 추가하면 됩니다.
 */
export const tools: ToolMetadata[] = [
  {
    id: 'jpeg-to-png',
    path: '/image/jpeg-to-png',
    category: 'image',
    name: 'JPEG → PNG 변환기',
    description: 'JPEG 이미지를 PNG 포맷으로 빠르게 변환하는 온라인 툴',
    keywords: ['jpeg png 변환', 'jpg to png', '이미지 포맷 변환', 'jpeg png converter'],
    component: JpegToPngTool,
  },
  // 추후 추가할 툴 예시:
  // {
  //   id: 'png-to-jpeg',
  //   path: '/image/png-to-jpeg',
  //   category: 'image',
  //   name: 'PNG → JPEG 변환기',
  //   description: 'PNG 이미지를 JPEG 포맷으로 변환',
  //   keywords: ['png jpeg 변환', 'png to jpg'],
  //   component: PngToJpegTool,
  // },
  // {
  //   id: 'base64-encode',
  //   path: '/text/base64-encode',
  //   category: 'text',
  //   name: 'Base64 인코더',
  //   description: '텍스트를 Base64로 인코딩',
  //   keywords: ['base64', 'encode', '인코딩'],
  //   component: Base64Tool,
  // },
];

/**
 * 툴 ID로 툴 메타데이터 가져오기
 */
export const getToolById = (id: string): ToolMetadata | undefined => {
  return tools.find(tool => tool.id === id);
};

/**
 * 경로로 툴 메타데이터 가져오기
 */
export const getToolByPath = (path: string): ToolMetadata | undefined => {
  return tools.find(tool => tool.path === path);
};

/**
 * 카테고리별 툴 목록 가져오기
 */
export const getToolsByCategory = (category: string): ToolMetadata[] => {
  return tools.filter(tool => tool.category === category);
};

