import { useState } from 'react'
import {
  ArrowRight, Shield, CheckCircle, TrendingUp, Globe, Users, Briefcase, BookOpen, Star, ChevronRight, Play,
  Building2, GraduationCap, Scale, Zap, Lock, BarChart2,
  FileText, Layers
} from 'lucide-react'
import { ProfileIcon, ProfileWordmark } from '../components/ui/ProfileLogo'

interface LandingProps {
  onGetStarted: () => void
  onSignIn: () => void
}

const stats = [
  { value: '4.2M+', label: 'Verified Professionals' },
  { value: '98,000+', label: 'Institutions Connected' },
  { value: '220+', label: 'Countries Served' },
  { value: '$2.4B+', label: 'Opportunities Matched' },
]

const journey = [
  { step: 'Learning', desc: 'Build skills and earn credentials from trusted institutions worldwide.', icon: BookOpen, color: '#1565D8' },
  { step: 'Identity', desc: 'Create your professional identity — verified, portable, and globally recognised.', icon: Shield, color: '#0A2E8A' },
  { step: 'Evidence', desc: 'Document your work, projects, achievements, and impact with evidence.', icon: FileText, color: '#1565D8' },
  { step: 'Verification', desc: 'Have your credentials and experience verified by employers and institutions.', icon: CheckCircle, color: '#16A34A' },
  { step: 'Trust', desc: 'Build a Trust Score that speaks before you do — in every opportunity.', icon: Star, color: '#F4B400' },
  { step: 'Opportunity', desc: 'Unlock jobs, contracts, scholarships, and collaborations matched to your verified profile.', icon: Briefcase, color: '#7C3AED' },
  { step: 'Growth', desc: 'Accelerate your career with AI-powered insights, mentorship, and community.', icon: TrendingUp, color: '#059669' },
  { step: 'Prosperity', desc: 'Achieve economic independence through a career built on verified merit.', icon: Globe, color: '#F4B400' },
]

const features = [
  {
    icon: Shield,
    color: '#1565D8', bg: '#EEF4FF',
    title: 'Trust Center',
    desc: 'A living record of your verified credentials, experience, and reputation — anchored cryptographically.' },
  {
    icon: CheckCircle,
    color: '#16A34A', bg: '#DCFCE7',
    title: 'Instant Verification',
    desc: 'Education, employment, certifications, and references verified directly by issuing institutions.' },
  {
    icon: Briefcase,
    color: '#7C3AED', bg: '#EDE9FE',
    title: 'Opportunity Hub',
    desc: 'Jobs, contracts, scholarships, and internships matched to your verified profile — not just keywords.' },
  {
    icon: BarChart2,
    color: '#0891B2', bg: '#CFFAFE',
    title: 'Career Analytics',
    desc: 'Understand your market position, recruiter interest, skill gaps, and career trajectory.' },
  {
    icon: Layers,
    color: '#DB2777', bg: '#FCE7F3',
    title: 'CV & Portfolio',
    desc: 'A dynamic, verified CV that updates automatically as you earn and verify new credentials.' },
  {
    icon: Globe,
    color: '#D97706', bg: '#FEF3C7',
    title: 'Global Marketplace',
    desc: 'Sell your expertise as services, courses, or consulting — to a network of verified professionals.' },
]

const audiences = [
  { icon: GraduationCap, label: 'Students & Graduates', desc: 'Start building your verified identity from day one.' },
  { icon: Users, label: 'Professionals', desc: 'Elevate your career with a trust-first professional profile.' },
  { icon: Briefcase, label: 'Recruiters', desc: 'Hire with confidence using verified, evidence-backed profiles.' },
  { icon: Building2, label: 'Companies', desc: 'Verify employees, issue credentials, and recruit smarter.' },
  { icon: GraduationCap, label: 'Universities', desc: 'Issue verifiable digital credentials directly to graduates.' },
  { icon: Scale, label: 'Governments', desc: 'Connect licensing, accreditation and public professional records.' },
]

const testimonials = [
  {
    name: 'Amara Diallo',
    role: 'UX Research Lead · Figma',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=56&h=56&fit=crop&auto=format',
    quote: "PROFILE completely changed how I present myself. Recruiters trust my verified credentials instantly — I don't need to explain my CV in interviews anymore.",
    trust: 92 },
  {
    name: 'Dr. Kwame Mensah',
    role: 'Structural Engineer · Bechtel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&auto=format',
    quote: "Having my PE licence and engineering credentials verified on PROFILE opened three new international contracts within a month. The trust economy is real.",
    trust: 95 },
  {
    name: 'Priya Sharma',
    role: 'VP Product · Linear',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&auto=format',
    quote: "We now require all senior hires to have a PROFILE verification. It cuts our reference check time from weeks to hours. The quality of hire has never been higher.",
    trust: 88 },
]

const institutions = [
  { name: 'MIT', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=40&fit=crop&auto=format&q=60' },
  { name: 'Oxford', logo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=80&h=40&fit=crop&auto=format&q=60' },
  { name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&h=40&fit=crop&auto=format&q=60' },
  { name: 'Stripe', logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=40&fit=crop&auto=format&q=60' },
  { name: 'McKinsey', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=40&fit=crop&auto=format&q=60' },
  { name: 'WHO', logo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=40&fit=crop&auto=format&q=60' },
]

// Background icon pattern - ultra-faint professional icons
function BackgroundPattern() {
  const icons = [
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z', // person
    'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', // layers/stack
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', // users
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', // box/portfolio
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // shield
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', // github-ish
    'M22 12h-4l-3 9L9 3l-3 9H2', // activity
    'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', // message
  ]

  const positions = [
    { x: 5, y: 8 }, { x: 18, y: 15 }, { x: 30, y: 5 }, { x: 45, y: 20 },
    { x: 60, y: 8 }, { x: 75, y: 18 }, { x: 88, y: 6 }, { x: 95, y: 22 },
    { x: 12, y: 40 }, { x: 28, y: 55 }, { x: 50, y: 45 }, { x: 70, y: 52 },
    { x: 85, y: 42 }, { x: 92, y: 62 }, { x: 20, y: 72 }, { x: 40, y: 80 },
    { x: 62, y: 75 }, { x: 78, y: 85 }, { x: 10, y: 90 }, { x: 55, y: 92 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {positions.map((pos, i) => (
          <g key={i} transform={`translate(${pos.x * 14}, ${pos.y * 9}) scale(0.9)`} opacity="0.028">
            <path d={icons[i % icons.length]} stroke="#1565D8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Landing({ onGetStarted, onSignIn }: LandingProps) {
  const [activeJourneyStep, setActiveJourneyStep] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-100 px-5 lg:px-10 h-16 flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <ProfileIcon size={32} />
          <ProfileWordmark size={18} theme="dark" />
        </div>
        <div className="hidden lg:flex items-center gap-6 ml-6">
          {['Features', 'Trust', 'For Institutions', 'Marketplace', 'Pricing'].map(item => (
            <button key={item} className="text-sm text-slate-600 hover:text-slate-900 font-medium cursor-pointer transition-colors">
              {item}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={onSignIn}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1565D8] hover:bg-[#1255C0] text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            Get Started
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <BackgroundPattern />

        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1565D8]/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#F4B400]/8 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 lg:px-10 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-16 items-center">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EEF4FF] border border-[#1565D8]/20 rounded-full mb-6">
              <Zap size={12} className="text-[#1565D8]" />
              <span className="text-xs font-bold text-[#1565D8] uppercase tracking-wide">The Global Professional Identity Platform</span>
            </div>

            {/* Logo mark — large */}
            <div className="flex items-center gap-4 mb-6">
              <ProfileIcon size={56} />
              <div>
                <ProfileWordmark size={48} theme="dark" />
                <div className="text-xs text-slate-400 font-semibold tracking-widest uppercase mt-1">Professional Identity OS</div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-black text-[#111111] leading-[1.08] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Your career, <br />
              <span style={{ background: 'linear-gradient(135deg, #1565D8, #0A2E8A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                verified.
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl">
              Build a verified professional identity that earns trust across every border, institution, and opportunity. Not a CV — your living proof.
            </p>

            {/* Journey pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Learning', 'Identity', 'Evidence', 'Verification', 'Trust', 'Opportunity', 'Growth', 'Prosperity'].map((step, i) => (
                <span key={step} className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <span className={`px-2.5 py-1 rounded-full ${i % 3 === 0 ? 'bg-[#EEF4FF] text-[#1565D8]' : i % 3 === 1 ? 'bg-[#FFF8E1] text-[#B8860B]' : 'bg-slate-100 text-slate-600'}`}>
                    {step}
                  </span>
                  {i < 7 && <span className="text-slate-300">→</span>}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-xl hover:shadow-[#1565D8]/20 cursor-pointer text-base"
              >
                Build Your Profile — Free
                <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 px-6 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-2xl transition-all cursor-pointer text-base hover:bg-slate-50 group">
                <Play size={16} className="text-[#1565D8] group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&auto=format',
                  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&auto=format',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&auto=format',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#F4B400]" fill="#F4B400" />)}
                  <span className="text-sm font-bold text-slate-700 ml-1">4.9</span>
                </div>
                <div className="text-xs text-slate-500">Trusted by 4.2M+ professionals</div>
              </div>
            </div>
          </div>

          {/* Hero visual — trust card mockup */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main profile card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&auto=format"
                    alt="Amara Diallo"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#1565D8]/20"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Amara Diallo</span>
                      <span className="inline-flex items-center gap-1 bg-[#1565D8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <CheckCircle size={9} fill="white" /> Verified
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">UX Research Lead · Figma</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Globe size={10} /> San Francisco, CA
                    </div>
                  </div>
                  {/* Trust score ring */}
                  <div className="ml-auto flex flex-col items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="24" cy="24" r="19" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                      <circle cx="24" cy="24" r="19" fill="none" stroke="#1565D8" strokeWidth="4"
                        strokeLinecap="round" strokeDasharray="119.4" strokeDashoffset={`${119.4 * (1 - 0.92)}`} />
                      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                        style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fill: '#1565D8', fontSize: 13, fontWeight: 700 }}>92</text>
                    </svg>
                    <span className="text-[9px] text-slate-400 font-semibold -mt-0.5">Trust</span>
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: 'MSc HCI · Stanford University', pts: 25 },
                    { label: 'UX Research Lead · Figma', pts: 30 },
                    { label: 'Nielsen Norman Certification', pts: 15 },
                  ].map(({ label, pts }) => (
                    <div key={label} className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl">
                      <CheckCircle size={13} className="text-[#1565D8] shrink-0" fill="#EEF4FF" />
                      <span className="text-xs text-slate-700 flex-1 leading-tight">{label}</span>
                      <span className="text-[10px] font-bold text-green-600">+{pts}pts</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['User Research', 'Design Systems', 'Figma', 'Prototyping'].map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[#EEF4FF] text-[#1565D8] text-[10px] font-semibold rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Floating recruiter notification */}
              <div className="absolute -right-6 top-12 bg-white border border-slate-100 rounded-2xl shadow-lg p-3 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-lg bg-[#EEF4FF] flex items-center justify-center">
                    <TrendingUp size={11} className="text-[#1565D8]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Recruiter Alert</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">Stripe viewed your profile. 94% match for Principal Designer.</p>
                <button className="mt-2 text-[10px] font-bold text-[#1565D8] cursor-pointer flex items-center gap-0.5">
                  View <ChevronRight size={9} />
                </button>
              </div>

              {/* Floating verification badge */}
              <div className="absolute -left-6 bottom-16 bg-[#0A2E8A] text-white rounded-2xl shadow-lg p-3">
                <div className="flex items-center gap-2">
                  <Lock size={13} className="text-blue-300" />
                  <div>
                    <div className="text-[10px] font-bold">Blockchain Verified</div>
                    <div className="text-[9px] text-blue-300">Tamper-proof credential</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-[#F8FAFF] py-8">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-[#111111]" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey section */}
      <section className="py-20 lg:py-28 max-w-6xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF8E1] rounded-full mb-4">
            <Zap size={12} className="text-[#F4B400]" />
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wide">The PROFILE Journey</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            From learning to prosperity —<br />every step verified.
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
            PROFILE is the only platform designed to carry your professional story from first credential to global opportunity — all verified, all trusted.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {journey.map(({ step, desc, icon: Icon, color }, i) => (
            <button
              key={step}
              onClick={() => setActiveJourneyStep(i)}
              className={`flex items-start gap-4 p-5 rounded-2xl text-left cursor-pointer transition-all border ${
                activeJourneyStep === i
                  ? 'border-[#1565D8]/30 bg-[#EEF4FF] shadow-sm'
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Step {i + 1}</span>
                  {i < 7 && <ArrowRight size={10} className="text-slate-300" />}
                </div>
                <div className="font-bold text-slate-800 mt-0.5" style={{ fontFamily: 'Plus Jakarta Sans' }}>{step}</div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#111111] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Everything you need to own<br />your professional future.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6 card-hover">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 className="font-bold text-slate-800 text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>{title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{desc}</p>
                <button className="mt-4 flex items-center gap-1 text-xs font-bold text-[#1565D8] cursor-pointer hover:gap-2 transition-all">
                  Learn more <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 max-w-6xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Built for the entire<br />professional ecosystem.
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">Whether you're a student starting out or a government licensing body — PROFILE works for you.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center card-hover cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mx-auto mb-3">
                <Icon size={22} className="text-[#1565D8]" />
              </div>
              <div className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>{label}</div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Institution logos */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by world-class institutions</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {institutions.map(({ name, logo }) => (
              <div key={name} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="w-6 h-6 rounded bg-slate-100 overflow-hidden">
                  <img src={logo} alt={name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-slate-700">{name}</span>
                <CheckCircle size={12} className="text-[#1565D8]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-6xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#111111] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Professionals who trust PROFILE.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, avatar, quote, trust }) => (
            <div key={name} className="bg-white rounded-2xl border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-[#F4B400]" fill="#F4B400" />)}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-5 italic">"{quote}"</p>
              <div className="flex items-center gap-3">
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">{name}</div>
                  <div className="text-xs text-slate-500">{role}</div>
                </div>
                <div className="ml-auto flex flex-col items-center">
                  <span className="text-lg font-black text-[#1565D8]" style={{ fontFamily: 'Plus Jakarta Sans' }}>{trust}</span>
                  <span className="text-[9px] text-slate-400">Trust</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0A2E8A] via-[#1565D8] to-[#1E88E5] rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <BackgroundPattern />
          </div>
          <div className="relative">
            <div className="flex justify-center mb-5">
              <ProfileIcon size={52} theme="light" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Your professional future<br />starts here.
            </h2>
            <p className="mt-4 text-blue-200 max-w-lg mx-auto leading-relaxed">
              Join 4.2 million professionals who have built verified identities that open doors worldwide. Free to start.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-7 py-3.5 bg-[#F4B400] hover:bg-[#E6A000] text-[#111111] font-black rounded-2xl transition-all cursor-pointer text-base shadow-lg"
              >
                Create Free Account
                <ArrowRight size={18} />
              </button>
              <button
                onClick={onSignIn}
                className="px-7 py-3.5 border border-white/30 hover:bg-white/10 text-white font-bold rounded-2xl transition-all cursor-pointer text-base"
              >
                Sign In
              </button>
            </div>
            <p className="mt-4 text-blue-300 text-xs">No credit card required · Free forever plan available</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <ProfileIcon size={28} />
                <ProfileWordmark size={16} theme="dark" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">The global professional identity platform. Build trust. Earn opportunity.</p>
            </div>
            {[
              { title: 'Platform', links: ['Home', 'Discover', 'Opportunity Hub', 'Marketplace', 'Trust Center'] },
              { title: 'For Professionals', links: ['CV Builder', 'Portfolio', 'Verification', 'Analytics', 'Learning'] },
              { title: 'For Institutions', links: ['Universities', 'Companies', 'Governments', 'Recruiters', 'NGOs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Privacy', 'Terms'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">{title}</div>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}>
                      <button className="text-sm text-slate-600 hover:text-[#1565D8] cursor-pointer transition-colors">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400">© 2025 PROFILE OS Ltd. All rights reserved.</div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Privacy</span><span>Terms</span><span>Security</span><span>WCAG AA Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
