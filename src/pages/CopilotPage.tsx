import { useState } from 'react'
import {
  Bot, Sparkles, TrendingUp, Shield, Send,
  CheckCircle, BookOpen, Briefcase, Target, ChevronRight
} from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

type Mode = 'chat' | 'goals'

const suggestions = [
  { icon: TrendingUp, label: 'How do I improve my Trust Score?', category: 'Trust' },
  { icon: Briefcase, label: 'Write a cover letter for a Senior Engineer role at Stripe', category: 'Career' },
  { icon: Shield, label: 'Which credentials should I verify first?', category: 'Trust' },
  { icon: BookOpen, label: 'Suggest a learning path to become a Staff Engineer', category: 'Learning' },
  { icon: Target, label: 'What skills am I missing for the top 5 matched roles?', category: 'Opportunity' },
  { icon: Sparkles, label: 'Draft a professional bio for my public profile', category: 'Profile' },
]

type MsgRole = 'assistant' | 'user'
type Msg = { role: MsgRole; text: string; time: string }

const initialMessages: Msg[] = [
  {
    role: 'assistant',
    text: "Hello James. I'm your PROFILE Copilot — I have full context of your verified history, current Trust Score of 87, and your career goals. I'm here to help you grow faster, apply smarter, and navigate the platform. What would you like to work on today?",
    time: 'Now',
  },
]

export default function CopilotPage() {
  const [mode, setMode] = useState<Mode>('chat')
  const [messages, setMessages] = useState<Msg[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = (text?: string) => {
    const msg = text ?? input.trim()
    if (!msg) return
    setInput('')
    setMessages(m => [...m, { role: 'user' as const, text: msg, time: 'Just now' }])
    setLoading(true)
    setTimeout(() => {
      const responses: Record<string, string> = {
        'How do I improve my Trust Score?': 'Your Trust Score of 87 is already in the top 15% of users. To reach 90+, the highest-impact actions are: (1) Add identity verification — adds approximately +8 pts; (2) Request two professional references through the References module — each adds +3 pts; (3) Verify your Oxford degree with the institutional connector — +5 pts. These three actions alone could push you to 96, unlocking our Trusted tier and significantly increasing recruiter visibility.',
      }
      setMessages(m => [...m, {
        role: 'assistant' as const,
        text: responses[msg] ?? `I've analysed your profile data in the context of "${msg}". Based on your verified credentials, Trust Score, and recent activity patterns, here's my recommendation: focus on verification completeness first — it has the highest signal value for opportunities in your target roles. I can generate a specific action plan if you'd like to go deeper.`,
        time: 'Just now',
      }])
      setLoading(false)
    }, 1400)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#0057D9] to-[#003A8C] rounded-2xl flex items-center justify-center shadow-lg">
          <Bot size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>PROFILE Copilot</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-slate-500">Context-aware AI assistant</span>
            <Badge variant="blue" size="sm">AI-assisted</Badge>
          </div>
        </div>
      </div>

      {/* Context card */}
      <div className="bg-[#EEF4FF] border border-[#0057D9]/15 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Sparkles size={16} className="text-[#0057D9] shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-[#0057D9] mb-1">What I know about you right now</div>
          <div className="flex flex-wrap gap-2">
            {[
              'Trust Score 87 · Trusted tier',
              '78% profile strength',
              'Goal: Senior → Staff Engineer',
              '28 matched opportunities',
              '3 pending verifications',
            ].map(item => (
              <span key={item} className="text-[11px] bg-white border border-[#0057D9]/20 text-[#003A8C] px-2 py-0.5 rounded-full font-medium">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {([['chat', 'Chat'], ['goals', 'Goals & Focus']] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
              mode === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          {/* Chat */}
          <div className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden" style={{ minHeight: 480 }}>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => {
                const isUser = (msg.role as string) === 'user'
                return (
                <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-7 h-7 bg-[#0057D9] rounded-full flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Bot size={13} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#0057D9] text-white rounded-br-sm'
                      : 'bg-slate-50 text-slate-800 rounded-bl-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1 ${isUser ? 'text-white/60' : 'text-slate-400'}`}>{msg.time}</div>
                  </div>
                </div>
                )
              })}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 bg-[#0057D9] rounded-full flex items-center justify-center mr-2 shrink-0">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-slate-50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-100">
              <div className="text-[10px] text-center text-slate-400 mb-2">AI-assisted · not a substitute for professional advice · responses may be inaccurate</div>
              <form onSubmit={e => { e.preventDefault(); send() }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything about your career, profile, or opportunities..."
                  className="flex-1 text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 placeholder:text-slate-400"
                />
                <button type="submit" className="px-4 py-2.5 bg-[#0057D9] rounded-xl flex items-center gap-1.5 hover:bg-[#003A8C] transition-colors cursor-pointer">
                  <Send size={14} className="text-white" />
                </button>
              </form>
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Suggested prompts</div>
            <div className="space-y-2">
              {suggestions.map((s, i) => {
                const Icon = s.icon
                return (
                  <button
                    key={i}
                    onClick={() => send(s.label)}
                    className="w-full text-left flex items-start gap-2.5 p-3 bg-white border border-slate-100 rounded-xl hover:border-[#0057D9]/30 hover:bg-[#EEF4FF] transition-all cursor-pointer group"
                  >
                    <Icon size={14} className="text-[#0057D9] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-700 group-hover:text-[#0057D9] transition-colors leading-snug">{s.label}</div>
                      <span className="mt-1 inline-block text-[10px] font-semibold text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">{s.category}</span>
                    </div>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0057D9] ml-auto mt-0.5 transition-colors" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {mode === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { goal: 'Reach Trust Score 95+', progress: 87, target: 95, steps: ['Add identity verification (+8 pts)', 'Get 2 professional references (+6 pts)', 'Verify Oxford degree (+5 pts)'] },
            { goal: 'Land Staff Engineer role by Q3', progress: 60, target: 100, steps: ['Complete 3 pending applications', 'Add Kubernetes to verified skills', 'Build a public technical portfolio item'] },
            { goal: 'Grow professional network to 500', progress: 42, target: 100, steps: ['Connect with 8 suggested engineers', 'Comment on 5 activities per week', 'Join AWS Professionals community'] },
            { goal: 'Publish 4 portfolio projects', progress: 25, target: 100, steps: ['Add payment infrastructure case study', 'Document cloud migration project', 'Share open source contributions'] },
          ].map(({ goal, progress, target, steps }) => (
            <div key={goal} className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="font-bold text-sm text-slate-800 leading-tight">{goal}</div>
                <span className="text-xs font-bold text-[#0057D9]">{Math.round(progress * target / 100)}/{target}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-2 bg-[#0057D9] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="space-y-1.5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 border-2 border-slate-200 rounded-full shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600">{step}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" fullWidth className="mt-4" icon={<CheckCircle size={12} />}>
                Get Copilot help
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
