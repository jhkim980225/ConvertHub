import { useEffect, useRef } from 'react';

interface AdSlotProps {
  /**
   * 광고 슬롯 식별자
   */
  slotId?: string;
  /**
   * 광고 높이 (픽셀)
   */
  height?: number;
  /**
   * 광고 클래스명
   */
  className?: string;
}

/**
 * 광고 슬롯 컴포넌트
 * 현재는 플레이스홀더, 추후 AdSense 스크립트 삽입 예정
 */
export const AdSlot: React.FC<AdSlotProps> = ({ 
  slotId = 'ad-slot', 
  height = 100,
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 추후 AdSense 스크립트 로딩 로직 추가
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div 
      ref={adRef}
      id={slotId}
      className={`ad-slot bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center ${className}`}
      style={{ minHeight: `${height}px` }}
    >
      <span className="text-gray-400 text-sm">광고 영역</span>
    </div>
  );
};

