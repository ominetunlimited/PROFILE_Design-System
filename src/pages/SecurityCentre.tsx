import { useState } from 'react'
import {
  Lock, Shield, Smartphone, Globe, AlertTriangle, CheckCircle,
  Clock, Eye, Trash2, Key, Mail, RefreshCw, Download
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const sessions = [
  { id: 1, device: 'MacBook Pro 16"', browser: 'Chrome 121', location: 'San Francisco, CA', ip: '104.18.12.54', lastActive: 'Active now', current: true, trusted: true },
  { id: 2, device: 'iPhone 15 Pro', browser: 'Safari iOS 17', location: 'San Francisco, CA', ip: '104.18.12.54', lastActive: '2 hours ago', current: false, trusted: true },
  { id: 3, device: 'Windows PC', browser: 'Edge 120', location: 'London, UK', ip: '81.2.69.142', lastActive: '3 days ago', current: false, trusted: false },
  { id: 4, device: 'iPad Air', browser: 'Safari iPadOS', location: 'Toronto, Canada', ip: '142.250.68.14', lastActive: '1 week ago', current: false, trusted: false },
]

const timeline = [
  { id: 1, type: 'login', label: 'Successful sign-in', detail: 'Chrome on MacBook Pro · San Francisco', time: 'Just now', ok: true },
  { id: 2, type: 'setting', label: 'Two-factor authentication enabled', detail: 'Authenticator app configured', time: '3 days ago', ok: true },
  { id: 3, type: 'password', label: 'Password changed', detail: 'Password updated successfully', time: '2 weeks ago', ok: true },
  { id: 4, type: 'alert', label: 'Unrecognised login attempt', detail: 'Blocked · Lagos, Nigeria · Firefox', time: '3 weeks ago', ok: false },
  { id: 5, type: 'login', label: 'Account recovery initiated', detail: 'Email recovery link sent', time: '1 month ago', ok: true },
]

const apps = [
  { id: 1, name: 'LinkedIn', scope: 'Read profile, import connections', granted: '3 months ago', logo: '🔗' },
  { id: 2, name: 'GitHub', scope: 'Read repositories, verify contributions', granted: '5 months ago', logo: '🐙' },
  { id: 3, name: 'Google Workspace', scope: 'Read calendar, sync contacts', granted: '1 year ago', logo: '📅' },
]

type Tab = 'overview' | 'sessions' | 'timeline' | 'recovery' | 'apps'

export default function SecurityCentre() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [revokedIds, setRevokedIds] = useState<number[]>([])
  const [revokedApps, setRevokedApps] = useState<number[]>([])

  const tabs: { id: Tab; label: string; icon: typeof Lock }[] = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'sessions', label: 'Sessions', icon: Smartphone },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'recovery', label: 'Recovery', icon: RefreshCw },
    { id: 'apps', label: 'Connected Apps', icon: Globe },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Security Centre</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account security, sessions, and privacy controls</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 bg-slate-100 rounded-xl p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Security score */}
          <div className="bg-gradient-to-br from-[#003A8C] to-[#0057D9] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">Security Score</div>
                <div className="text-5xl font-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>82</div>
                <div className="text-white/70 text-sm mt-0.5">Good · 3 improvements available</div>
              </div>
              <Shield size={48} className="text-white/20" />
            </div>
            <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-1.5 bg-[#00E5FF] rounded-full" style={{ width: '82%' }} />
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
            {[
              { icon: CheckCircle, ok: true, label: 'Two-factor authentication', detail: 'Authenticator app enabled' },
              { icon: CheckCircle, ok: true, label: 'Strong password', detail: 'Last changed 2 weeks ago' },
              { icon: AlertTriangle, ok: false, label: 'Recovery phone number', detail: 'Not configured — add one for account recovery' },
              { icon: CheckCircle, ok: true, label: 'Email verified', detail: 'jamesokafor@email.com' },
              { icon: AlertTriangle, ok: false, label: 'Passkey (passwordless)', detail: 'Set up passkey login for stronger security' },
              { icon: AlertTriangle, ok: false, label: 'Trusted contact', detail: 'Designate someone to help with account recovery' },
            ].map(({ icon: Icon, ok, label, detail }) => (
              <div key={label} className="flex items-center gap-4 p-4">
                <Icon size={18} className={ok ? 'text-[#00C853]' : 'text-[#F59E0B]'} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{label}</div>
                  <div className="text-xs text-slate-500">{detail}</div>
                </div>
                {!ok && <Button variant="outline" size="sm">Set up</Button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">{sessions.length} active sessions across your devices</p>
            <Button variant="outline" size="sm" icon={<Trash2 size={13} />}>Revoke All Others</Button>
          </div>
          {sessions.map(s => (
            <div key={s.id} className={`bg-white border rounded-2xl p-4 flex gap-4 items-center ${s.current ? 'border-[#0057D9]/30' : 'border-slate-100'}`}>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone size={18} className="text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-800">{s.device}</span>
                  {s.current && <Badge variant="success" size="sm">Current</Badge>}
                  {s.trusted && !s.current && <Badge variant="blue" size="sm">Trusted</Badge>}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{s.browser} · {s.location}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{s.ip} · {s.lastActive}</div>
              </div>
              {!s.current && !revokedIds.includes(s.id) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRevokedIds(r => [...r, s.id])}
                >
                  Revoke
                </Button>
              )}
              {revokedIds.includes(s.id) && (
                <Badge variant="error" size="sm">Revoked</Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-3">
          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm" icon={<Download size={13} />}>Export log</Button>
          </div>
          {timeline.map(event => (
            <div key={event.id} className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${event.ok ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'}`}>
                {event.ok ? <CheckCircle size={15} className="text-[#00C853]" /> : <AlertTriangle size={15} className="text-[#DC2626]" />}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">{event.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{event.detail}</div>
              </div>
              <div className="text-xs text-slate-400 shrink-0">{event.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* Recovery */}
      {activeTab === 'recovery' && (
        <div className="space-y-4">
          <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-2xl p-4 flex gap-3">
            <AlertTriangle size={18} className="text-[#D97706] shrink-0 mt-0.5" />
            <p className="text-sm text-[#92400E] leading-relaxed">Set up at least two recovery methods to avoid permanent account loss if you're locked out.</p>
          </div>
          {[
            { icon: Mail, label: 'Recovery email', value: 'j***@gmail.com', status: 'verified' as const, action: 'Change' },
            { icon: Smartphone, label: 'Recovery phone', value: 'Not configured', status: null, action: 'Add' },
            { icon: Key, label: 'Backup codes', value: '10 codes remaining', status: 'active' as const, action: 'Regenerate' },
            { icon: Shield, label: 'Trusted contact', value: 'Not configured', status: null, action: 'Add' },
          ].map(({ icon: Icon, label, value, action }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-slate-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">{label}</div>
                <div className="text-xs text-slate-500">{value}</div>
              </div>
              <Button variant="outline" size="sm">{action}</Button>
            </div>
          ))}
        </div>
      )}

      {/* Connected Apps */}
      {activeTab === 'apps' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 mb-4">Applications with access to your PROFILE data. Review and revoke access at any time.</p>
          {apps.map(app => (
            <div key={app.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl">{app.logo}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">{app.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{app.scope}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Granted {app.granted}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                  <Eye size={14} className="text-slate-400" />
                </button>
                {!revokedApps.includes(app.id) ? (
                  <Button variant="outline" size="sm" onClick={() => setRevokedApps(r => [...r, app.id])}>Revoke</Button>
                ) : (
                  <Badge variant="error" size="sm">Revoked</Badge>
                )}
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-[#FEE2E2] border border-[#DC2626]/20 rounded-2xl">
            <div className="font-bold text-sm text-[#DC2626] mb-1">Danger Zone</div>
            <p className="text-xs text-[#991B1B] mb-3 leading-relaxed">Deleting your account is permanent. All your data, credentials, and verified history will be erased after a 30-day recovery window.</p>
            <Button variant="danger" size="sm">Request Account Deletion</Button>
          </div>
        </div>
      )}
    </div>
  )
}
