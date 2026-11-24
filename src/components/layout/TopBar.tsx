import { useState } from 'react'
import {
  Search, Bell, MessageCircle, Plus, ChevronDown, Settings, LogOut,
  User, Building2, Check,
} from '../ui/icons'
import type { Page } from './Sidebar'
import type { AccountContext } from '../../App'
import ProfileGlyph from '../ui/ProfileGlyph'
import { ProfileIcon } from '../ui/ProfileLogo'

interface TopBarProps {
  accountContext: AccountContext
  onSwitchAccount: (account: AccountContext) => void
  onNavigate: (page: Page) => void
  onCreateActivity: () => void
}

export default function TopBar({
  accountContext,
  onSwitchAccount,
  onNavigate,
  onCreateActivity,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const isOrganisation = accountContext === 'organisation'

  const switchAccount = (account: AccountContext) => {
    setMenuOpen(false)
    onSwitchAccount(account)
  }

  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-100 px-4 lg:px-6 h-14 flex items-center gap-3">
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2">
        <ProfileIcon size={34} priority />
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
        <button className="relative rounded-xl hover:-translate-y-0.5 transition-transform cursor-pointer" onClick={() => onNavigate('notifications')} aria-label="Notifications">
          <ProfileGlyph icon={Bell} size="md" />
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-profile-blue text-white text-[9px] font-bold rounded-full border-2 border-white flex items-center justify-center">3</span>
        </button>

        {/* Messages */}
        <button className="relative rounded-xl hover:-translate-y-0.5 transition-transform cursor-pointer" onClick={() => onNavigate('messages')} aria-label="Messages">
          <ProfileGlyph icon={MessageCircle} tone="growth" size="md" />
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-violet-600 text-white text-[9px] font-bold rounded-full border-2 border-white flex items-center justify-center">5</span>
        </button>

        {/* Avatar menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label={`Account menu for ${isOrganisation ? 'Acme Engineering Ltd' : 'James Okafor'}`}
          >
            {isOrganisation ? (
              <span className="w-7 h-7 rounded-lg bg-[#0A2E8A] text-white flex items-center justify-center">
                <Building2 size={14} />
              </span>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&auto=format"
                alt="James Okafor"
                className="w-7 h-7 rounded-full object-cover"
              />
            )}
            <ChevronDown size={12} className="text-slate-500 hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50" role="menu">
              <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  {isOrganisation ? 'Acme Engineering Ltd' : 'James Okafor'}
                </div>
                <div className="text-xs text-slate-500">
                  {isOrganisation ? 'Organisation account · Owner' : 'james@example.com'}
                </div>
              </div>
              <div className="px-2 py-1.5 border-b border-slate-100">
                <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Switch account
                </div>
                <button
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors text-left"
                  onClick={() => switchAccount('personal')}
                  role="menuitem"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=36&h=36&fit=crop&auto=format"
                    alt=""
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-slate-800">James Okafor</span>
                    <span className="block text-[11px] text-slate-500">Personal profile</span>
                  </span>
                  {!isOrganisation && <Check size={15} className="text-[#1565D8]" />}
                </button>
                <button
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors text-left"
                  onClick={() => switchAccount('organisation')}
                  role="menuitem"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#EEF4FF] text-[#0A2E8A] flex items-center justify-center shrink-0">
                    <Building2 size={17} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-slate-800">Acme Engineering Ltd</span>
                    <span className="block text-[11px] text-slate-500">Organisation · Owner</span>
                  </span>
                  {isOrganisation && <Check size={15} className="text-[#1565D8]" />}
                </button>
              </div>
              {[
                {
                  icon: isOrganisation ? Building2 : User,
                  label: isOrganisation ? 'Organisation dashboard' : 'View profile',
                  page: isOrganisation ? 'org' as const : 'cv' as const,
                },
                { icon: Settings, label: 'Settings', page: 'settings' as const },
              ].map(({ icon: Icon, label, page }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer transition-colors text-slate-700"
                  onClick={() => { setMenuOpen(false); onNavigate(page) }}
                  role="menuitem"
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer transition-colors text-red-600"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                >
                  <LogOut size={15} />Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
