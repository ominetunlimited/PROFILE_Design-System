import { useState } from 'react'
import {
  TrendingUp, Eye, Users, Briefcase, Star, CheckCircle, ArrowUpRight,
  MoreHorizontal, Heart, MessageSquare, Share2, BookmarkPlus,
  ChevronRight, Award, Clock, Zap, Sparkles
} from '../components/ui/icons'
import Badge from '../components/ui/Badge'
import TrustScore from '../components/ui/TrustScore'
import VerificationBadge from '../components/ui/VerificationBadge'
import Button from '../components/ui/Button'
import ProfileGlyph from '../components/ui/ProfileGlyph'
import { useToast } from '../components/ui/Toast'

const stats = [
  { label: 'Profile Views', value: '2,847', delta: '+18%', icon: Eye, color: '#1565D8', bg: '#EEF4FF' },
  { label: 'Recruiter Interest', value: '143', delta: '+34%', icon: Users, color: '#16A34A', bg: '#DCFCE7' },
  { label: 'Opportunities', value: '28', delta: '+7', icon: Briefcase, color: '#7C3AED', bg: '#EDE9FE' },
  { label: 'Trust Score', value: '87', delta: '+3pts', icon: Star, color: '#F4B400', bg: '#FFF8E1' },
]

const activities = [
  {
    id: 1,
    user: { name: 'James Okafor', title: 'Software Engineer · Google', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format' },
    type: 'achievement',
    content: "Completed Google Cloud Professional Architect certification. Three months of study, dozens of practice exams, and countless late nights — but it's done. This one matters for the distributed systems work we're doing.",
    tags: ['Cloud Architecture', 'GCP', 'Certification'],
    media: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop&auto=format',
    addedToCV: true,
    time: '2 hours ago',
    likes: 247,
    comments: 38,
    verified: true,
  },
  {
    id: 2,
    user: { name: 'Amara Diallo', title: 'UX Research Lead · Figma', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=48&h=48&fit=crop&auto=format' },
    type: 'project',
    content: 'Published new case study: Redesigning onboarding for 50M users. We reduced drop-off by 40% through a 6-month research-driven redesign. Sharing the full methodology, findings, and design system decisions.',
    tags: ['UX Research', 'Product Design', 'Case Study'],
    time: '5 hours ago',
    likes: 892,
    comments: 124,
    verified: true,
  },
  {
    id: 3,
    user: { name: 'Kwame Mensah', title: 'Structural Engineer · Bechtel', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format' },
    type: 'credential',
    content: 'Received Professional Engineer (PE) license verification from the National Society of Professional Engineers. This license is now verified and visible on my PROFILE trust record.',
    tags: ['Engineering', 'PE License', 'Verified Credential'],
    time: '1 day ago',
    likes: 413,
    comments: 56,
    verified: true,
    institutionVerified: true,
  },
]

const opportunities = [
  {
    title: 'Senior Software Engineer',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=40&h=40&fit=crop&auto=format',
    location: 'Remote · San Francisco',
    type: 'Full-time',
    match: 94,
    salary: '$180k – $240k',
    posted: '2 days ago',
  },
  {
    title: 'Lead Systems Architect',
    company: 'Shopify',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=40&h=40&fit=crop&auto=format',
    location: 'Toronto · Hybrid',
    type: 'Full-time',
    match: 88,
    salary: '$160k – $200k',
    posted: '4 days ago',
  },
  {
    title: 'Cloud Infrastructure Lead',
    company: 'Notion',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop&auto=format',
    location: 'New York · Remote OK',
    type: 'Contract',
    match: 82,
    salary: '$120/hr',
    posted: '1 week ago',
  },
]

const verificationTasks = [
  { label: 'BSc Computer Science · MIT', status: 'verified', icon: CheckCircle },
  { label: 'Google Cloud Architect Cert', status: 'verified', icon: CheckCircle },
  { label: 'Employment at Google (2021–)', status: 'pending', icon: Clock },
  { label: 'GitHub Portfolio Review', status: 'action', icon: Award },
]

function ActivityCard({ activity }: { activity: typeof activities[0] }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  const toggleSaved = () => {
    const nextSaved = !saved
    setSaved(nextSaved)
    toast(
      nextSaved ? 'success' : 'info',
      nextSaved ? 'Saved to your evidence library' : 'Removed from saved items',
      nextSaved ? 'You can organise it later without leaving the feed.' : undefined,
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img src={activity.user.avatar} alt={activity.user.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap">
              <span className="font-semibold text-slate-800 text-sm">{activity.user.name}</span>
              {activity.verified && <VerificationBadge level="verified" size="sm" />}
              {activity.institutionVerified && <VerificationBadge level="institution" size="sm" />}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{activity.user.title}</div>
            <div className="text-xs text-slate-400 mt-0.5">{activity.time}</div>
          </div>
          <div className="flex items-center gap-1">
            {activity.addedToCV && (
              <Badge variant="blue" size="sm">
                <CheckCircle size={9} className="inline mr-0.5" />CV
              </Badge>
            )}
            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-700 leading-relaxed">{activity.content}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {activity.tags.map(tag => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
        </div>
      </div>

      {activity.media && (
        <div className="mx-4 mb-4 rounded-xl overflow-hidden bg-slate-100">
          <img src={activity.media} alt="" className="w-full h-48 object-cover" />
        </div>
      )}

      <div className="px-4 py-3 border-t border-slate-50 flex items-center gap-1">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            liked ? 'text-red-500 bg-red-50' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Heart size={13} fill={liked ? 'currentColor' : 'none'} />
          {activity.likes + (liked ? 1 : 0)}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 cursor-pointer">
          <MessageSquare size={13} />
          {activity.comments}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 cursor-pointer">
          <Share2 size={13} />
          Share
        </button>
        <button
          onClick={toggleSaved}
          className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            saved ? 'text-[#1565D8] bg-[#EEF4FF]' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <BookmarkPlus size={13} fill={saved ? 'currentColor' : 'none'} />
          Save
        </button>
      </div>
    </div>
  )
}

const returnEngineCards = [
  { icon: Zap, label: 'Complete identity verification', impact: '+8 Trust pts', urgency: 'high', cta: 'Start now' },
  { icon: Award, label: 'Request a professional reference', impact: '+3 Trust pts each', urgency: 'medium', cta: 'Request' },
  { icon: TrendingUp, label: 'Recruiter viewed your profile', impact: 'Apply while you\'re top of mind', urgency: 'high', cta: 'Apply now' },
  { icon: Star, label: 'New 94% match at Stripe', impact: 'Closes in 4 days', urgency: 'medium', cta: 'View role' },
]

export default function Dashboard() {
  const [activeFeed, setActiveFeed] = useState('All')
  const [completedActions, setCompletedActions] = useState<string[]>([])
  const { toast } = useToast()

  const completeAction = (label: string, cta: string) => {
    if (completedActions.includes(label)) return
    setCompletedActions(current => [...current, label])
    toast('success', `${cta} started`, 'Your dashboard has already been updated. You can continue browsing.')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Daily Return Engine */}
      <div className="mb-6 bg-gradient-to-br from-[#003A8C] to-[#0057D9] rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Today's Focus</div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Good morning, James <Sparkles size={18} className="inline text-profile-gold ml-1" />
            </h1>
            <p className="text-white/70 text-sm mt-0.5">Trust Score +3 this week · 4 ranked actions ready</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>87</div>
            <div className="text-white/60 text-[11px]">Trust Score</div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {returnEngineCards.map(({ icon: Icon, label, impact, urgency, cta }) => {
            const completed = completedActions.includes(label)
            return (
            <button
              key={label}
              onClick={() => completeAction(label, cta)}
              className={`text-left transition-all rounded-xl p-3 cursor-pointer group border ${
                completed
                  ? 'bg-white/20 border-white/30 -translate-y-px'
                  : 'bg-white/10 hover:bg-white/15 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <ProfileGlyph icon={completed ? CheckCircle : Icon} size="sm" active />
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${urgency === 'high' ? 'bg-[#FF6F59]/30 text-orange-100' : 'bg-white/20 text-white/70'}`}>
                  {completed ? 'In progress' : urgency === 'high' ? 'Priority' : 'Suggested'}
                </span>
              </div>
              <div className="text-xs font-semibold text-white leading-snug mb-1">{label}</div>
              <div className="text-[10px] text-white/60 mb-2">{impact}</div>
              <div className="text-[11px] font-bold text-profile-gold group-hover:text-white transition-colors">
                {completed ? 'Opened' : cta} →
              </div>
            </button>
          )})}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, delta, icon: Icon }, index) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 card-hover">
            <div className="flex items-start justify-between">
              <ProfileGlyph
                icon={Icon}
                tone={(['brand', 'trust', 'growth', 'opportunity'] as const)[index]}
              />
              <span className="text-xs font-semibold text-green-600 flex items-center gap-0.5">
                <TrendingUp size={10} />{delta}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Activity feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Activity Feed</h2>
            <div className="flex gap-1">
              {['All', 'Following', 'Trending'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFeed(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    f === activeFeed ? 'bg-profile-blue text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Trust score card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Trust Profile</h3>
              <button className="text-[#1565D8] text-xs font-semibold cursor-pointer">View Report</button>
            </div>
            <div className="flex items-center gap-4">
              <TrustScore score={87} size="lg" />
              <div className="flex-1 space-y-2">
                {[
                  { label: 'Education', pct: 100 },
                  { label: 'Experience', pct: 75 },
                  { label: 'Skills', pct: 88 },
                  { label: 'References', pct: 60 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                      <span>{label}</span><span className="font-mono">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div className="h-1.5 rounded-full bg-[#1565D8]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification tasks */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Verification Status</h3>
              <Badge variant="blue" size="sm">3 of 4</Badge>
            </div>
            <div className="space-y-2.5">
              {verificationTasks.map(({ label, status }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    status === 'verified' ? 'bg-[#1565D8]' : status === 'pending' ? 'bg-amber-100' : 'bg-slate-100'
                  }`}>
                    {status === 'verified' ? (
                      <CheckCircle size={12} className="text-white" fill="white" />
                    ) : status === 'pending' ? (
                      <Clock size={11} className="text-amber-600" />
                    ) : (
                      <Zap size={11} className="text-slate-500" />
                    )}
                  </div>
                  <span className="text-xs text-slate-700 flex-1 leading-tight">{label}</span>
                  {status === 'action' && (
                    <Badge variant="gold" size="sm">Action</Badge>
                  )}
                  {status === 'pending' && (
                    <Badge variant="warning" size="sm">Pending</Badge>
                  )}
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" fullWidth className="mt-3">
              Complete Verification
            </Button>
          </div>

          {/* Opportunities */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Top Matches</h3>
              <button className="text-[#1565D8] text-xs font-semibold cursor-pointer flex items-center gap-0.5">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {opportunities.map(opp => (
                <div key={opp.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    <img src={opp.logo} alt={opp.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 leading-tight">{opp.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opp.company}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant="blue" size="sm">
                        <TrendingUp size={8} className="inline mr-0.5" />{opp.match}% match
                      </Badge>
                      <span className="text-[10px] text-slate-400">{opp.salary}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-[#1565D8] transition-colors shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Who viewed your profile */}
          <div className="bg-gradient-to-br from-[#0A2E8A] to-[#1565D8] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Eye size={16} />
              <span className="text-sm font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>143 Recruiters</span>
            </div>
            <p className="text-blue-200 text-xs leading-relaxed">viewed your profile this week. Upgrade to see who and engage directly.</p>
            <button className="mt-3 w-full py-2 rounded-xl bg-[#F4B400] hover:bg-[#E6A000] text-[#111111] text-xs font-bold transition-colors cursor-pointer">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
