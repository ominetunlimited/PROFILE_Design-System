import { useState } from 'react'
import {
  Briefcase, MapPin, DollarSign, Calendar, MessageCircle,
  ChevronRight, Plus, Star, Clock, CheckCircle, XCircle, Filter
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

type AppStage = 'applied' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected'

interface Application {
  id: number
  role: string
  company: string
  logo: string
  location: string
  salary: string
  type: string
  stage: AppStage
  appliedDate: string
  lastUpdate: string
  match: number
  notes?: string
}

const stageConfig: Record<AppStage, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  applied:    { label: 'Applied',     color: '#64748B', bg: '#F1F5F9', icon: Clock },
  shortlisted:{ label: 'Shortlisted', color: '#0057D9', bg: '#EEF4FF', icon: Star },
  interview:  { label: 'Interview',   color: '#7C3AED', bg: '#EDE9FE', icon: Calendar },
  offer:      { label: 'Offer',       color: '#D97706', bg: '#FEF3C7', icon: CheckCircle },
  hired:      { label: 'Hired',       color: '#00C853', bg: '#DCFCE7', icon: CheckCircle },
  rejected:   { label: 'Rejected',    color: '#DC2626', bg: '#FEE2E2', icon: XCircle },
}

// badge variant lookup separate from stageConfig to satisfy TS
const stageBadgeVariant: Record<AppStage, 'outline' | 'success' | 'warning' | 'error' | 'blue' | 'default'> = {
  applied: 'outline', shortlisted: 'blue', interview: 'default', offer: 'warning', hired: 'success', rejected: 'error',
}

const initialApps: Application[] = [
  {
    id: 1, role: 'Principal Software Engineer', company: 'Stripe', type: 'Full-time',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=40&h=40&fit=crop&auto=format',
    location: 'San Francisco · Remote', salary: '$180k – $260k', stage: 'interview',
    appliedDate: 'Jan 15, 2025', lastUpdate: '2 days ago', match: 96, notes: 'Technical phone screen passed. System design round next week.',
  },
  {
    id: 2, role: 'Senior Backend Engineer', company: 'Linear', type: 'Full-time',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop&auto=format',
    location: 'Remote · Americas & Europe', salary: '$160k – $200k', stage: 'shortlisted',
    appliedDate: 'Jan 18, 2025', lastUpdate: '5 days ago', match: 91,
  },
  {
    id: 3, role: 'Staff Engineer', company: 'Vercel', type: 'Full-time',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=40&h=40&fit=crop&auto=format',
    location: 'New York · Hybrid', salary: '$200k – $280k', stage: 'applied',
    appliedDate: 'Jan 22, 2025', lastUpdate: '1 day ago', match: 88,
  },
  {
    id: 4, role: 'Cloud Architecture Consultant', company: 'McKinsey Digital', type: 'Contract',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=40&h=40&fit=crop&auto=format',
    location: 'London · Global Travel', salary: '$180/hr · 6 months', stage: 'offer',
    appliedDate: 'Dec 10, 2024', lastUpdate: 'Today', match: 88, notes: 'Offer received. Decision deadline: Feb 5.',
  },
  {
    id: 5, role: 'Engineering Manager', company: 'Notion', type: 'Full-time',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop&auto=format',
    location: 'San Francisco', salary: '$220k – $300k', stage: 'rejected',
    appliedDate: 'Dec 20, 2024', lastUpdate: '3 weeks ago', match: 79,
  },
  {
    id: 6, role: 'Lead Infrastructure Engineer', company: 'Shopify', type: 'Full-time',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=40&h=40&fit=crop&auto=format',
    location: 'Toronto · Hybrid', salary: '$170k – $210k', stage: 'hired',
    appliedDate: 'Nov 5, 2024', lastUpdate: '1 month ago', match: 94, notes: 'Start date: Feb 17, 2025',
  },
]

const stages: AppStage[] = ['applied', 'shortlisted', 'interview', 'offer', 'hired']

export default function ApplicationTracking() {
  const [apps, setApps] = useState(initialApps)
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [view, setView] = useState<'kanban' | 'list'>('kanban')

  const moveStage = (id: number, stage: AppStage) =>
    setApps(prev => prev.map(a => a.id === id ? { ...a, stage } : a))

  const selected = apps.find(a => a.id === selectedId)
  const activeApps = apps.filter(a => a.stage !== 'rejected')
  const rejectedApps = apps.filter(a => a.stage === 'rejected')

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Application Tracker</h1>
          <p className="text-slate-500 text-sm mt-0.5">{activeApps.length} active · {rejectedApps.length} closed</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {(['kanban', 'list'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all cursor-pointer capitalize ${
                  view === v ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filter</Button>
          <Button size="sm" icon={<Plus size={14} />}>Add application</Button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Kanban board */}
          <div className="overflow-x-auto">
            <div className="flex gap-3 min-w-[750px]">
              {stages.map(stage => {
                const stageCfg = stageConfig[stage]
                const stageApps = apps.filter(a => a.stage === stage)
                return (
                  <div key={stage} className="flex-1 min-w-[150px]">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="text-xs font-bold text-slate-600">{stageCfg.label}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: stageCfg.bg, color: stageCfg.color }}>
                        {stageApps.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {stageApps.map(app => (
                        <div
                          key={app.id}
                          onClick={() => setSelectedId(app.id)}
                          className={`bg-white border rounded-xl p-3 cursor-pointer transition-all ${
                            selectedId === app.id ? 'border-[#0057D9] shadow-sm' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <img src={app.logo} alt={app.company} className="w-7 h-7 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <div className="text-[11px] font-bold text-slate-800 truncate">{app.company}</div>
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-slate-700 leading-snug">{app.role}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{app.lastUpdate}</div>
                          <div className="mt-1.5">
                            <span className="text-[10px] font-bold" style={{ color: app.match >= 90 ? '#00C853' : '#0057D9' }}>{app.match}% match</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail */}
          {selected && (
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden h-fit sticky top-20">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <img src={selected.logo} alt={selected.company} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-slate-800 text-sm leading-tight">{selected.role}</div>
                    <div className="text-xs text-slate-500">{selected.company}</div>
                    <div className="flex gap-2 mt-1.5">
                      <Badge variant={stageBadgeVariant[selected.stage]} size="sm">
                        {stageConfig[selected.stage].label}
                      </Badge>
                      <Badge variant="outline" size="sm">{selected.type}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: MapPin, val: selected.location },
                    { icon: DollarSign, val: selected.salary },
                    { icon: Calendar, val: `Applied ${selected.appliedDate}` },
                    { icon: Clock, val: `Updated ${selected.lastUpdate}` },
                  ].map(({ icon: Icon, val }) => (
                    <div key={val} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Icon size={11} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>

                {selected.notes && (
                  <div className="bg-[#EEF4FF] rounded-xl p-3">
                    <div className="text-[10px] font-bold text-[#0057D9] uppercase tracking-wide mb-1">Notes</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{selected.notes}</p>
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Move to stage</div>
                  <div className="flex flex-wrap gap-1.5">
                    {stages.map(stage => {
                      const cfg = stageConfig[stage]
                      const isActive = selected.stage === stage
                      return (
                        <button
                          key={stage}
                          onClick={() => moveStage(selected.id, stage)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                          style={{
                            backgroundColor: isActive ? cfg.bg : '#F8FAFC',
                            color: isActive ? cfg.color : '#94A3B8',
                            border: `1px solid ${isActive ? cfg.color + '40' : '#E2E8F0'}`,
                          }}
                        >
                          {cfg.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button fullWidth size="sm" icon={<MessageCircle size={13} />}>Contact recruiter</Button>
                  <Button variant="outline" fullWidth size="sm" icon={<Briefcase size={13} />}>View listing</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List view */
        <div className="space-y-2">
          {apps.map(app => {
            const cfg = stageConfig[app.stage]
            const StageIcon = cfg.icon
            return (
              <div key={app.id} onClick={() => setSelectedId(app.id)} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-slate-200 transition-all">
                <img src={app.logo} alt={app.company} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-800">{app.role}</div>
                  <div className="text-xs text-slate-500">{app.company} · {app.location}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold" style={{ color: app.match >= 90 ? '#00C853' : '#0057D9' }}>{app.match}%</span>
                  <span className="text-xs text-slate-400 hidden sm:block">{app.lastUpdate}</span>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: cfg.bg }}>
                    <StageIcon size={11} style={{ color: cfg.color }} />
                    <span className="text-[11px] font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
