import { useState } from 'react'
import { Bot, X, Sparkles, ChevronDown, Send, Lightbulb, TrendingUp, Shield } from 'lucide-react'
import type { Page } from './layout/Sidebar'

interface Props {
  open: boolean
  onToggle: () => void
  currentPage: Page
}

const contextMap: Record<string, string> = {
  home: 'Home Feed · Goal: grow your network',
  trust: 'Trust Center · Goal: improve Trust Score',
  opportunity: 'Opportunity Hub · Goal: find your next role',
  cv: 'CV & Portfolio · Goal: showcase your work',
  analytics: 'Analytics · Goal: understand your reach',
  settings: 'Settings · No active task',
}

const suggestions: Record<string, { icon: typeof Lightbulb; label: string; action: string }[]> = {
  home: [
    { icon: TrendingUp, label: 'Boost your visibility', action: 'Add 2 skills that recruiters searched for this week' },
    { icon: Sparkles, label: 'Complete your profile', action: 'Add a portfolio item — profiles with work samples get 3× more views' },
    { icon: Shield, label: 'Verify a credential', action: 'Your Oxford degree is unverified — institutions trust verified records' },
  ],
  trust: [
    { icon: Shield, label: 'Add ID verification', action: 'Identity verification adds +12 pts to your Trust Score' },
    { icon: Sparkles, label: 'Link your employment', action: 'Connect your LinkedIn or upload a pay stub to verify current role' },
    { icon: TrendingUp, label: 'Request references', action: 'Two professional references can push your score above 90' },
  ],
  opportunity: [
    { icon: TrendingUp, label: 'You\'re 96% matched', action: 'Apply to the Stripe Principal Engineer role — a recruiter viewed you' },
    { icon: Lightbulb, label: 'Skill gap detected', action: 'Add Kubernetes to your profile to unlock 4 more senior roles' },
    { icon: Sparkles, label: 'One-tap apply', action: 'PROFILE Apply is enabled — send to 3 saved roles in seconds' },
  ],
}

type Message = { role: 'assistant' | 'user'; text: string }

const messages: Message[] = [
  { role: 'assistant', text: "I'm your PROFILE Copilot — I understand your verified history, current goals, and the platform context you're in. What would you like to work on?" },
]

export default function ProfileCopilot({ open, onToggle, currentPage }: Props) {
  const [expanded, setExpanded] = useState(true)
  const [input, setInput] = useState('')
  const [chat, setChat] = useState<Message[]>(messages)
  const [loading, setLoading] = useState(false)

  const context = contextMap[currentPage] ?? `${currentPage} · Exploring`
  const tips = suggestions[currentPage] ?? suggestions.home

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setChat(c => [...c, { role: 'user' as const, text: userMsg }])
    setLoading(true)
    setTimeout(() => {
      setChat(c => [...c, {
        role: 'assistant' as const,
        text: `I've noted "${userMsg}" and I'm analysing your profile data. Based on your Trust Score of 87 and current activity, here's what I suggest: start by completing your credential verification in the Trust Centre — it's the highest-impact action available to you right now.`,
      }])
      setLoading(false)
    }, 1200)
  }

  return (
    <>
      {/* FAB trigger */}
      <button
        onClick={onToggle}
        aria-label="Open PROFILE Copilot"
        className={`fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer ${
          open ? 'bg-slate-700 scale-90' : 'bg-[#0057D9] hover:bg-[#003A8C] scale-100'
        }`}
      >
        {open ? <X size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-40 right-4 lg:bottom-20 lg:right-6 z-40 w-[340px] max-h-[560px] bg-white rounded-2xl border border-slate-100 copilot-shadow flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-[#0057D9] to-[#003A8C] rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot size={15} className="text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">PROFILE Copilot</div>
                <div className="text-white/60 text-[10px]">AI-assisted · always labeled</div>
              </div>
            </div>
            <button onClick={() => setExpanded(v => !v)} className="text-white/70 hover:text-white cursor-pointer p-1">
              <ChevronDown size={15} className={`transition-transform ${expanded ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* Context banner */}
          <div className="px-3 py-2 bg-[#EEF4FF] border-b border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Current context</div>
            <div className="text-xs font-semibold text-[#0057D9]">{context}</div>
          </div>

          {expanded && (
            <>
              {/* Suggestions */}
              <div className="px-3 py-2 border-b border-slate-50 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Suggestions</div>
                {tips.map((tip, i) => {
                  const Icon = tip.icon
                  return (
                    <button key={i} className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-[#EEF4FF] transition-colors cursor-pointer group">
                      <Icon size={14} className="text-[#0057D9] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-700 group-hover:text-[#0057D9] transition-colors">{tip.label}</div>
                        <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{tip.action}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Chat */}
              <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-0 max-h-[200px]">
                {chat.map((msg, i) => (
                  <div key={i} className={`flex ${(msg.role as string) === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] text-xs leading-relaxed px-3 py-2 rounded-xl ${
                      (msg.role as string) === 'user'
                        ? 'bg-[#0057D9] text-white rounded-br-sm'
                        : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-slate-100">
                <div className="text-[9px] text-slate-400 mb-1.5 text-center">AI-assisted · responses are not a substitute for professional advice</div>
                <form onSubmit={e => { e.preventDefault(); send() }} className="flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask Copilot..."
                    className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 placeholder:text-slate-400"
                  />
                  <button type="submit" className="w-8 h-8 bg-[#0057D9] rounded-xl flex items-center justify-center hover:bg-[#003A8C] transition-colors cursor-pointer shrink-0">
                    <Send size={13} className="text-white" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
