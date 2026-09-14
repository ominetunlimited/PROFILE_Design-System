import { useState } from 'react'
import {
  Bell, CheckCircle, Shield, Users, Briefcase, Star,
  MessageCircle, Award, TrendingUp, Settings, Check
} from 'lucide-react'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'

type NotifType = 'all' | 'trust' | 'opportunity' | 'social' | 'system'

interface Notification {
  id: number
  type: NotifType
  icon: typeof Bell
  iconColor: string
  iconBg: string
  title: string
  body: string
  time: string
  read: boolean
  action?: string
}

const notifications: Notification[] = [
  {
    id: 1, type: 'trust', icon: Shield, iconColor: '#00E5FF', iconBg: '#E0FFFE',
    title: 'Trust Score increased to 87',
    body: 'Your Google Cloud Architect certification was verified. +5 trust points added.',
    time: '2 hours ago', read: false, action: 'View Trust Center',
  },
  {
    id: 2, type: 'opportunity', icon: TrendingUp, iconColor: '#0057D9', iconBg: '#EEF4FF',
    title: 'Recruiter viewed your profile',
    body: 'A recruiter at Stripe viewed your profile. They\'re hiring for a Principal Engineer role.',
    time: '4 hours ago', read: false, action: 'See opportunity',
  },
  {
    id: 3, type: 'social', icon: Users, iconColor: '#7C3AED', iconBg: '#EDE9FE',
    title: 'Amara Diallo connected with you',
    body: 'You and Amara are now connected. She\'s a UX Research Lead at Figma.',
    time: '6 hours ago', read: false, action: 'View profile',
  },
  {
    id: 4, type: 'trust', icon: Award, iconColor: '#F4B400', iconBg: '#FFF8E1',
    title: 'New verification request',
    body: 'MIT has sent a credential verification link for your BSc Computer Science degree.',
    time: '1 day ago', read: true, action: 'Verify now',
  },
  {
    id: 5, type: 'opportunity', icon: Briefcase, iconColor: '#00C853', iconBg: '#DCFCE7',
    title: '3 new opportunities match your profile',
    body: 'Linear, Vercel, and Notion have posted roles matching your skills.',
    time: '1 day ago', read: true, action: 'Browse matches',
  },
  {
    id: 6, type: 'social', icon: Star, iconColor: '#F4B400', iconBg: '#FFF8E1',
    title: 'Dr. Sarah Chen left you a reference',
    body: 'Your reference from Dr. Sarah Chen (VP Eng · Stripe) is ready to view.',
    time: '2 days ago', read: true, action: 'Read reference',
  },
  {
    id: 7, type: 'social', icon: MessageCircle, iconColor: '#64748B', iconBg: '#F1F5F9',
    title: 'Kwame Mensah commented on your activity',
    body: '"This is excellent work, James. The distributed systems approach here is exactly right."',
    time: '2 days ago', read: true,
  },
  {
    id: 8, type: 'system', icon: Settings, iconColor: '#64748B', iconBg: '#F1F5F9',
    title: 'Security alert: new device login',
    body: 'A new sign-in from Chrome on Windows in London, UK. If this wasn\'t you, secure your account.',
    time: '3 days ago', read: true, action: 'Review activity',
  },
  {
    id: 9, type: 'trust', icon: CheckCircle, iconColor: '#00C853', iconBg: '#DCFCE7',
    title: 'Employment verification approved',
    body: 'Google has verified your employment. +8 trust points added to your Trust Score.',
    time: '4 days ago', read: true,
  },
]

const tabs: { id: NotifType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'trust', label: 'Trust & Verification' },
  { id: 'opportunity', label: 'Opportunities' },
  { id: 'social', label: 'Social' },
  { id: 'system', label: 'System' },
]

export default function Notifications() {
  const [active, setActive] = useState<NotifType>('all')
  const [items, setItems] = useState(notifications)

  const filtered = active === 'all' ? items : items.filter(n => n.type === active)
  const unreadCount = items.filter(n => !n.read).length

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id: number) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-slate-500 text-sm mt-0.5">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" icon={<Check size={13} />} onClick={markAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-5">
        {tabs.map(({ id, label }) => {
          const tabCount = id === 'all' ? unreadCount : items.filter(n => n.type === id && !n.read).length
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                active === id
                  ? 'bg-[#0057D9] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {label}
              {tabCount > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  active === id ? 'bg-white/20 text-white' : 'bg-[#0057D9] text-white'
                }`}>{tabCount}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bell size={28} />}
          title="No notifications here"
          description="You're all caught up. New notifications will appear here as they arrive."
        />
      ) : (
        <div className="space-y-2">
          {filtered.map(notif => {
            const Icon = notif.icon
            return (
              <div
                key={notif.id}
                onClick={() => markRead(notif.id)}
                className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                  notif.read
                    ? 'bg-white border-slate-100 hover:border-slate-200'
                    : 'bg-[#EEF4FF] border-[#0057D9]/20 hover:border-[#0057D9]/30'
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: notif.iconBg }}>
                  <Icon size={18} style={{ color: notif.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-sm font-semibold leading-snug ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notif.title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs text-slate-400">{notif.time}</span>
                      {!notif.read && <div className="w-2 h-2 bg-[#0057D9] rounded-full" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.body}</p>
                  {notif.action && (
                    <button className="mt-2 text-xs font-bold text-[#0057D9] hover:underline cursor-pointer">
                      {notif.action} →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
