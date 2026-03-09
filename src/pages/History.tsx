import { useAppStore } from '@/store/useAppStore';
import HistoryList from '@/components/HistoryList';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const History = () => {
  const { history } = useAppStore();
  const { containerRef, pullDistance, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh();

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col bg-background pb-24"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull indicator */}
      {pullDistance > 0 && (
        <div className="flex justify-center" style={{ height: pullDistance }}>
          <motion.div animate={{ rotate: pullDistance > 50 ? 180 : 0 }} className="pt-2">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      )}

      <div className="safe-area-top bg-gradient-hero px-6 pb-6 pt-10">
        <div className="mx-auto max-w-sm">
          <h1 className="text-xl font-extrabold text-foreground">Histórico</h1>
          <p className="text-sm text-muted-foreground">
            {history.length} pingo{history.length !== 1 ? 's' : ''} registrado{history.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-sm">
          <HistoryList entries={history} />
        </div>
      </div>
    </div>
  );
};

export default History;
