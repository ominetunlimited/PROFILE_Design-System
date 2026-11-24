import { useState } from 'react'
import {
  Search, ChevronRight, MessageCircle, BookOpen, Shield,
  Zap, Users, CreditCard, HelpCircle, ChevronDown, ExternalLink, Send
} from '../components/ui/icons'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'

type HelpTab = 'browse' | 'contact' | 'status'

const categories = [
  { icon: Users, label: 'Account & Profile', count: 24, color: '#0057D9', bg: '#EEF4FF' },
  { icon: Shield, label: 'Trust & Verification', count: 18, color: '#00C853', bg: '#DCFCE7' },
  { icon: Zap, label: 'Opportunities & Career', count: 15, color: '#7C3AED', bg: '#EDE9FE' },
  { icon: MessageCircle, label: 'Messages & Connections', count: 12, color: '#F59E0B', bg: '#FEF3C7' },
  { icon: CreditCard, label: 'Billing & Subscriptions', count: 9, color: '#DC2626', bg: '#FEE2E2' },
  { icon: BookOpen, label: 'Learning & Community', count: 11, color: '#0EA5E9', bg: '#E0F2FE' },
]

const faqs = [
  {
    q: 'How does my Trust Score work?',
    a: 'Your Trust Score is a composite metric from 0–100 based on verified credentials, employment history, education, references, and identity verification. Each verified item adds points; a stronger verification (e.g., institution-confirmed degree) adds more than a self-declared one.',
  },
  {
    q: 'How do I verify my employment?',
    a: 'Go to Trust Center → Employment. You can connect via LinkedIn import, upload payslips/offer letters, or request institutional confirmation directly from your employer\'s HR system if they\'ve integrated with PROFILE.',
  },
  {
    q: 'Can recruiters see my profile without my permission?',
    a: 'Only the information you choose to make public is visible to recruiters. You control per-field visibility in Settings → Privacy & Visibility. Trust Score and verified badge status are visible to logged-in PROFILE users by default.',
  },
  {
    q: 'How is my CV different from my Portfolio?',
    a: 'Your CV is a structured, exportable professional record — formatted for traditional job applications. Your Portfolio is a living, evidence-based showcase of your work, projects, and achievements with media attachments and attribution.',
  },
  {
    q: 'How do I create an organisation account?',
    a: 'Go to your avatar menu → Switch Workspace → Create Organisation. You do not need a verified individual account — you can create an organisation account directly. Your personal and organisation accounts remain separate.',
  },
  {
    q: 'What happens to my data if I close my account?',
    a: 'Your data enters a 30-day recovery window before permanent deletion. During this period you can reactivate your account. After 30 days, all data is permanently erased from our systems. You can export everything before closing.',
  },
]

const statusItems = [
  { service: 'PROFILE Platform', status: 'operational', uptime: '99.97%' },
  { service: 'Verification Engine', status: 'operational', uptime: '99.94%' },
  { service: 'Trust Score System', status: 'operational', uptime: '100%' },
  { service: 'Messaging', status: 'degraded', uptime: '98.2%' },
  { service: 'Marketplace & Payments', status: 'operational', uptime: '99.99%' },
  { service: 'API & Integrations', status: 'operational', uptime: '99.91%' },
]

export default function HelpSupport() {
  const [tab, setTab] = useState<HelpTab>('browse')
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactSent, setContactSent] = useState(false)

  const filteredFaqs = faqs.filter(f =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Help & Support</h1>
        <p className="text-slate-500 text-sm mt-0.5">Find answers, browse guides, or reach our team</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {([['browse', 'Browse Help'], ['contact', 'Contact Us'], ['status', 'System Status']] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-[10px] text-sm font-semibold cursor-pointer transition-all ${
              tab === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'browse' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search help articles..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 placeholder:text-slate-400"
            />
          </div>

          {!search && (
            <>
              {/* Categories */}
              <div>
                <h2 className="font-bold text-slate-700 text-sm mb-3">Browse by topic</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map(({ icon: Icon, label, count, color, bg }) => (
                    <button key={label} className="text-left bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-all cursor-pointer card-hover">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <div className="font-semibold text-sm text-slate-800 leading-snug">{label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{count} articles</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-gradient-to-r from-[#003A8C] to-[#0057D9] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">PROFILE Academy</div>
                  <div className="text-white/70 text-xs mt-0.5">Guides, tutorials, and best practices</div>
                </div>
                <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />} className="text-white hover:bg-white/20">
                  Open
                </Button>
              </div>
            </>
          )}

          {/* FAQs */}
          <div>
            <h2 className="font-bold text-slate-700 text-sm mb-3">{search ? `Results for "${search}"` : 'Frequently asked questions'}</h2>
            {filteredFaqs.length === 0 ? (
              <EmptyState
                icon={<HelpCircle size={24} />}
                title="No results found"
                description="Try a different search term or browse by topic above."
                compact
              />
            ) : (
              <div className="space-y-2">
                {filteredFaqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-sm text-slate-800 pr-4">{faq.q}</span>
                      <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'contact' && (
        <div className="space-y-4">
          {contactSent ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-[#00C853]" />
              </div>
              <h2 className="font-bold text-slate-800 text-lg" style={{ fontFamily: 'Plus Jakarta Sans' }}>Message sent</h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">Our support team will respond within 24 hours. Check your email for a confirmation.</p>
              <Button variant="outline" size="sm" onClick={() => setContactSent(false)} className="mt-6">Send another</Button>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h2 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Contact support</h2>
              <p className="text-sm text-slate-500">Average response time: under 24 hours. Priority support available for Pro and Enterprise plans.</p>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Topic</label>
                <select className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10">
                  <option>Account or profile issue</option>
                  <option>Verification problem</option>
                  <option>Billing question</option>
                  <option>Technical bug</option>
                  <option>Privacy or data concern</option>
                  <option>Report content</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Subject</label>
                <input type="text" placeholder="Brief summary of your issue" className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Message</label>
                <textarea rows={5} placeholder="Describe your issue in detail. Include any relevant steps to reproduce it." className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 resize-none" />
              </div>
              <Button fullWidth icon={<Send size={14} />} onClick={() => setContactSent(true)}>Send message</Button>
            </div>
          )}

          {/* Self-serve links */}
          <div className="space-y-2">
            {[
              { icon: BookOpen, label: 'PROFILE documentation', desc: 'Full product guides and tutorials' },
              { icon: Shield, label: 'Trust & verification FAQ', desc: 'How your Trust Score works' },
              { icon: Users, label: 'Community forum', desc: 'Answers from the PROFILE community' },
            ].map(({ icon: Icon, label, desc }) => (
              <button key={label} className="w-full flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all cursor-pointer text-left">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-slate-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-slate-800">{label}</div>
                  <div className="text-xs text-slate-500">{desc}</div>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'status' && (
        <div className="space-y-4">
          <div className="bg-[#DCFCE7] border border-[#00C853]/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-[#00C853] rounded-full" />
            <div>
              <div className="font-bold text-sm text-[#166534]">All systems operational</div>
              <div className="text-xs text-[#166534]/70">Last checked: just now</div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
            {statusItems.map(({ service, status, uptime }) => (
              <div key={service} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${status === 'operational' ? 'bg-[#00C853]' : 'bg-[#F59E0B]'}`} />
                  <span className="text-sm font-medium text-slate-700">{service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{uptime} uptime</span>
                  <span className={`text-xs font-bold capitalize ${status === 'operational' ? 'text-[#00C853]' : 'text-[#F59E0B]'}`}>{status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="text-xs text-[#0057D9] font-semibold hover:underline cursor-pointer flex items-center gap-1 mx-auto">
              <ExternalLink size={11} />Full status history
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
