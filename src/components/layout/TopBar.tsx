import { useState } from 'react'
import { Search, Bell, MessageCircle, Plus, ChevronDown, Settings, LogOut, User } from 'lucide-react'
import type { Page } from './Sidebar'

interface TopBarProps {
  onNavigate: (page: Page) => void
  onCreateActivity: () => void
}

export default function TopBar({ onNavigate, onCreateActivity }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-100 px-4 lg:px-6 h-14 flex items-center gap-3">
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#1565D8] flex items-center justify-center">
          <svg viewBox="0 0 16 16" fill="white" width="12" height="12">
            <polygon points="8,1 14,4.5 14,11.5 8,15 2,11.5 2,4.5" />
          </svg>
        </div>
        <span className="font-black text-[15px] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>PROFILE</span>
      </div>

      {/* Search */}
      <div className={`flex-1 max-w-md relative ${searchFocused ? 'ring-2 ring-[#1565D8]/20 rounded-xl' : ''}`}>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search people, skills, jobs, companies..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1565D8]/40 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Quick create */}
        <button
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#1565D8] hover:bg-[#1255C0] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          onClick={onCreateActivity}
        >
          <Plus size={15} />
          <span className="hidden xl:inline">Add Activity</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer" onClick={() => {}}>
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1565D8] rounded-full border-2 border-white" />
        </button>

        {/* Messages */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer" onClick={() => onNavigate('messages')}>
          <MessageCircle size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&auto=format"
              alt="James Okafor"
              className="w-7 h-7 rounded-full object-cover"
            />
            <ChevronDown size={12} className="text-slate-500 hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <div className="text-sm font-semibold text-slate-800">James Okafor</div>
                <div className="text-xs text-slate-500">james@example.com</div>
              </div>
              {[
                { icon: User, label: 'View Profile' },
                { icon: Settings, label: 'Settings' },
                { icon: LogOut, label: 'Sign Out', danger: true },
              ].map(({ icon: Icon, label, danger }) => (
                <button
                  key={label}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer transition-colors ${danger ? 'text-red-600' : 'text-slate-700'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
