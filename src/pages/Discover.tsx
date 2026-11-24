import { useState } from 'react'
import { Search, Filter, MapPin, TrendingUp, Users, Star, ArrowUpRight, Globe, Check } from '../components/ui/icons'
import Badge from '../components/ui/Badge'
import VerificationBadge from '../components/ui/VerificationBadge'
import TrustScore from '../components/ui/TrustScore'
import Button from '../components/ui/Button'

type DiscoverTab = 'people' | 'companies' | 'institutions' | 'communities'

const people = [
  {
    name: 'Amara Diallo',
    title: 'UX Research Lead',
    company: 'Figma',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&auto=format',
    location: 'San Francisco, CA',
    trust: 92,
    skills: ['UX Research', 'Product Design', 'Design Systems'],
    mutual: 12,
    verified: true,
  },
  {
    name: 'Kwame Mensah',
    title: 'Structural Engineer',
    company: 'Bechtel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&auto=format',
    location: 'London, UK',
    trust: 88,
    skills: ['Civil Engineering', 'Project Management', 'BIM'],
    mutual: 5,
    verified: true,
  },
  {
    name: 'Priya Sharma',
    title: 'Product Manager',
    company: 'Notion',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&auto=format',
    location: 'New York, NY',
    trust: 79,
    skills: ['Product Strategy', 'Data Analysis', 'User Research'],
    mutual: 8,
    verified: true,
  },
  {
    name: 'Fatima Al-Hassan',
    title: 'ML Research Lead',
    company: 'IBM Research',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&auto=format',
    location: 'Zurich, Switzerland',
    trust: 95,
    skills: ['Machine Learning', 'NLP', 'AI Safety'],
    mutual: 3,
    verified: true,
  },
  {
    name: 'Carlos Ramírez',
    title: 'DevOps Architect',
    company: 'Shopify',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format',
    location: 'Toronto, Canada',
    trust: 83,
    skills: ['Kubernetes', 'Terraform', 'Platform Engineering'],
    mutual: 15,
    verified: false,
  },
  {
    name: 'Yuki Tanaka',
    title: 'Creative Director',
    company: 'Sony Interactive',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&auto=format',
    location: 'Tokyo, Japan',
    trust: 87,
    skills: ['Brand Design', 'Art Direction', 'UX'],
    mutual: 2,
    verified: true,
  },
]

const companies = [
  {
    name: 'Stripe',
    type: 'Technology',
    size: '4,000+ employees',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=64&h=64&fit=crop&auto=format',
    location: 'San Francisco, CA',
    hiring: true,
    trust: 98,
  },
  {
    name: 'Linear',
    type: 'Software',
    size: '60+ employees',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&auto=format',
    location: 'Remote',
    hiring: true,
    trust: 95,
  },
  {
    name: 'Notion',
    type: 'Productivity',
    size: '400+ employees',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=64&h=64&fit=crop&auto=format',
    location: 'San Francisco, CA',
    hiring: false,
    trust: 97,
  },
]

export default function Discover() {
  const [activeTab, setActiveTab] = useState<DiscoverTab>('people')
  const [connected, setConnected] = useState<string[]>([])

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Discover</h1>
        <p className="text-slate-500 text-sm mt-0.5">Explore the global professional network</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search professionals, companies, institutions..."
          className="w-full pl-10 pr-32 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1565D8]/40 focus:ring-2 focus:ring-[#1565D8]/10 transition-all placeholder:text-slate-400"
        />
        <Button variant="ghost" size="sm" icon={<Filter size={13} />} className="absolute right-2 top-1/2 -translate-y-1/2">
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {(['people', 'companies', 'institutions', 'communities'] as DiscoverTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab ? 'bg-[#1565D8] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trending tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['Distributed Systems', 'Product Design', 'ML / AI', 'Climate Tech', 'Fintech', 'Web3', 'Healthcare'].map(tag => (
          <button key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-[#1565D8] hover:text-[#1565D8] cursor-pointer transition-colors">
            <TrendingUp size={11} />{tag}
          </button>
        ))}
      </div>

      {activeTab === 'people' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {people.map(person => (
            <div key={person.name} className="bg-white rounded-2xl border border-slate-100 p-5 card-hover">
              <div className="flex items-start gap-3">
                <img src={person.avatar} alt={person.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-800">{person.name}</span>
                    {person.verified && <VerificationBadge level="verified" size="sm" />}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{person.title} · {person.company}</div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                    <MapPin size={11} />{person.location}
                    {person.mutual > 0 && (
                      <>
                        <span className="text-slate-200">·</span>
                        <Users size={11} />
                        <span>{person.mutual} mutual</span>
                      </>
                    )}
                  </div>
                </div>
                <TrustScore score={person.trust} size="sm" showLabel={false} />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {person.skills.slice(0, 3).map(s => <Badge key={s} variant="outline" size="sm">{s}</Badge>)}
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
                <Button
                  fullWidth
                  size="sm"
                  variant={connected.includes(person.name) ? 'secondary' : 'primary'}
                  icon={connected.includes(person.name) ? <Check size={13} /> : undefined}
                  onClick={() => setConnected(c => c.includes(person.name) ? c.filter(x => x !== person.name) : [...c, person.name])}
                >
                  {connected.includes(person.name) ? 'Connected' : 'Connect'}
                </Button>
                <Button variant="outline" size="sm" icon={<ArrowUpRight size={13} />} className="shrink-0">
                  Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="space-y-3">
          {companies.map(company => (
            <div key={company.name} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 card-hover cursor-pointer">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{company.name}</span>
                  <VerificationBadge level="institution" size="sm" showLabel />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{company.type} · {company.size}</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={11} />{company.location}</span>
                  {company.hiring && <Badge variant="success" size="sm">Hiring Now</Badge>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 justify-end text-xs font-semibold text-[#1565D8]">
                  <Star size={11} fill="#F4B400" className="text-[#F4B400]" />
                  {company.trust}
                </div>
                <div className="text-[10px] text-slate-400">Trust</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(activeTab === 'institutions' || activeTab === 'communities') && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <div className="mx-auto mb-3 size-12 rounded-2xl bg-profile-blue-light text-profile-blue flex items-center justify-center">
            <Globe size={24} />
          </div>
          <h3 className="font-bold text-slate-700" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {activeTab === 'institutions' ? 'Institution Directory' : 'Professional Communities'}
          </h3>
          <p className="text-sm text-slate-400 mt-2">Coming soon — connecting you to universities, licensing bodies, and professional communities worldwide.</p>
        </div>
      )}
    </div>
  )
}
