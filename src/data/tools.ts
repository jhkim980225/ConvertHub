import { ToolMetadata } from '@/types/tool';
import { JpegToPngTool } from '@/features/image/JpegToPngTool';
import { JPGConverterTool } from '@/features/image/JPGConverterTool';
import { PNGConverterTool } from '@/features/image/PNGConverterTool';
import { WEBPConverterTool } from '@/features/image/WEBPConverterTool';
import { AVIFConverterTool } from '@/features/image/AVIFConverterTool';
import { GIFConverterTool } from '@/features/image/GIFConverterTool';
import { SVGConverterTool } from '@/features/image/SVGConverterTool';
import { PDFToImageTool } from '@/features/image/PDFToImageTool';
import { ImageToPDFTool } from '@/features/image/ImageToPDFTool';

/**
 * 모든 툴의 메타데이터
 * 새로운 툴을 추가할 때는 이 배열에 추가하면 됩니다.
 */
export const tools: ToolMetadata[] = [
  // JPG 변환 툴
  {
    id: 'jpg-converter',
    path: '/image/jpg-converter',
    category: 'image',
    name: 'JPG → PNG / WEBP / AVIF',
    description: 'JPG 이미지를 PNG, WebP, AVIF 포맷으로 변환',
    keywords: ['jpg png 변환', 'jpg to png', 'jpg webp', 'jpg avif', 'jpeg 변환'],
    component: JPGConverterTool,
  },
  
  // PNG 변환 툴
  {
    id: 'png-converter',
    path: '/image/png-converter',
    category: 'image',
    name: 'PNG → JPG / WEBP / AVIF',
    description: 'PNG 이미지를 JPG, WebP, AVIF 포맷으로 변환',
    keywords: ['png jpg 변환', 'png to jpg', 'png webp', 'png avif'],
    component: PNGConverterTool,
  },
  
  // WEBP 변환 툴
  {
    id: 'webp-converter',
    path: '/image/webp-converter',
    category: 'image',
    name: 'WEBP → JPG / PNG / AVIF',
    description: 'WebP 이미지를 JPG, PNG, AVIF 포맷으로 변환',
    keywords: ['webp jpg', 'webp png', 'webp 변환', 'webp to jpg'],
    component: WEBPConverterTool,
  },
  
  // AVIF 변환 툴
  {
    id: 'avif-converter',
    path: '/image/avif-converter',
    category: 'image',
    name: 'AVIF → JPG / PNG / WEBP',
    description: 'AVIF 이미지를 JPG, PNG, WebP 포맷으로 변환',
    keywords: ['avif jpg', 'avif png', 'avif 변환', 'avif to jpg'],
    component: AVIFConverterTool,
  },
  
  // GIF 변환 툴
  {
    id: 'gif-converter',
    path: '/image/gif-converter',
    category: 'image',
    name: 'GIF → PNG / WEBP / JPG',
    description: 'GIF 이미지를 PNG, WebP, JPG 포맷으로 변환 (첫 프레임)',
    keywords: ['gif png', 'gif jpg', 'gif 변환', 'gif to png'],
    component: GIFConverterTool,
  },
  
  // SVG 변환 툴
  {
    id: 'svg-converter',
    path: '/image/svg-converter',
    category: 'image',
    name: 'SVG → PNG / JPG / WEBP',
    description: 'SVG 벡터 이미지를 PNG, JPG, WebP 래스터 포맷으로 변환',
    keywords: ['svg png', 'svg jpg', 'svg 변환', 'svg to png'],
    component: SVGConverterTool,
  },
  
  // PDF → 이미지 변환 툴
  {
    id: 'pdf-to-image',
    path: '/image/pdf-to-image',
    category: 'image',
    name: 'PDF → JPG / PNG',
    description: 'PDF 문서를 JPG 또는 PNG 이미지로 변환 (페이지별)',
    keywords: ['pdf jpg', 'pdf png', 'pdf 이미지 변환', 'pdf to image'],
    component: PDFToImageTool,
  },
  
  // 이미지 → PDF 변환 툴
  {
    id: 'image-to-pdf',
    path: '/image/image-to-pdf',
    category: 'image',
    name: '이미지 → PDF',
    description: '여러 이미지를 하나의 PDF 파일로 변환',
    keywords: ['jpg pdf', 'png pdf', '이미지 pdf', 'image to pdf'],
    component: ImageToPDFTool,
  },
  
  // 기존 JPEG → PNG 툴 (호환성 유지)
  {
    id: 'jpeg-to-png',
    path: '/image/jpeg-to-png',
    category: 'image',
    name: 'JPEG → PNG 변환기 (레거시)',
    description: 'JPEG 이미지를 PNG 포맷으로 빠르게 변환하는 온라인 툴',
    keywords: ['jpeg png 변환', 'jpg to png', '이미지 포맷 변환', 'jpeg png converter'],
    component: JpegToPngTool,
  },
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

