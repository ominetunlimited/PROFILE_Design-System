import {
  Users, Shield, TrendingUp, Cpu, AlertTriangle, CheckCircle,
  ArrowUpRight, ArrowDownRight, Globe, Zap, BarChart2, Lock,
  Eye, MessageSquare, Star, Activity
} from '../components/ui/icons'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const briefingMetrics = [
  { label: 'Active Users (24h)', value: '284,192', delta: '+4.2%', up: true, icon: Users },
  { label: 'Verifications Today', value: '12,847', delta: '+18%', up: true, icon: Shield },
  { label: 'Trust Score Avg', value: '74.3', delta: '+0.8pts', up: true, icon: Star },
  { label: 'Fraud Signals', value: '23', delta: '-34%', up: true, icon: Lock },
]

const domains = [
  { name: 'Growth', icon: TrendingUp, color: '#0057D9', bg: '#EEF4FF', status: 'healthy', kpi: '4.2M users · +12% MoM', tasks: 2 },
  { name: 'Trust & Verification', icon: Shield, color: '#00C853', bg: '#DCFCE7', status: 'healthy', kpi: '98% verification SLA', tasks: 0 },
  { name: 'Security', icon: Lock, color: '#F59E0B', bg: '#FEF3C7', status: 'attention', kpi: '23 signals · 2 elevated', tasks: 3 },
  { name: 'Business / Revenue', icon: BarChart2, color: '#7C3AED', bg: '#EDE9FE', status: 'healthy', kpi: '$2.4M ARR · +31% YoY', tasks: 1 },
  { name: 'Infrastructure', icon: Cpu, color: '#0EA5E9', bg: '#E0F2FE', status: 'healthy', kpi: '99.97% uptime · p99 180ms', tasks: 0 },
  { name: 'Community', icon: Globe, color: '#64748B', bg: '#F1F5F9', status: 'healthy', kpi: '18,400 communities active', tasks: 0 },
]

const priorities = [
  { id: 1, label: 'Review elevated fraud signal: 2 accounts under investigation', urgency: 'high', domain: 'Security', impact: 'High' },
  { id: 2, label: 'Approve 4 institutional verification partnerships pending for >72h', urgency: 'medium', domain: 'Trust', impact: 'Medium' },
  { id: 3, label: 'Infrastructure capacity review: storage projected to hit 85% in 14 days', urgency: 'medium', domain: 'Infrastructure', impact: 'High' },
  { id: 4, label: 'Legal: respond to data portability request (GDPR) — deadline Feb 5', urgency: 'high', domain: 'Legal', impact: 'Compliance' },
  { id: 5, label: 'Launch Africa region onboarding campaign — assets approved, ready to ship', urgency: 'low', domain: 'Growth', impact: 'Medium' },
]

const signals = [
  { icon: Users, label: 'Nigeria signups +240% this week', type: 'growth', time: '2h ago' },
  { icon: AlertTriangle, label: 'Unusual login pattern: 18 accounts, Lagos region', type: 'security', time: '4h ago' },
  { icon: CheckCircle, label: 'Oxford University integration deployed — 12,000 credentials synced', type: 'trust', time: '6h ago' },
  { icon: Star, label: 'App Store rating hit 4.9 — NPS at 78 (record high)', type: 'growth', time: '1d ago' },
  { icon: MessageSquare, label: 'Support ticket volume down 22% — last 7 days', type: 'ops', time: '1d ago' },
]

const urgencyConfig = {
  high:   { color: '#DC2626', bg: '#FEE2E2', label: 'High' },
  medium: { color: '#D97706', bg: '#FEF3C7', label: 'Medium' },
  low:    { color: '#64748B', bg: '#F1F5F9', label: 'Low' },
}

export default function MissionControl() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Briefing header */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={16} className="text-[#0057D9]" />
          <span className="text-xs font-bold text-[#0057D9] uppercase tracking-wider">PROFILE Mission Control</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Good morning, <span className="gradient-text">James.</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Saturday, 1 August 2026 · 5 priorities need your decision today</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        {briefingMetrics.map(({ label, value, delta, up, icon: Icon }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon size={16} className="text-slate-400" />
              <span className={`flex items-center gap-0.5 text-[11px] font-bold ${up ? 'text-[#00C853]' : 'text-[#DC2626]'}`}>
                {up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}{delta}
              </span>
            </div>
            <div className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {/* Today's Priorities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-bold text-slate-800 text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>Today's Priorities</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] rounded-full">{priorities.length} decisions</span>
            </div>
            <div className="space-y-2">
              {priorities.map((p, i) => {
                const urg = urgencyConfig[p.urgency as keyof typeof urgencyConfig]
                return (
                  <div key={p.id} className="bg-white border border-slate-100 rounded-xl p-4 flex items-start gap-4">
                    <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 leading-snug">{p.label}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: urg.bg, color: urg.color }}>{urg.label}</span>
                        <Badge variant="outline" size="sm">{p.domain}</Badge>
                        <span className="text-[10px] text-slate-400">Impact: {p.impact}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors shrink-0">
                      <CheckCircle size={16} className="text-slate-300 hover:text-[#00C853]" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Intelligence Domains */}
          <div>
            <h2 className="font-bold text-slate-800 text-base mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Intelligence Domains</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {domains.map(d => {
                const Icon = d.icon
                return (
                  <div key={d.name} className="bg-white border border-slate-100 rounded-2xl p-4 cursor-pointer hover:border-slate-200 transition-all card-hover">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: d.bg }}>
                        <Icon size={16} style={{ color: d.color }} />
                      </div>
                      {d.status === 'attention' ? (
                        <AlertTriangle size={14} className="text-[#F59E0B]" />
                      ) : (
                        <CheckCircle size={14} className="text-[#00C853]" />
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-800 mb-0.5">{d.name}</div>
                    <div className="text-[11px] text-slate-500 leading-snug">{d.kpi}</div>
                    {d.tasks > 0 && (
                      <div className="mt-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded-full">{d.tasks} action{d.tasks > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Signal feed */}
        <div>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-sm text-slate-800">Notable Signals</span>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <div className="divide-y divide-slate-50">
              {signals.map((s, i) => {
                const Icon = s.icon
                const typeColors: Record<string, string> = {
                  growth: '#0057D9', security: '#DC2626', trust: '#00C853', ops: '#64748B'
                }
                return (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: typeColors[s.type] + '15' }}>
                      <Icon size={14} style={{ color: typeColors[s.type] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 leading-snug">{s.label}</p>
                      <div className="text-[10px] text-slate-400 mt-1">{s.time}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 bg-gradient-to-br from-[#003A8C] to-[#0057D9] rounded-2xl p-4 text-white">
            <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Quick Actions</div>
            <div className="space-y-2">
              {[
                { icon: Shield, label: 'Verification queue', count: '47 pending' },
                { icon: Eye, label: 'Moderation queue', count: '12 flagged' },
                { icon: Zap, label: 'Deploy announcement', count: '' },
              ].map(({ icon: Icon, label, count }) => (
                <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer text-left">
                  <Icon size={14} className="text-white/70" />
                  <span className="text-sm text-white font-medium flex-1">{label}</span>
                  {count && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full text-white">{count}</span>}
                  <ArrowUpRight size={12} className="text-white/40" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
