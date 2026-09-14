import {
  Home, Compass, Users, FileText, Briefcase, Store, MessageCircle,
  BarChart2, ShieldCheck, BadgeCheck, Layers, BookOpen, Settings,
  ChevronRight, Lock, CreditCard, Award, KanbanSquare, Bot,
  Building2, Cpu
} from 'lucide-react'
import { ProfileIcon, ProfileWordmark } from '../ui/ProfileLogo'

export type Page =
  | 'home' | 'discover' | 'connections' | 'cv' | 'opportunity'
  | 'marketplace' | 'messages' | 'analytics' | 'trust' | 'verification'
  | 'communities' | 'learning' | 'settings'
  | 'references' | 'security' | 'tracking' | 'orders'
  | 'recruiter' | 'institution' | 'mission-control' | 'copilot'

interface NavItem {
  id: Page
  label: string
  icon: typeof Home
  badge?: number | string
}

const primary: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'connections', label: 'Connections', icon: Users, badge: 3 },
  { id: 'cv', label: 'My CV', icon: FileText },
  { id: 'opportunity', label: 'Opportunity Hub', icon: Briefcase, badge: 12 },
  { id: 'marketplace', label: 'Marketplace', icon: Store },
  { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 5 },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
]

const trust: NavItem[] = [
  { id: 'trust', label: 'Trust Center', icon: ShieldCheck },
  { id: 'verification', label: 'Verification', icon: BadgeCheck },
]

const community: NavItem[] = [
  { id: 'communities', label: 'Communities', icon: Layers },
  { id: 'learning', label: 'Learning', icon: BookOpen },
]

const career: NavItem[] = [
  { id: 'tracking', label: 'Applications', icon: KanbanSquare },
  { id: 'references', label: 'References', icon: Award },
  { id: 'orders', label: 'Orders & Billing', icon: CreditCard },
]

const advanced: NavItem[] = [
  { id: 'security', label: 'Security Centre', icon: Lock },
  { id: 'recruiter', label: 'Recruiter Hub', icon: Building2 },
  { id: 'mission-control', label: 'Mission Control', icon: Cpu },
]

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer
        ${active
          ? 'bg-[#1565D8] text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
    >
      <Icon size={18} className="shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          active ? 'bg-white/20 text-white' : 'bg-[#1565D8] text-white'
        }`}>
          {item.badge}
        </span>
      )}
    </button>
  )
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 border-r border-slate-100 bg-white h-screen sticky top-0 overflow-y-auto sidebar-scroll">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <ProfileIcon size={32} />
          <div>
            <ProfileWordmark size={17} theme="dark" />
            <div className="text-[9px] text-slate-400 font-semibold tracking-widest -mt-0.5 uppercase">Professional Identity</div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-5">
        {/* Primary nav */}
        <div className="space-y-0.5">
          {primary.map(item => (
            <NavLink key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
          ))}
        </div>

        {/* Trust */}
        <div>
          <div className="px-3 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust & Identity</span>
          </div>
          <div className="space-y-0.5">
            {trust.map(item => (
              <NavLink key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
            ))}
          </div>
        </div>

        {/* Community */}
        <div>
          <div className="px-3 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth</span>
          </div>
          <div className="space-y-0.5">
            {community.map(item => (
              <NavLink key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
            ))}
          </div>
        </div>

        {/* Career tools */}
        <div>
          <div className="px-3 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Career Tools</span>
          </div>
          <div className="space-y-0.5">
            {career.map(item => (
              <NavLink key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
            ))}
          </div>
        </div>

        {/* Advanced */}
        <div>
          <div className="px-3 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advanced</span>
          </div>
          <div className="space-y-0.5">
            {advanced.map(item => (
              <NavLink key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
            ))}
          </div>
        </div>

        {/* Copilot + Settings */}
        <div className="space-y-0.5">
          <NavLink item={{ id: 'copilot', label: 'PROFILE Copilot', icon: Bot }} active={currentPage === 'copilot'} onClick={() => onNavigate('copilot')} />
          <NavLink item={{ id: 'settings', label: 'Settings', icon: Settings }} active={currentPage === 'settings'} onClick={() => onNavigate('settings')} />
        </div>
      </div>

      {/* Profile quick card */}
      <div className="mx-3 mb-4 p-3 rounded-xl bg-[#F8FAFF] border border-slate-100">
        <div className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format"
            alt="James Okafor"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1565D8]/20"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-800 truncate">James Okafor</div>
            <div className="text-[11px] text-slate-500 truncate">Software Engineer</div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <ChevronRight size={14} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 bg-slate-200 rounded-full h-1">
            <div className="bg-[#1565D8] rounded-full h-1" style={{ width: '78%' }} />
          </div>
          <span className="text-[10px] font-bold text-[#1565D8]">78%</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">Profile Strength</div>
      </div>
    </aside>
  )
}
