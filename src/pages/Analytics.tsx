import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts'
import { TrendingUp, Eye, Users, Award, Target, ArrowUpRight } from '../components/ui/icons'
import Badge from '../components/ui/Badge'

const profileViews = [
  { month: 'Aug', views: 980, recruiters: 48 },
  { month: 'Sep', views: 1240, recruiters: 62 },
  { month: 'Oct', views: 1580, recruiters: 89 },
  { month: 'Nov', views: 2100, recruiters: 115 },
  { month: 'Dec', views: 1820, recruiters: 98 },
  { month: 'Jan', views: 2847, recruiters: 143 },
]

const skillData = [
  { skill: 'Distributed Systems', yours: 88, market: 65 },
  { skill: 'Cloud Architecture', yours: 92, market: 72 },
  { skill: 'Kubernetes', yours: 78, market: 58 },
  { skill: 'Go / Golang', yours: 85, market: 45 },
  { skill: 'System Design', yours: 90, market: 70 },
  { skill: 'Leadership', yours: 72, market: 68 },
]

const radarData = [
  { subject: 'Trust Score', A: 87 },
  { subject: 'Profile Complete', A: 78 },
  { subject: 'Verification', A: 75 },
  { subject: 'Skills', A: 88 },
  { subject: 'Activity', A: 65 },
  { subject: 'Network', A: 72 },
]

const opportunityFunnel = [
  { stage: 'Viewed', count: 2847, pct: 100 },
  { stage: 'Recruiter Clicks', count: 143, pct: 5 },
  { stage: 'Profile Reviewed', count: 68, pct: 2.4 },
  { stage: 'Contacted You', count: 24, pct: 0.8 },
  { stage: 'Applied', count: 7, pct: 0.2 },
]

const kpis = [
  { label: 'Profile Views', value: '2,847', delta: '+18%', trend: 'up', icon: Eye, color: '#1565D8', bg: '#EEF4FF' },
  { label: 'Recruiter Views', value: '143', delta: '+34%', trend: 'up', icon: Users, color: '#16A34A', bg: '#DCFCE7' },
  { label: 'Trust Score', value: '87', delta: '+3pts', trend: 'up', icon: Award, color: '#7C3AED', bg: '#EDE9FE' },
  { label: 'Match Rate', value: '91%', delta: '+5%', trend: 'up', icon: Target, color: '#F4B400', bg: '#FFF8E1' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-lg p-3 text-xs">
        <div className="font-semibold text-slate-700 mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ color: p.color }} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}: <span className="font-bold">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Your professional performance — last 6 months</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map(({ label, value, delta, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={18} color={color} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-bold text-green-600">
                <TrendingUp size={10} />{delta}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Profile views chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Profile Views & Recruiter Interest</h3>
              <p className="text-xs text-slate-400 mt-0.5">Aug 2024 – Jan 2025</p>
            </div>
            <Badge variant="success" size="sm">+18% MoM</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={profileViews} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1565D8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1565D8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="views" name="Views" stroke="#1565D8" strokeWidth={2} fill="url(#viewsGrad)" dot={{ fill: '#1565D8', r: 3 }} />
              <Area type="monotone" dataKey="recruiters" name="Recruiters" stroke="#16A34A" strokeWidth={2} fill="url(#recGrad)" dot={{ fill: '#16A34A', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Opportunity funnel */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Opportunity Funnel</h3>
            <p className="text-xs text-slate-400 mt-0.5">How recruiters interact with your profile</p>
          </div>
          <div className="space-y-2.5">
            {opportunityFunnel.map(({ stage, count, pct }) => (
              <div key={stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{stage}</span>
                  <span className="font-mono font-semibold text-slate-700">{count.toLocaleString()}</span>
                </div>
                <div className="h-5 bg-slate-50 rounded-full overflow-hidden">
                  <div
                    className="h-5 rounded-full flex items-center justify-end pr-2"
                    style={{
                      width: `${Math.max(pct, 4)}%`,
                      background: pct === 100 ? '#1565D8' : `rgba(21,101,216,${0.2 + pct / 100 * 0.8})`,
                      transition: 'width 0.5s ease',
                    }}
                  >
                    <span className="text-[10px] font-bold text-white">{pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Skill comparison */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Skill Market Position</h3>
              <p className="text-xs text-slate-400 mt-0.5">Your skills vs market average</p>
            </div>
            <div className="flex gap-3 text-[11px]">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1565D8]" />You</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300" />Market</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={skillData} layout="vertical" margin={{ top: 0, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="market" name="Market" fill="#E2E8F0" radius={[0, 3, 3, 0]} barSize={6} />
              <Bar dataKey="yours" name="You" fill="#1565D8" radius={[0, 3, 3, 0]} barSize={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profile health radar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>Profile Health Score</h3>
            <p className="text-xs text-slate-400 mt-0.5">Across all dimensions</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
              <Radar name="Score" dataKey="A" stroke="#1565D8" fill="#1565D8" fillOpacity={0.1} strokeWidth={2} dot={{ fill: '#1565D8', r: 3 }} />
            </RadarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-2 mt-2">
            {radarData.map(({ subject, A }) => (
              <div key={subject} className="text-center">
                <div className="text-sm font-bold text-slate-700">{A}<span className="text-xs text-slate-400">/100</span></div>
                <div className="text-[10px] text-slate-400 leading-tight">{subject}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-5 bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="font-bold text-slate-800 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>AI Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {[
            {
              icon: TrendingUp,
              color: '#1565D8',
              bg: '#EEF4FF',
              title: 'Peak Recruiter Activity',
              body: 'Tuesday mornings 9–11am are when you get the most profile visits. Consider posting activities during this window.',
            },
            {
              icon: Target,
              color: '#16A34A',
              bg: '#DCFCE7',
              title: 'Skill Gap to Close',
              body: 'Adding Terraform certification would increase your match rate for infrastructure roles by an estimated 12%.',
            },
            {
              icon: ArrowUpRight,
              color: '#7C3AED',
              bg: '#EDE9FE',
              title: 'Career Trajectory',
              body: "Based on your trajectory, you're positioned for a Staff Engineer role within 18 months. Here's what to prioritize.",
            },
          ].map(({ icon: Icon, color, bg, title, body }) => (
            <div key={title} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5" style={{ backgroundColor: bg }}>
                <Icon size={16} color={color} />
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>{title}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
