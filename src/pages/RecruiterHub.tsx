import { useState } from 'react'
import {
  Search, Star, MessageCircle,
  Calendar, ChevronRight, Bookmark, Eye, Shield, MapPin, Briefcase, SlidersHorizontal
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import TrustScore from '../components/ui/TrustScore'
import VerificationBadge from '../components/ui/VerificationBadge'

type Stage = 'sourced' | 'screening' | 'interview' | 'offer' | 'hired'

const stageConfig: Record<Stage, { label: string; color: string; bg: string }> = {
  sourced:   { label: 'Sourced',    color: '#64748B', bg: '#F1F5F9' },
  screening: { label: 'Screening',  color: '#0057D9', bg: '#EEF4FF' },
  interview: { label: 'Interview',  color: '#7C3AED', bg: '#EDE9FE' },
  offer:     { label: 'Offer',      color: '#D97706', bg: '#FEF3C7' },
  hired:     { label: 'Hired',      color: '#00C853', bg: '#DCFCE7' },
}

const candidates = [
  {
    id: 1, name: 'Amara Diallo', title: 'UX Research Lead', location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=48&h=48&fit=crop&auto=format',
    trustScore: 94, stage: 'interview' as Stage, match: 97,
    skills: ['UX Research', 'Product Strategy', 'Figma', 'User Testing'],
    availability: 'Open to offers', verified: true, saved: false,
    lastActive: '2h ago', salary: '$140k – $180k',
  },
  {
    id: 2, name: 'James Okafor', title: 'Senior Software Engineer', location: 'London, UK · Remote',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format',
    trustScore: 87, stage: 'screening' as Stage, match: 92,
    skills: ['TypeScript', 'Node.js', 'AWS', 'System Design'],
    availability: 'Open to offers', verified: true, saved: true,
    lastActive: '1d ago', salary: '$130k – $160k',
  },
  {
    id: 3, name: 'Priya Sharma', title: 'Product Manager', location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&auto=format',
    trustScore: 91, stage: 'offer' as Stage, match: 89,
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping'],
    availability: 'Actively looking', verified: true, saved: false,
    lastActive: '3h ago', salary: '$120k – $150k',
  },
  {
    id: 4, name: 'Kwame Mensah', title: 'Structural Engineer', location: 'Accra, Ghana · Global',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format',
    trustScore: 88, stage: 'sourced' as Stage, match: 84,
    skills: ['Structural Analysis', 'AutoCAD', 'BIM', 'Project Management'],
    availability: 'Open to opportunities', verified: true, saved: false,
    lastActive: '5d ago', salary: '$90k – $120k',
  },
  {
    id: 5, name: 'Elena Torres', title: 'DevOps Engineer', location: 'Madrid, Spain · Remote',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&auto=format',
    trustScore: 79, stage: 'screening' as Stage, match: 81,
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'GCP'],
    availability: 'Casually looking', verified: false, saved: false,
    lastActive: '1w ago', salary: '$100k – $130k',
  },
  {
    id: 6, name: 'Dr. Fatima Al-Hassan', title: 'ML Research Scientist', location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&auto=format',
    trustScore: 96, stage: 'hired' as Stage, match: 99,
    skills: ['ML Research', 'Python', 'PyTorch', 'NLP'],
    availability: 'Not looking', verified: true, saved: true,
    lastActive: '2d ago', salary: '$160k – $220k',
  },
]

const stages: Stage[] = ['sourced', 'screening', 'interview', 'offer', 'hired']

export default function RecruiterHub() {
  const [view, setView] = useState<'pipeline' | 'search'>('pipeline')
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [savedIds, setSavedIds] = useState<number[]>([2, 6])
  const [stageMap, setStageMap] = useState<Record<number, Stage>>(
    Object.fromEntries(candidates.map(c => [c.id, c.stage]))
  )

  const selected = candidates.find(c => c.id === selectedId)

  const toggleSave = (id: number) =>
    setSavedIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  const moveStage = (id: number, stage: Stage) =>
    setStageMap(m => ({ ...m, [id]: stage }))

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Recruiter Hub</h1>
          <p className="text-slate-500 text-sm mt-0.5">Trust-filtered pipeline · 6 active candidates</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {(['pipeline', 'search'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all cursor-pointer capitalize ${
                  view === v ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                {v === 'pipeline' ? 'Pipeline' : 'Search'}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" icon={<SlidersHorizontal size={14} />}>Filters</Button>
        </div>
      </div>

      {view === 'search' && (
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, skill, trust score, location, credential..."
            className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 placeholder:text-slate-400"
          />
        </div>
      )}

      {view === 'pipeline' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Kanban */}
          <div className="overflow-x-auto">
            <div className="flex gap-3 min-w-[700px]">
              {stages.map(stage => {
                const stageCandidates = candidates.filter(c => stageMap[c.id] === stage)
                const cfg = stageConfig[stage]
                return (
                  <div key={stage} className="flex-1 min-w-[160px]">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-600">{cfg.label}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                          {stageCandidates.length}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {stageCandidates.map(c => (
                        <div
                          key={c.id}
                          onClick={() => setSelectedId(c.id)}
                          className={`bg-white border rounded-xl p-3 cursor-pointer transition-all ${
                            selectedId === c.id ? 'border-[#0057D9] shadow-sm' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-800 truncate">{c.name}</div>
                              <div className="text-[10px] text-slate-500 truncate">{c.title}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold" style={{ color: c.match >= 90 ? '#00C853' : '#0057D9' }}>{c.match}% match</span>
                            <div className="flex items-center gap-1">
                              <Shield size={9} className="text-[#00E5FF]" />
                              <span className="text-[10px] font-bold text-slate-600">{c.trustScore}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-fit sticky top-20">
              <div className="p-5 bg-gradient-to-br from-[#003A8C] to-[#0057D9]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img src={selected.avatar} alt={selected.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30" />
                    <div>
                      <div className="text-white font-bold text-sm">{selected.name}</div>
                      <div className="text-white/70 text-xs">{selected.title}</div>
                    </div>
                  </div>
                  <TrustScore score={selected.trustScore} size="sm" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {selected.verified && <VerificationBadge level="verified" size="sm" showLabel />}
                  <Badge variant="outline" size="sm">
                    <span className="text-white/80">{selected.availability}</span>
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: MapPin, val: selected.location },
                    { icon: Briefcase, val: selected.salary },
                    { icon: Eye, val: `Last seen ${selected.lastActive}` },
                    { icon: Star, val: `${selected.match}% match` },
                  ].map(({ icon: Icon, val }) => (
                    <div key={val} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Icon size={12} className="text-slate-400 shrink-0" />
                      <span className="truncate">{val}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Verified Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map(s => (
                      <Badge key={s} variant="blue" size="sm">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Move Stage</div>
                  <div className="flex flex-wrap gap-1.5">
                    {stages.map(stage => {
                      const cfg = stageConfig[stage]
                      const isActive = stageMap[selected.id] === stage
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
                  <Button fullWidth size="sm" icon={<MessageCircle size={13} />}>Message</Button>
                  <Button variant="outline" fullWidth size="sm" icon={<Calendar size={13} />}>Schedule</Button>
                </div>
                <Button
                  variant="ghost"
                  fullWidth
                  size="sm"
                  icon={<Bookmark size={13} fill={savedIds.includes(selected.id) ? '#0057D9' : 'none'} />}
                  onClick={() => toggleSave(selected.id)}
                >
                  {savedIds.includes(selected.id) ? 'Saved' : 'Save candidate'}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Search view — candidate cards */
        <div className="space-y-3">
          {candidates.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 items-center hover:border-slate-200 transition-all cursor-pointer card-hover">
              <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800">{c.name}</span>
                  {c.verified && <VerificationBadge level="verified" size="sm" />}
                </div>
                <div className="text-xs text-slate-500">{c.title} · {c.location}</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {c.skills.slice(0, 3).map(s => <Badge key={s} variant="blue" size="sm">{s}</Badge>)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <TrustScore score={c.trustScore} size="sm" />
                <span className="text-xs font-bold" style={{ color: c.match >= 90 ? '#00C853' : '#0057D9' }}>{c.match}% match</span>
                <div className="flex gap-1.5">
                  <button onClick={() => toggleSave(c.id)} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                    <Bookmark size={13} fill={savedIds.includes(c.id) ? '#0057D9' : 'none'} color={savedIds.includes(c.id) ? '#0057D9' : '#94A3B8'} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                    <ChevronRight size={13} className="text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
