/**
 * SVG 변환 툴
 */

import { GenericImageConverter } from '@/components/image/GenericImageConverter';

/**
 * SVG 변환 툴
 */
export const SVGConverterTool: React.FC = () => {
  const infoContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        SVG 변환 안내
      </h3>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <div>
          <h4 className="font-semibold">SVG란?</h4>
          <p className="text-sm">
            SVG(Scalable Vector Graphics)는 벡터 기반 이미지 포맷으로, 크기를 조정해도 품질이 저하되지 않습니다. 
            하지만 일부 플랫폼이나 소프트웨어에서는 래스터 이미지(PNG, JPG)가 필요할 수 있습니다.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">변환 크기</h4>
          <p className="text-sm">
            SVG는 2배 스케일로 렌더링됩니다. SVG에 정의된 크기(width/height 또는 viewBox)를 기준으로 변환됩니다.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">추천 포맷</h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>PNG</strong>: 투명 배경을 유지하고 싶을 때 권장</li>
            <li><strong>JPG</strong>: 배경을 흰색으로 채우고 파일 크기를 줄이고 싶을 때 권장</li>
            <li><strong>WebP</strong>: 투명도와 작은 파일 크기를 모두 원할 때 권장</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <GenericImageConverter
      title="SVG → 이미지 변환기"
      description="SVG 벡터 이미지를 PNG, JPG, WebP 래스터 포맷으로 변환합니다. 브라우저에서 안전하게 처리됩니다."
      sourceFormats={['svg']}
      targetFormats={['png', 'jpg', 'webp']}
      acceptTypes="image/svg+xml,.svg"
      infoContent={infoContent}
    />
  );
};

