import { Library, Settings, Music2Icon } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface SidebarProps {
  activePage: 'library' | 'albums' | 'settings';
  onNavigate: (page: 'library' | 'albums' | 'settings') => void;
}

const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const { settings, updateSettings } = useSettings();

  const menuItems = [
    { icon: <Library size={24} />, label: 'Library', id: 'library' as const },
    { icon: <Music2Icon size={24} />, label: 'Albums', id: 'albums' as const },
    { icon: <Settings size={24} />, label: 'Settings', id: 'settings' as const },
  ];

  const handleNavigate = (pageId: 'library' | 'albums' | 'settings') => {
    onNavigate(pageId);
  };

  const toggleCollapsed = async () => {
    await updateSettings({ isCollapsed: !settings.isCollapsed });
  };

  return (
    <div
      className={`
        h-screen bg-[var(--theme-background)] backdrop-blur-2xl
        transition-all duration-300 ease-in-out
        flex flex-col relative
        ${settings.isCollapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-5 relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent" />
        <div className={`flex items-center ${settings.isCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
          <div
            className={`
              w-8 h-8 rounded-xl
              bg-gradient-to-br from-[var(--theme-border)] to-[var(--theme-accent)]
              flex items-center justify-center flex-shrink-0
              cursor-pointer shadow-lg
              hover:shadow-xl hover:scale-105
              transition-all duration-300
            `}
            onClick={toggleCollapsed}
          >
            <span className="text-sm font-bold tracking-wider text-[var(--theme-text)]">BF</span>
          </div>
          {!settings.isCollapsed && (
            <span className="font-semibold tracking-wide whitespace-nowrap text-[var(--theme-text)]">
              BeatForge
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1.5 p-3">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`
                text flex items-center
                ${settings.isCollapsed ? 'justify-center' : 'gap-3'}
                p-3 rounded-xl
                transition-all duration-200
                group relative
                ${isActive
                  ? 'bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)]'
                  : 'hover:bg-[var(--theme-surface-hover)]'
                }
                ${!isActive && !settings.isCollapsed && 'hover:translate-x-1.5'}
              `}
            >
              <div className={`
                flex items-center justify-center w-6
                transition-all duration-200
                ${isActive
                  ? 'text-[var(--theme-text)]'
                  : 'text-[var(--theme-text)] group-hover:text-[var(--theme-text)]'
                }
                ${!isActive && 'group-hover:scale-110'}
              `}>
                {item.icon}
              </div>
              {!settings.isCollapsed && (
                <span className={`
                  text font-medium
                  transition-colors duration-200
                  ${isActive
                    ? 'text-[var(--theme-text)]'
                    : 'text-[var(--theme-text)] group-hover:text-[var(--theme-text)]'
                  }
                `}>
                  {item.label}
                </span>
              )}
              {isActive && (
                <div className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  w-1 h-8 bg-gradient-to-b from-[var(--theme-border)] to-[var(--theme-accent)]
                  rounded-r-full shadow-lg
                  animate-pulse
                " />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      {!settings.isCollapsed && (
        <div className="p-5 mb-6 relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent" />
          <div className="text-xs space-y-1">
            <p className="font-medium text-[var(--theme-text)] hover:text-[var(--theme-text)] transition-colors">
              BeatForge v0.5.3
            </p>
            <p className="font-medium text-[var(--theme-text)] hover:text-[var(--theme-text)] transition-colors">
              Made with ♥ by @prodbyeagle
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
