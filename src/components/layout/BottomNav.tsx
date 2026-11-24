import { Home, Users, Plus, Briefcase, FileText } from '../ui/icons'
import type { Page } from './Sidebar'
import ProfileGlyph from '../ui/ProfileGlyph'

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
            <ProfileGlyph icon={Icon} size="sm" active={currentPage === id} />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}

        {/* Primary Create Activity FAB — always visible, never disappears */}
        <button
          onClick={onCreateActivity}
          className="flex flex-col items-center gap-0.5 px-2 cursor-pointer -mt-5"
          aria-label="Create Activity"
        >
          <div className="relative w-14 h-14 rounded-2xl bg-profile-blue flex items-center justify-center shadow-xl shadow-profile-blue/30 active:scale-95 transition-transform ring-4 ring-white">
            <Plus size={26} className="text-white" strokeWidth={2.5} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-profile-gold" />
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
            <ProfileGlyph
              icon={Icon}
              tone={id === 'opportunity' ? 'opportunity' : 'brand'}
              size="sm"
              active={currentPage === id}
            />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
