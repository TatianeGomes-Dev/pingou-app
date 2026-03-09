import { useState, useRef, useCallback } from 'react';

export const usePullToRefresh = (onRefresh?: () => void) => {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling) return;
    const diff = Math.max(0, e.touches[0].clientY - startY.current);
    setPullDistance(Math.min(diff * 0.4, 80));
  }, [pulling]);

  const onTouchEnd = useCallback(() => {
    if (pullDistance > 50 && onRefresh) {
      onRefresh();
    }
    setPulling(false);
    setPullDistance(0);
  }, [pullDistance, onRefresh]);

  return { containerRef, pullDistance, onTouchStart, onTouchMove, onTouchEnd };
};
