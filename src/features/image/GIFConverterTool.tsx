/**
 * GIF 변환 툴
 */

import { GenericImageConverter } from '@/components/image/GenericImageConverter';

/**
 * GIF 변환 툴
 */
export const GIFConverterTool: React.FC = () => {
  const infoContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        GIF 변환 안내
      </h3>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <div>
          <h4 className="font-semibold">변환 방식</h4>
          <p className="text-sm">
            애니메이션 GIF의 경우 첫 번째 프레임만 변환됩니다. 정지 이미지로 저장하고 싶을 때 유용합니다.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">추천 포맷</h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>PNG</strong>: 투명도가 있는 GIF를 변환할 때 권장</li>
            <li><strong>WebP</strong>: 작은 파일 크기가 필요할 때 권장</li>
            <li><strong>JPG</strong>: 배경이 투명하지 않은 일반 이미지일 때 권장</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <GenericImageConverter
      title="GIF → 이미지 변환기"
      description="GIF 이미지를 PNG, WEBP, JPG 포맷으로 변환합니다. 애니메이션 GIF의 경우 첫 프레임만 변환됩니다."
      sourceFormats={['gif']}
      targetFormats={['png', 'webp', 'jpg']}
      acceptTypes="image/gif"
      infoContent={infoContent}
    />
  );
};

