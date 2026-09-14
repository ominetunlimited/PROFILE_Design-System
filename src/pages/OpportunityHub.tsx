import { useState } from 'react'
import {
  Briefcase, MapPin, Clock, TrendingUp, Star, BookmarkPlus,
  Filter, Search, Building2, ExternalLink, DollarSign,
  GraduationCap, Award, Zap
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

type OpportunityType = 'all' | 'jobs' | 'contracts' | 'scholarships' | 'internships' | 'research'

const opportunities = [
  {
    id: 1,
    title: 'Principal Software Engineer',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=56&h=56&fit=crop&auto=format',
    companySize: '4,000+ employees',
    location: 'San Francisco, CA · Remote OK',
    type: 'jobs' as const,
    salary: '$180k – $260k',
    match: 96,
    posted: '1 day ago',
    deadline: null,
    tags: ['Distributed Systems', 'Go', 'Kubernetes', 'PostgreSQL'],
    description: "Join Stripe's infrastructure team building payment systems at scale. You'll design distributed systems that process billions of transactions globally.",
    recruiterViewed: true,
    featured: true,
  },
  {
    id: 2,
    title: 'Cloud Architecture Consultant',
    company: 'McKinsey Digital',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=56&h=56&fit=crop&auto=format',
    companySize: '45,000+ employees',
    location: 'London, UK · Global Travel',
    type: 'contracts' as const,
    salary: '$180/hr · 6 months',
    match: 88,
    posted: '3 days ago',
    deadline: 'Feb 28, 2025',
    tags: ['Cloud Strategy', 'AWS', 'Enterprise', 'Leadership'],
    description: 'Lead cloud transformation engagements for Fortune 500 clients across banking, healthcare, and retail.',
    recruiterViewed: false,
    featured: false,
  },
  {
    id: 3,
    title: 'Rhodes Scholarship — Technology Track',
    company: 'Rhodes Trust',
    companyLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=56&h=56&fit=crop&auto=format',
    companySize: 'University of Oxford',
    location: 'Oxford, United Kingdom',
    type: 'scholarships' as const,
    salary: 'Full funding + £18,000/yr',
    match: 72,
    posted: '1 week ago',
    deadline: 'Oct 5, 2025',
    tags: ['Research', 'Oxford', 'Technology Policy', 'Leadership'],
    description: 'Two-year fully funded graduate scholarship at the University of Oxford for exceptional scholars demonstrating leadership.',
    recruiterViewed: false,
    featured: false,
  },
  {
    id: 4,
    title: 'Senior Backend Engineer',
    company: 'Linear',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=56&h=56&fit=crop&auto=format',
    companySize: '60 employees',
    location: 'Remote · Americas & Europe',
    type: 'jobs' as const,
    salary: '$160k – $200k + equity',
    match: 91,
    posted: '5 days ago',
    deadline: null,
    tags: ['TypeScript', 'Node.js', 'GraphQL', 'Real-time Systems'],
    description: "Build the infrastructure powering the world's best project management tool. Small team, massive impact.",
    recruiterViewed: true,
    featured: false,
  },
  {
    id: 5,
    title: 'AI Research Engineer Internship',
    company: 'Anthropic',
    companyLogo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=56&h=56&fit=crop&auto=format',
    companySize: '800+ employees',
    location: 'San Francisco, CA',
    type: 'internships' as const,
    salary: '$8,000/month',
    match: 79,
    posted: '2 weeks ago',
    deadline: 'Mar 15, 2025',
    tags: ['ML', 'Python', 'Research', 'AI Safety'],
    description: 'Summer research internship in safety-focused AI. Work directly with researchers on fundamental alignment problems.',
    recruiterViewed: false,
    featured: false,
  },
]

const tabs: { id: OpportunityType; label: string; icon: typeof Briefcase; count: number }[] = [
  { id: 'all', label: 'All', icon: Zap, count: 28 },
  { id: 'jobs', label: 'Jobs', icon: Briefcase, count: 18 },
  { id: 'contracts', label: 'Contracts', icon: Clock, count: 4 },
  { id: 'scholarships', label: 'Scholarships', icon: Award, count: 2 },
  { id: 'internships', label: 'Internships', icon: GraduationCap, count: 4 },
]

const matchColor = (pct: number) => pct >= 90 ? '#16A34A' : pct >= 75 ? '#1565D8' : '#F4B400'

export default function OpportunityHub() {
  const [activeType, setActiveType] = useState<OpportunityType>('all')
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [saved, setSaved] = useState<number[]>([])

  const filtered = activeType === 'all' ? opportunities : opportunities.filter(o => o.type === activeType)
  const selected = opportunities.find(o => o.id === selectedId)

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Opportunity Hub</h1>
          <p className="text-slate-500 text-sm mt-0.5">28 opportunities matched to your verified profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filters</Button>
          <Button size="sm" icon={<Zap size={14} />}>Quick Apply</Button>
        </div>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setActiveType(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeType === id
                ? 'bg-[#1565D8] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Icon size={14} />
            {label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
              activeType === id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>{count}</span>
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title, company, skill, location..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1565D8]/40 focus:ring-2 focus:ring-[#1565D8]/10 transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        {/* List */}
        <div className="space-y-3">
          {filtered.map(opp => (
            <div
              key={opp.id}
              onClick={() => setSelectedId(opp.id)}
              className={`bg-white rounded-2xl border cursor-pointer transition-all p-4 ${
                selectedId === opp.id ? 'border-[#1565D8] shadow-sm' : 'border-slate-100 hover:border-slate-200'
              } ${opp.featured ? 'ring-2 ring-[#F4B400]/30' : ''}`}
            >
              {opp.featured && (
                <div className="flex justify-end mb-2">
                  <Badge variant="gold" size="sm" icon={<Star size={9} />}>Featured</Badge>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={opp.companyLogo} alt={opp.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm leading-tight">{opp.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opp.company} · {opp.companySize}</div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setSaved(s => s.includes(opp.id) ? s.filter(x => x !== opp.id) : [...s, opp.id]) }}
                      className="text-slate-300 hover:text-[#1565D8] transition-colors cursor-pointer shrink-0"
                    >
                      <BookmarkPlus size={16} fill={saved.includes(opp.id) ? '#1565D8' : 'none'} color={saved.includes(opp.id) ? '#1565D8' : undefined} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={11} />{opp.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <DollarSign size={11} />{opp.salary}
                    </span>
                    <span className="text-xs text-slate-400">{opp.posted}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${opp.match}%`, backgroundColor: matchColor(opp.match) }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: matchColor(opp.match) }}>{opp.match}% match</span>
                    </div>
                    {opp.recruiterViewed && (
                      <Badge variant="blue" size="sm" icon={<TrendingUp size={8} />}>Recruiter Viewed You</Badge>
                    )}
                    {opp.deadline && (
                      <span className="text-[11px] text-red-500 font-medium">Closes {opp.deadline}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-fit sticky top-20">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={selected.companyLogo} alt={selected.company} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-base leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>{selected.title}</h2>
                  <div className="text-sm text-slate-500 mt-0.5">{selected.company}</div>
                  <div className="flex gap-2 mt-1.5">
                    <Badge variant={selected.match >= 90 ? 'success' : 'blue'} size="sm">{selected.match}% match</Badge>
                    <Badge variant="outline" size="sm">{selected.type}</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: MapPin, label: 'Location', val: selected.location },
                  { icon: DollarSign, label: 'Compensation', val: selected.salary },
                  { icon: Building2, label: 'Company', val: selected.companySize },
                  { icon: Clock, label: 'Posted', val: selected.posted },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold uppercase tracking-wide mb-1">
                      <Icon size={11} />{label}
                    </div>
                    <div className="text-xs text-slate-700 font-medium leading-snug">{val}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">About the Role</div>
                <p className="text-sm text-slate-700 leading-relaxed">{selected.description}</p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Required Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map(tag => (
                    <Badge key={tag} variant="blue" size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {selected.recruiterViewed && (
                <div className="bg-[#EEF4FF] rounded-xl p-3 flex items-start gap-2">
                  <TrendingUp size={14} className="text-[#1565D8] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1565D8] leading-relaxed font-medium">A recruiter from {selected.company} viewed your profile. Apply now while you're top of mind.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 flex gap-2">
              <Button fullWidth size="sm" icon={<Zap size={14} />}>Apply with PROFILE</Button>
              <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
                <ExternalLink size={15} className="text-slate-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
