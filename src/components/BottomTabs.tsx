import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Clock, Settings } from 'lucide-react';

const tabs = [
  { path: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { path: '/history', label: 'Histórico', icon: Clock },
  { path: '/settings', label: 'Config', icon: Settings },
];

const BottomTabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-sm items-center justify-around py-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="tap-target flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors"
            >
              <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] font-bold ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabs;
