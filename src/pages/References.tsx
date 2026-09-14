import { useState } from 'react'
import {
  Award, Send, Clock, CheckCircle, XCircle, Plus,
  FileText, Link2, ChevronRight, Star, Download, QrCode
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import VerificationBadge from '../components/ui/VerificationBadge'

type ReferenceStatus = 'pending' | 'completed' | 'declined'
type Tab = 'received' | 'sent' | 'request'

const received = [
  {
    id: 1,
    from: { name: 'Dr. Sarah Chen', title: 'VP Engineering · Stripe', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&auto=format' },
    relationship: 'Direct Manager',
    context: 'Led our distributed systems team for 2 years',
    preview: '"James consistently delivered complex, high-impact infrastructure work that the entire team depended on. His ability to communicate technical trade-offs to non-technical stakeholders is rare and invaluable..."',
    status: 'completed' as ReferenceStatus,
    date: 'Jan 15, 2025',
    verified: true,
    rating: 5,
  },
  {
    id: 2,
    from: { name: 'Marcus Webb', title: 'Staff Engineer · Shopify', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format' },
    relationship: 'Colleague',
    context: 'Worked together on payments infrastructure',
    preview: '"One of the most thoughtful engineers I\'ve collaborated with. James brings both technical depth and strong product intuition..."',
    status: 'completed' as ReferenceStatus,
    date: 'Dec 8, 2024',
    verified: true,
    rating: 5,
  },
  {
    id: 3,
    from: { name: 'Priya Sharma', title: 'Product Manager · Linear', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&auto=format' },
    relationship: 'Cross-functional partner',
    context: 'Collaborated on developer experience product',
    preview: null,
    status: 'pending' as ReferenceStatus,
    date: 'Requested Jan 20, 2025',
    verified: false,
    rating: null,
  },
]

const sent = [
  {
    id: 1,
    to: { name: 'Kwame Mensah', title: 'Structural Engineer · Bechtel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format' },
    relationship: 'Former colleague',
    status: 'completed' as ReferenceStatus,
    date: 'Jan 10, 2025',
  },
  {
    id: 2,
    to: { name: 'Amara Diallo', title: 'UX Research Lead · Figma', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=48&h=48&fit=crop&auto=format' },
    relationship: 'Project collaborator',
    status: 'pending' as ReferenceStatus,
    date: 'Pending since Jan 18, 2025',
  },
]

const statusConfig: Record<ReferenceStatus, { icon: typeof CheckCircle; label: string; variant: 'success' | 'warning' | 'error' }> = {
  completed: { icon: CheckCircle, label: 'Completed', variant: 'success' },
  pending:   { icon: Clock,        label: 'Pending',   variant: 'warning' },
  declined:  { icon: XCircle,      label: 'Declined',  variant: 'error' },
}

export default function References() {
  const [tab, setTab] = useState<Tab>('received')
  const [step, setStep] = useState(1)
  const [selectedRef, setSelectedRef] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>References</h1>
          <p className="text-slate-500 text-sm mt-0.5">Professional references verified by PROFILE</p>
        </div>
        <Button icon={<Plus size={14} />} onClick={() => setTab('request')}>Request Reference</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {([['received', 'Received'], ['sent', 'Given'], ['request', 'New Request']] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
              tab === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Received */}
      {tab === 'received' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          <div className="space-y-3">
            {received.map(ref => {
              const cfg = statusConfig[ref.status]
              const StatusIcon = cfg.icon
              return (
                <div
                  key={ref.id}
                  onClick={() => setSelectedRef(ref.id)}
                  className={`bg-white border rounded-2xl p-4 cursor-pointer transition-all ${selectedRef === ref.id ? 'border-[#0057D9] shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <img src={ref.from.avatar} alt={ref.from.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800">{ref.from.name}</span>
                        {ref.verified && <VerificationBadge level="verified" size="sm" />}
                      </div>
                      <div className="text-xs text-slate-500">{ref.from.title}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" size="sm">{ref.relationship}</Badge>
                        <Badge variant={cfg.variant} size="sm" icon={<StatusIcon size={9} />}>{cfg.label}</Badge>
                      </div>
                      {ref.rating && (
                        <div className="flex items-center gap-0.5 mt-1.5">
                          {Array.from({ length: ref.rating }).map((_, i) => (
                            <Star key={i} size={11} className="text-[#F4B400]" fill="#F4B400" />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 shrink-0">{ref.date}</div>
                  </div>
                  {ref.preview && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic leading-relaxed line-clamp-2">
                      {ref.preview}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Detail */}
          {selectedRef && (() => {
            const ref = received.find(r => r.id === selectedRef)!
            if (ref.status !== 'completed') return (
              <div className="bg-white border border-slate-100 rounded-2xl p-5 h-fit sticky top-20">
                <div className="text-center py-8">
                  <Clock size={36} className="text-[#F59E0B] mx-auto mb-3" />
                  <div className="font-bold text-slate-700 mb-1">Awaiting response</div>
                  <div className="text-xs text-slate-500">{ref.from.name} hasn't responded yet</div>
                  <Button variant="outline" size="sm" className="mt-4">Send reminder</Button>
                </div>
              </div>
            )
            return (
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden h-fit sticky top-20">
                <div className="p-4 bg-gradient-to-r from-[#003A8C] to-[#0057D9]">
                  <div className="flex items-center gap-3">
                    <img src={ref.from.avatar} alt={ref.from.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30" />
                    <div>
                      <div className="text-white font-bold text-sm">{ref.from.name}</div>
                      <div className="text-white/70 text-xs">{ref.from.title}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Reference Letter</div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">{ref.preview}</p>
                  <p className="text-sm text-slate-700 leading-relaxed mt-2">His technical leadership on the payment reliability initiative demonstrated both systems-thinking at scale and a rare capacity to mentor junior engineers effectively.</p>
                  <div className="mt-4 flex gap-2 pt-3 border-t border-slate-100">
                    <Button variant="outline" size="sm" icon={<Download size={13} />} fullWidth>Download PDF</Button>
                    <Button variant="outline" size="sm" icon={<QrCode size={13} />} fullWidth>Share link</Button>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Given */}
      {tab === 'sent' && (
        <div className="space-y-3">
          {sent.map(ref => {
            const cfg = statusConfig[ref.status]
            const StatusIcon = cfg.icon
            return (
              <div key={ref.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <img src={ref.to.avatar} alt={ref.to.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-sm text-slate-800">{ref.to.name}</div>
                  <div className="text-xs text-slate-500">{ref.to.title}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="outline" size="sm">{ref.relationship}</Badge>
                    <Badge variant={cfg.variant} size="sm" icon={<StatusIcon size={9} />}>{cfg.label}</Badge>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{ref.date}</div>
                {ref.status === 'completed' && (
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* New Request flow */}
      {tab === 'request' && (
        <div className="max-w-xl">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > s ? 'bg-[#00C853] text-white' : step === s ? 'bg-[#0057D9] text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > s ? <CheckCircle size={14} /> : s}
                </div>
                <span className={`text-xs font-semibold ${step >= s ? 'text-slate-700' : 'text-slate-400'}`}>
                  {['Choose referee', 'Link evidence', 'Set purpose'][s - 1]}
                </span>
                {s < 3 && <ChevronRight size={14} className="text-slate-300" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-800">Who is your referee?</h3>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Name</label>
                <input type="text" placeholder="Full name" className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Email</label>
                <input type="email" placeholder="referee@company.com" className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Relationship</label>
                <select className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 bg-white">
                  <option>Direct manager</option>
                  <option>Colleague</option>
                  <option>Client</option>
                  <option>Academic supervisor</option>
                  <option>Mentor</option>
                </select>
              </div>
              <Button fullWidth onClick={() => setStep(2)} icon={<ChevronRight size={14} />}>Next: Link evidence</Button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-800">What should they reference?</h3>
              <p className="text-sm text-slate-500">Linking evidence helps your referee write a stronger, more specific recommendation.</p>
              {[
                { icon: FileText, label: 'Google Cloud Architect Certification', type: 'credential' },
                { icon: Link2, label: 'Payment Infrastructure Migration (2024)', type: 'project' },
                { icon: Award, label: 'Stripe Staff Engineer promotion', type: 'achievement' },
              ].map(item => (
                <label key={item.label} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:border-[#0057D9]/40 transition-all">
                  <input type="checkbox" className="w-4 h-4 accent-[#0057D9]" />
                  <item.icon size={15} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span className="ml-auto text-[10px] font-semibold text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">{item.type}</span>
                </label>
              ))}
              <div className="flex gap-2">
                <Button variant="outline" fullWidth onClick={() => setStep(1)}>Back</Button>
                <Button fullWidth onClick={() => setStep(3)} icon={<ChevronRight size={14} />}>Next: Purpose</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-800">What is this reference for?</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Job application', 'Scholarship', 'Freelance contract', 'Visa/immigration', 'Academic programme', 'General portfolio'].map(p => (
                  <label key={p} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:border-[#0057D9]/40 transition-all">
                    <input type="radio" name="purpose" className="accent-[#0057D9]" />
                    <span className="text-sm text-slate-700">{p}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Personal note to referee (optional)</label>
                <textarea rows={3} placeholder="Add context to help them write a great reference..." className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 resize-none" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" fullWidth onClick={() => setStep(2)}>Back</Button>
                <Button fullWidth icon={<Send size={13} />}>Send Request</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
