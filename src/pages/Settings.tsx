import { useState } from 'react'
import {
  User, Lock, Bell, Eye, Shield, Palette, FileText, Trash2, Download, LogOut, Check,
  Moon, Sun, Monitor } from '../components/ui/icons'
import { useToast } from '../components/ui/Toast'

type SettingsSection = 'profile' | 'security' | 'privacy' | 'notifications' | 'appearance' | 'data' | 'danger'

const sections = [
  { id: 'profile' as SettingsSection, label: 'Profile', icon: User },
  { id: 'security' as SettingsSection, label: 'Security', icon: Lock },
  { id: 'privacy' as SettingsSection, label: 'Privacy', icon: Eye },
  { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
  { id: 'appearance' as SettingsSection, label: 'Appearance', icon: Palette },
  { id: 'data' as SettingsSection, label: 'Data & Exports', icon: Download },
  { id: 'danger' as SettingsSection, label: 'Account', icon: Trash2 },
]

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${on ? 'bg-[#1565D8]' : 'bg-slate-200'}`}
      role="switch"
      aria-checked={on}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-150 ${on ? 'left-5' : 'left-1'}`} />
    </button>
  )
}

function SettingRow({ label, desc, on, onChange }: { label: string; desc?: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0">
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-800">{label}</div>
        {desc && <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>}
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}

export default function Settings() {
  const [active, setActive] = useState<SettingsSection>('profile')
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system')
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    twoFactor: true,
    passkeys: false,
    loginAlerts: true,
    profilePublic: true,
    showTrustScore: true,
    showEmployer: false,
    allowRecruiterSearch: true,
    activityNotifs: true,
    connectionNotifs: true,
    opportunityNotifs: true,
    messageNotifs: true,
    emailDigest: true,
    marketingEmails: false,
    pushNotifs: true })

  const toggle = (key: keyof typeof settings) => setSettings(s => ({ ...s, [key]: !s[key] }))

  const content = () => {
    switch (active) {
      case 'profile': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Profile Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'First Name', value: 'James', type: 'text' },
              { label: 'Last Name', value: 'Okafor', type: 'text' },
              { label: 'Professional Title', value: 'Software Engineer III', type: 'text' },
              { label: 'Username', value: 'jamesokafor', type: 'text' },
              { label: 'Email', value: 'james@example.com', type: 'email' },
              { label: '', value: '+1 (555) 123-4567', type: 'tel' },
            ].map(({ label, value, type }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
                <input defaultValue={value} type={type} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-1 focus:ring-[#1565D8]/20 bg-white" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">About / Bio</label>
            <textarea defaultValue="Software Engineer specialising in distributed systems and infrastructure at scale." rows={3} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-1 focus:ring-[#1565D8]/20 bg-white resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Location</label>
            <select className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] bg-white">
              <option>Mountain View, CA, United States</option>
            </select>
          </div>
          <button
            onClick={() => toast('success', 'Profile settings saved', 'Your changes are already reflected across PROFILE.')}
            className="px-6 py-2.5 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl cursor-pointer transition-all text-sm"
          >
            Save Changes
          </button>
        </div>
      )

      case 'security': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Security</h2>

          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Authentication</h3>
            <SettingRow label="Two-Factor Authentication" desc="Require a code when signing in from a new device" on={settings.twoFactor} onChange={() => toggle('twoFactor')} />
            <SettingRow label="Passkeys" desc="Sign in with biometrics — no password required" on={settings.passkeys} onChange={() => toggle('passkeys')} />
            <SettingRow label="Sign-in Alerts" desc="Email me when my account is accessed from a new location" on={settings.loginAlerts} onChange={() => toggle('loginAlerts')} />
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Password</h3>
            <div className="space-y-3">
              {['Current Password', 'New Password', 'Confirm Password'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] bg-white" />
                </div>
              ))}
              <button
                onClick={() => toast('success', 'Password updated', 'Your other active sessions remain secure.')}
                className="px-5 py-2 bg-[#1565D8] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#1255C0]"
              >
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-3">Active Sessions</h3>
            {[
              { device: 'MacBook Pro · Chrome', location: 'Mountain View, CA', current: true },
              { device: 'iPhone 15 Pro · Safari', location: 'San Francisco, CA', current: false },
            ].map(({ device, location, current }) => (
              <div key={device} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{device}</div>
                  <div className="text-xs text-slate-400">{location}</div>
                </div>
                {current ? (
                  <span className="text-xs bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-full font-bold">Current</span>
                ) : (
                  <button className="text-xs text-red-500 font-semibold cursor-pointer hover:underline">Revoke</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )

      case 'privacy': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Privacy</h2>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Profile Visibility</h3>
            <SettingRow label="Public Profile" desc="Anyone on PROFILE can discover and view your profile" on={settings.profilePublic} onChange={() => toggle('profilePublic')} />
            <SettingRow label="Show Trust Score" desc="Display your Trust Score on your public profile" on={settings.showTrustScore} onChange={() => toggle('showTrustScore')} />
            <SettingRow label="Show Current Employer" desc="Display your current organisation publicly" on={settings.showEmployer} onChange={() => toggle('showEmployer')} />
            <SettingRow label="Recruiter Search" desc="Allow verified recruiters to find you in search results" on={settings.allowRecruiterSearch} onChange={() => toggle('allowRecruiterSearch')} />
          </div>
        </div>
      )

      case 'notifications': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Notifications</h2>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">In-App</h3>
            <SettingRow label="Activity Interactions" desc="Likes, comments, shares on your activities" on={settings.activityNotifs} onChange={() => toggle('activityNotifs')} />
            <SettingRow label="Connection Requests" desc="New connection and collaboration requests" on={settings.connectionNotifs} onChange={() => toggle('connectionNotifs')} />
            <SettingRow label="Opportunity Alerts" desc="New jobs, contracts and scholarships matching your profile" on={settings.opportunityNotifs} onChange={() => toggle('opportunityNotifs')} />
            <SettingRow label="Messages" desc="New messages from connections and recruiters" on={settings.messageNotifs} onChange={() => toggle('messageNotifs')} />
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Email</h3>
            <SettingRow label="Weekly Digest" desc="Summary of your profile views, opportunities, and trust updates" on={settings.emailDigest} onChange={() => toggle('emailDigest')} />
            <SettingRow label="Marketing & Updates" desc="News, feature announcements, and product updates from PROFILE" on={settings.marketingEmails} onChange={() => toggle('marketingEmails')} />
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Push Notifications</h3>
            <SettingRow label="Push Notifications" desc="Allow push notifications on this device" on={settings.pushNotifs} onChange={() => toggle('pushNotifs')} />
          </div>
        </div>
      )

      case 'appearance': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Appearance</h2>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'system' as const, label: 'System', icon: Monitor, desc: 'Follows your device' },
                { id: 'light' as const, label: 'Light', icon: Sun, desc: 'Always light mode' },
                { id: 'dark' as const, label: 'Dark', icon: Moon, desc: 'Always dark mode' },
              ].map(({ id, label, icon: Icon, desc }) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    theme === id ? 'border-[#1565D8] bg-[#EEF4FF]' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Icon size={22} className={theme === id ? 'text-[#1565D8]' : 'text-slate-400'} />
                  <div className={`text-sm font-bold ${theme === id ? 'text-[#1565D8]' : 'text-slate-600'}`}>{label}</div>
                  <div className="text-[10px] text-slate-400">{desc}</div>
                  {theme === id && <Check size={12} className="text-[#1565D8]" />}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Theme can only be changed from Settings — never placed in the main navigation.</p>
          </div>
        </div>
      )

      case 'data': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Data & Exports</h2>
          {[
            { label: 'Download Your CV', desc: 'Export your verified CV as a PDF', action: 'Download PDF', icon: FileText },
            { label: 'Export Trust Record', desc: 'Full trust record as a signed PDF or JSON', action: 'Export', icon: Shield },
            { label: 'Export All Data', desc: 'A complete archive of your profile and activities', action: 'Request Archive', icon: Download },
            { label: 'Activity Log', desc: 'Full history of actions on your account', action: 'View Log', icon: FileText },
          ].map(({ label, desc, action, icon: Icon }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#1565D8]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-800 text-sm">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
              <button className="px-3.5 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-bold rounded-xl cursor-pointer transition-colors hover:bg-slate-50">
                {action}
              </button>
            </div>
          ))}
        </div>
      )

      case 'danger': return (
        <div className="space-y-5">
          <h2 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Account</h2>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center gap-3 py-3 border-b border-slate-50">
              <LogOut size={18} className="text-slate-400 shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-slate-800 text-sm">Sign Out</div>
                <div className="text-xs text-slate-500">Sign out of this device</div>
              </div>
              <button className="text-sm font-bold text-slate-600 cursor-pointer hover:text-slate-800">Sign Out</button>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-slate-50">
              <Eye size={18} className="text-amber-400 shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-slate-800 text-sm">Deactivate Account</div>
                <div className="text-xs text-slate-500">Temporarily hide your profile. You can reactivate at any time.</div>
              </div>
              <button className="text-sm font-bold text-amber-500 cursor-pointer hover:underline">Deactivate</button>
            </div>
            <div className="flex items-center gap-3 py-3">
              <Trash2 size={18} className="text-red-400 shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-red-700 text-sm">Delete Account</div>
                <div className="text-xs text-slate-500">Permanently delete your PROFILE account and all associated data. This cannot be undone.</div>
              </div>
              <button className="text-sm font-bold text-red-600 cursor-pointer hover:underline">Delete</button>
            </div>
          </div>
        </div>
      )

      default: return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account, privacy, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        {/* Sidebar nav */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                active === id ? 'bg-[#1565D8] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              } ${id === 'danger' ? 'lg:mt-4' : ''}`}
            >
              <Icon size={15} className="shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div>{content()}</div>
      </div>
    </div>
  )
}
