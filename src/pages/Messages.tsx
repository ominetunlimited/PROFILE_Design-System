import { useState } from 'react'
import { Search, Send, MoreHorizontal, Phone, Video, CheckCheck, Plus, Smile, Paperclip } from 'lucide-react'
import VerificationBadge from '../components/ui/VerificationBadge'

const conversations = [
  {
    id: 1,
    name: 'Fatima Al-Hassan',
    role: 'ML Lead · IBM',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&auto=format',
    lastMessage: "Thanks for sharing the paper! The RLHF section is exactly what I was looking for.",
    time: '2m ago',
    unread: 3,
    verified: true,
    online: true },
  {
    id: 2,
    name: 'Kwame Mensah',
    role: 'Structural Engineer · Bechtel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format',
    lastMessage: "Are you available for a quick call on Thursday?",
    time: '45m ago',
    unread: 0,
    verified: true,
    online: false },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'VP Product · Linear',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&auto=format',
    lastMessage: "We'd love to schedule an interview — when are you free next week?",
    time: '2h ago',
    unread: 1,
    verified: true,
    online: true,
    isRecruiter: true },
  {
    id: 4,
    name: 'Carlos Ramírez',
    role: 'DevOps Architect · Shopify',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format',
    lastMessage: "Great working with you on the k8s migration. Let's connect on the next one.",
    time: '1d ago',
    unread: 0,
    verified: false,
    online: false },
]

const messages = [
  { id: 1, from: 'them', text: "Hi James! I came across your PROFILE and your work on distributed systems is impressive.", time: '10:24 AM', read: true },
  { id: 2, from: 'them', text: "We're hiring for a Principal Engineer role at Linear and I immediately thought of you. Would you be open to learning more?", time: '10:24 AM', read: true },
  { id: 3, from: 'me', text: "Hi Priya, thank you — I appreciate that. I'm definitely open to exploring this. Linear is doing great work.", time: '10:31 AM', read: true },
  { id: 4, from: 'me', text: "What does the role entail and what stage of the process are you at?", time: '10:31 AM', read: true },
  { id: 5, from: 'them', text: "It's a backend-focused role working on core infrastructure. Compensation is $160k–$200k + meaningful equity. We move quickly — usually 2 rounds.", time: '10:45 AM', read: true },
  { id: 6, from: 'them', text: "We'd love to schedule an interview — when are you free next week?", time: '10:46 AM', read: false },
]

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(3)
  const [input, setInput] = useState('')
  const [localMessages, setLocalMessages] = useState(messages)
  const convo = conversations.find(c => c.id === activeConvo)

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setLocalMessages(m => [...m, {
      id: Date.now(), from: 'me', text: input.trim(), time: 'Now', read: true
    }])
    setInput('')
  }

  return (
    <div className="max-w-5xl mx-auto lg:px-6 py-0 lg:py-6 pb-20 lg:pb-6">
      <div className="bg-white border border-slate-100 rounded-none lg:rounded-2xl overflow-hidden h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)] flex">
        {/* Conversation list */}
        <div className="w-full lg:w-[300px] shrink-0 border-r border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-slate-800 text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>Messages</h2>
              <button className="p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"><Plus size={15} className="text-slate-500" /></button>
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search conversations..." className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1565D8]/40" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveConvo(c.id)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors text-left border-b border-slate-50 ${activeConvo === c.id ? 'bg-[#EEF4FF] border-l-2 border-l-[#1565D8]' : ''}`}
              >
                <div className="relative shrink-0">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-800 truncate">{c.name}</span>
                      {c.verified && <VerificationBadge level="verified" size="sm" />}
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{c.time}</span>
                  </div>
                  {c.isRecruiter && <div className="text-[10px] text-[#7C3AED] font-semibold">Recruiter</div>}
                  <p className="text-xs text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#1565D8] text-white text-[10px] flex items-center justify-center font-bold shrink-0">{c.unread}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {convo && (
          <div className="hidden lg:flex flex-1 flex-col">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100">
              <div className="relative">
                <img src={convo.avatar} alt={convo.name} className="w-9 h-9 rounded-full object-cover" />
                {convo.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 text-sm">{convo.name}</span>
                  {convo.verified && <VerificationBadge level="verified" size="sm" />}
                </div>
                <div className="text-xs text-slate-500">{convo.role} {convo.online ? '· Online' : '· Last seen 2h ago'}</div>
              </div>
              <div className="ml-auto flex gap-1">
                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"><Phone size={15} /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"><Video size={15} /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"><MoreHorizontal size={15} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {localMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-[#1565D8] text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                  }`}>
                    {msg.text}
                    <div className={`flex items-center gap-1 mt-1 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-[10px] ${msg.from === 'me' ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</span>
                      {msg.from === 'me' && <CheckCheck size={11} className={msg.read ? 'text-blue-200' : 'text-blue-300/50'} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={send} className="px-4 py-3.5 border-t border-slate-100 flex items-center gap-2">
              <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer"><Paperclip size={16} /></button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8]/40 focus:ring-1 focus:ring-[#1565D8]/10"
              />
              <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer"><Smile size={16} /></button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-[#1565D8] hover:bg-[#1255C0] text-white rounded-xl cursor-pointer disabled:opacity-40 transition-colors"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
