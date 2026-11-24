import { useState } from 'react'
import {
  Building2, Users, Shield, BarChart2, Settings, Plus,
  ChevronRight, CheckCircle, TrendingUp, Globe, BadgeCheck,
  Mail, Lock, Zap, Star
} from '../components/ui/icons'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import VerificationBadge from '../components/ui/VerificationBadge'

type OrgTab = 'overview' | 'members' | 'verification' | 'settings'

const members = [
  { name: 'James Okafor', email: 'james@acme.io', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=36&h=36&fit=crop&auto=format', verified: true, joined: 'Jan 2025' },
  { name: 'Priya Sharma', email: 'priya@acme.io', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=36&h=36&fit=crop&auto=format', verified: true, joined: 'Jan 2025' },
  { name: 'Kwame Mensah', email: 'kwame@acme.io', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&auto=format', verified: true, joined: 'Feb 2025' },
  { name: 'Elena Torres', email: 'elena@acme.io', role: 'Member', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=36&h=36&fit=crop&auto=format', verified: false, joined: 'Feb 2025' },
]

const roleColors: Record<string, string> = {
  Owner: 'bg-[#FFF8E1] text-[#D97706]',
  Admin: 'bg-[#EEF4FF] text-[#0057D9]',
  Member: 'bg-slate-100 text-slate-600',
}

export default function OrgDashboard() {
  const [tab, setTab] = useState<OrgTab>('overview')

  const tabs: { id: OrgTab; label: string; icon: typeof Building2 }[] = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Organisation Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Acme Engineering Ltd · Verified organisation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Globe size={13} />}>View public page</Button>
          <Button size="sm" icon={<Plus size={13} />}>Invite member</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              tab === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Users, label: 'Team members', value: '4', color: '#0057D9', bg: '#EEF4FF' },
              { icon: Shield, label: 'Org Trust Score', value: '91', color: '#00C853', bg: '#DCFCE7' },
              { icon: BadgeCheck, label: 'Verifications', value: '12', color: '#7C3AED', bg: '#EDE9FE' },
              { icon: Star, label: 'Profile views', value: '1,840', color: '#F4B400', bg: '#FFF8E1' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Org profile card */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#003A8C] to-[#0057D9]" />
            <div className="px-5 pb-5">
              <div className="flex items-end gap-3 -mt-8 mb-4">
                <div className="w-16 h-16 bg-white rounded-2xl border-4 border-white shadow flex items-center justify-center shrink-0">
                  <Building2 size={28} className="text-[#0057D9]" />
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 text-lg" style={{ fontFamily: 'Plus Jakarta Sans' }}>Acme Engineering Ltd</span>
                    <VerificationBadge level="institution" size="sm" showLabel />
                  </div>
                  <div className="text-sm text-slate-500">Technology · London, UK · Founded 2020</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">Engineering consultancy specialising in distributed systems, cloud infrastructure, and platform engineering. Trusted by 40+ enterprises globally.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="blue" size="sm">Verified Organisation</Badge>
                <Badge variant="success" size="sm">Hiring</Badge>
                <Badge variant="outline" size="sm">4 employees on PROFILE</Badge>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: Zap, label: 'Post an opportunity', desc: 'Reach 4.2M+ verified professionals', cta: 'Post now' },
              { icon: Shield, label: 'Verify credentials', desc: 'Confirm employee credentials via PROFILE', cta: 'Start verification' },
              { icon: TrendingUp, label: 'View analytics', desc: 'Profile views, follower growth, reach', cta: 'Open analytics' },
              { icon: Mail, label: 'Invite your team', desc: '0 of your colleagues are on PROFILE', cta: 'Send invites' },
            ].map(({ icon: Icon, label, desc, cta }) => (
              <button key={label} className="text-left bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-all cursor-pointer card-hover">
                <Icon size={16} className="text-[#0057D9] mb-2" />
                <div className="font-bold text-sm text-slate-800">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5 mb-3">{desc}</div>
                <span className="text-xs font-bold text-[#0057D9]">{cta} →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'members' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">4 members in this organisation</p>
            <Button size="sm" icon={<Plus size={13} />}>Invite member</Button>
          </div>
          {members.map(m => (
            <div key={m.email} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800">{m.name}</span>
                  {m.verified && <VerificationBadge level="verified" size="sm" />}
                </div>
                <div className="text-xs text-slate-500">{m.email} · Joined {m.joined}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${roleColors[m.role]}`}>{m.role}</span>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'verification' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#003A8C] to-[#0057D9] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-wide mb-1">Organisation Trust Score</div>
                <div className="text-4xl font-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>91</div>
                <div className="text-white/70 text-sm mt-0.5">Verified Organisation · Premium tier</div>
              </div>
              <Shield size={40} className="text-white/20" />
            </div>
          </div>

          {[
            { label: 'Company registration verified', detail: 'Companies House · UK', done: true },
            { label: 'Domain ownership verified', detail: 'acme.io DNS confirmed', done: true },
            { label: 'Director identity verified', detail: 'James Okafor · verified', done: true },
            { label: 'VAT registration', detail: 'Not yet verified', done: false },
            { label: 'ISO 27001 certification', detail: 'Upload certificate to verify', done: false },
          ].map(({ label, detail, done }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${done ? 'bg-[#DCFCE7]' : 'bg-slate-100'}`}>
                <CheckCircle size={16} className={done ? 'text-[#00C853]' : 'text-slate-400'} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">{label}</div>
                <div className="text-xs text-slate-500">{detail}</div>
              </div>
              {!done && <Button variant="outline" size="sm">Verify</Button>}
            </div>
          ))}
        </div>
      )}

      {tab === 'settings' && (
        <div className="space-y-3">
          {[
            { icon: Building2, label: 'Organisation profile', desc: 'Name, logo, description, website' },
            { icon: Users, label: 'Roles & permissions', desc: 'Control what each role can do' },
            { icon: Lock, label: 'Security settings', desc: 'SSO, 2FA requirements, session policy' },
            { icon: Globe, label: 'Public page', desc: 'Manage what the public sees on your org page' },
            { icon: BarChart2, label: 'Analytics & reporting', desc: 'Engagement, reach, verification stats' },
          ].map(({ icon: Icon, label, desc }) => (
            <button key={label} className="w-full flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-all cursor-pointer text-left">
              <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={16} className="text-slate-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">{label}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
              <ChevronRight size={14} className="text-slate-300" />
            </button>
          ))}

          <div className="mt-4 p-4 bg-[#FEE2E2] border border-[#DC2626]/20 rounded-2xl">
            <div className="font-bold text-sm text-[#DC2626] mb-1">Danger Zone</div>
            <p className="text-xs text-[#991B1B] mb-3 leading-relaxed">Closing your organisation account will remove all team members, posted opportunities, and org-verified credentials. This cannot be undone.</p>
            <Button variant="danger" size="sm">Close organisation</Button>
          </div>
        </div>
      )}
    </div>
  )
}
