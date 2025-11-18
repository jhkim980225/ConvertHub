/**
 * PNG 변환 툴들
 */

import { RasterImageTool } from './RasterImageTool';

/**
 * PNG → JPG/WEBP/AVIF 변환 툴
 */
export const PNGConverterTool: React.FC = () => {
  return (
    <RasterImageTool
      sourceFormats={['png']}
      targetFormats={['jpg', 'webp', 'avif']}
      title="PNG → JPG / WEBP / AVIF 변환기"
      description="PNG 이미지를 JPG, WebP, AVIF 포맷으로 변환합니다. 투명 배경이 있는 PNG를 JPG로 변환하면 흰색 배경으로 채워집니다."
    />
  );
};

