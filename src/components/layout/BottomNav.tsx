import { Home, Users, Plus, Briefcase, FileText } from 'lucide-react'
import type { Page } from './Sidebar'

interface BottomNavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  onCreateActivity: () => void
}

const leftItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'connections', label: 'Network', icon: Users },
]

const rightItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'opportunity', label: 'Opportunity', icon: Briefcase },
  { id: 'cv', label: 'CV', icon: FileText },
]

export default function BottomNav({ currentPage, onNavigate, onCreateActivity }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass border-t border-slate-100" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {leftItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl cursor-pointer transition-colors min-w-[52px] ${
              currentPage === id ? 'text-[#1565D8]' : 'text-slate-500'
            }`}
          >
            <Icon size={22} strokeWidth={currentPage === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}

        {/* Primary Create Activity FAB — always visible, never disappears */}
        <button
          onClick={onCreateActivity}
          className="flex flex-col items-center gap-0.5 px-2 cursor-pointer -mt-5"
          aria-label="Create Activity"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1565D8] flex items-center justify-center shadow-xl shadow-[#1565D8]/30 active:scale-95 transition-transform">
            <Plus size={26} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Create</span>
        </button>

        {rightItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl cursor-pointer transition-colors min-w-[52px] ${
              currentPage === id ? 'text-[#1565D8]' : 'text-slate-500'
            }`}
          >
            <Icon size={22} strokeWidth={currentPage === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
