import { useState } from 'react'
import {
  Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle, Mail,
  Smartphone, Key, Lock, User,
  GraduationCap, Building2, Globe, Shield, Sparkles
} from '../components/ui/icons'
import { ProfileLogoFull } from '../components/ui/ProfileLogo'

type AuthView = 'signin' | 'signup' | 'forgot' | 'mfa' | 'verify-email' | 'welcome' | 'account-type'
type AccountType = 'individual' | 'organization' | 'institution' | null

interface AuthProps {
  initialView?: AuthView
  onComplete: () => void
  onBack: () => void
}

const accountTypes = [
  {
    id: 'individual' as const,
    icon: User,
    label: 'Individual',
    desc: 'Students, professionals, job seekers, freelancers, and skilled trades',
    color: '#1565D8', bg: '#EEF4FF',
  },
  {
    id: 'organization' as const,
    icon: Building2,
    label: 'Organization',
    desc: 'Companies, NGOs, startups, and enterprises',
    color: '#7C3AED', bg: '#EDE9FE',
  },
  {
    id: 'institution' as const,
    icon: GraduationCap,
    label: 'Institution',
    desc: 'Universities, governments, licensing bodies, and accreditation organisations',
    color: '#16A34A', bg: '#DCFCE7',
  },
]

function AuthShell({ children, showBack, onBack }: { children: React.ReactNode; showBack?: boolean; onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-[#F8FAFF] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[440px] shrink-0 bg-gradient-to-br from-[#0A2E8A] to-[#1565D8] p-10 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 20 }).map((_, i) => (
              <circle key={i} cx={`${(i % 5) * 25 + 10}%`} cy={`${Math.floor(i / 5) * 25 + 10}%`}
                r="60" fill="none" stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative z-10">
          <ProfileLogoFull height={52} theme="white" priority className="w-[174px] mb-12" />

          <div className="mb-auto">
            <h2 className="text-2xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Your verified professional identity — trusted worldwide.
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              Build a living professional record backed by verified credentials, institutional trust, and a global opportunity network.
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {[
              { icon: Shield, text: 'Blockchain-anchored trust record' },
              { icon: CheckCircle, text: 'Institution-verified credentials' },
              { icon: Globe, text: 'Global opportunity matching' },
              { icon: Lock, text: 'Enterprise-grade security' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-blue-200" />
                </div>
                <span className="text-blue-100 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white lg:bg-transparent">
          <ProfileLogoFull height={38} theme="dark" priority className="w-[128px] lg:hidden" />
          {showBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 cursor-pointer font-medium">
              <ArrowLeft size={14} /> Back
            </button>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-[400px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function SignIn({ onView, onComplete }: { onView: (v: AuthView) => void; onComplete: () => void }) {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); onComplete() }, 1200)
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-800 mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>Welcome back</h1>
      <p className="text-slate-500 text-sm mb-7">Sign in to your PROFILE account.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email or Username</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="james@example.com"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 transition-all bg-white"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Password</label>
            <button type="button" onClick={() => onView('forgot')} className="text-xs text-[#1565D8] font-semibold cursor-pointer hover:underline">Forgot?</button>
          </div>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 transition-all bg-white"
              required
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl transition-all cursor-pointer disabled:opacity-60 shadow-sm hover:shadow-md"
        >
          {loading ? (
            <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in...</>
          ) : (<>Sign In <ArrowRight size={15} /></>)}
        </button>
      </form>

      {/* Passkey option */}
      <div className="my-5 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-xs text-slate-400 font-medium">or</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <div className="space-y-2.5">
        <button className="w-full flex items-center gap-3 py-2.5 px-4 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold text-slate-700 cursor-pointer transition-all hover:bg-slate-50 group">
          <Key size={16} className="text-[#1565D8]" />
          Sign in with Passkey
          <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">Faster</span>
        </button>
        <button className="w-full flex items-center gap-3 py-2.5 px-4 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold text-slate-700 cursor-pointer transition-all hover:bg-slate-50">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button onClick={() => onView('account-type')} className="text-[#1565D8] font-bold cursor-pointer hover:underline">Create one free</button>
      </p>
    </div>
  )
}

function AccountTypeSelect({ onSelect }: { onSelect: (type: AccountType) => void }) {
  return (
    <div>
      <h1 className="text-2xl font-black text-slate-800 mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>Join PROFILE</h1>
      <p className="text-slate-500 text-sm mb-7">Choose the account type that fits you best. You can add organisation access later.</p>
      <div className="space-y-3">
        {accountTypes.map(({ id, icon: Icon, label, desc, color, bg }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="w-full flex items-start gap-4 p-4 border border-slate-200 hover:border-[#1565D8] hover:bg-[#EEF4FF]/30 rounded-2xl cursor-pointer transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-[#1565D8] transition-colors">{label}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
            </div>
            <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-[#1565D8] transition-colors shrink-0 mt-1.5" />
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs text-slate-400 text-center leading-relaxed">
        By continuing you agree to PROFILE's <span className="text-[#1565D8] cursor-pointer">Terms of Service</span> and <span className="text-[#1565D8] cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  )
}

function SignUp({ accountType, onView }: { accountType: AccountType; onView: (v: AuthView) => void; onComplete: () => void }) {
  const [showPass, setShowPass] = useState(false)
  const [step, setStep] = useState(1)

  const typeConfig = accountTypes.find(a => a.id === accountType)

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) setStep(2)
    else onView('verify-email')
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-[#1565D8]' : 'bg-slate-100'}`} />
        ))}
      </div>

      {typeConfig && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: typeConfig.bg }}>
            <typeConfig.icon size={13} color={typeConfig.color} />
          </div>
          <span className="text-xs font-semibold text-slate-600">{typeConfig.label} Account</span>
        </div>
      )}

      <h1 className="text-2xl font-black text-slate-800 mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>
        {step === 1 ? 'Create your account' : 'Secure your account'}
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        {step === 1 ? 'Your verified professional identity starts here.' : 'Set a strong password and enable two-factor authentication.'}
      </p>

      <form onSubmit={nextStep} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">First Name</label>
                <input type="text" placeholder="James" className="w-full px-3.5 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Last Name</label>
                <input type="text" placeholder="Okafor" className="w-full px-3.5 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" placeholder="james@example.com" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white" required />
              </div>
            </div>
            {accountType !== 'individual' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  {accountType === 'organization' ? 'Organisation Name' : 'Institution Name'}
                </label>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder={accountType === 'organization' ? 'Acme Corporation' : 'University of Lagos'} className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white" required />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Country</label>
              <div className="relative">
                <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white appearance-none text-slate-700">
                  <option>Select country...</option>
                  <option>Nigeria</option><option>Ghana</option><option>United Kingdom</option>
                  <option>United States</option><option>Kenya</option><option>South Africa</option>
                  <option>Canada</option><option>Australia</option><option>Germany</option><option>India</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 12 characters"
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white"
                  required minLength={12}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Password strength */}
              <div className="flex gap-1 mt-2">
                {['', '', '', ''].map((_, i) => (
                  <div key={i} className={`flex-1 h-1 rounded-full ${i < 2 ? 'bg-amber-400' : 'bg-slate-100'}`} />
                ))}
                <span className="text-[10px] text-amber-500 font-semibold ml-1">Fair</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" placeholder="Re-enter password" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/15 bg-white" required />
              </div>
            </div>
            <div className="p-4 bg-[#EEF4FF] rounded-xl border border-[#1565D8]/20">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone size={15} className="text-[#1565D8]" />
                <span className="text-xs font-bold text-[#1565D8]">Enable Two-Factor Authentication</span>
                <span className="ml-auto text-[10px] bg-[#1565D8] text-white px-1.5 py-0.5 rounded-full font-bold">Recommended</span>
              </div>
              <p className="text-xs text-blue-700 leading-relaxed">Secure your account with an authenticator app or SMS code on every sign in.</p>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          {step === 1 ? 'Continue' : 'Create Account'}
          <ArrowRight size={15} />
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button onClick={() => onView('signin')} className="text-[#1565D8] font-bold cursor-pointer hover:underline">Sign in</button>
      </p>
    </div>
  )
}

function MFAScreen({ onComplete }: { onComplete: () => void }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])

  const handleChange = (i: number, val: string) => {
    if (val.length > 1) return
    const next = [...code]; next[i] = val; setCode(next)
    if (val && i < 5) {
      const el = document.getElementById(`mfa-${i + 1}`)
      el?.focus()
    }
    if (next.every(c => c) && next.join('').length === 6) {
      setTimeout(onComplete, 400)
    }
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-[#EEF4FF] rounded-2xl flex items-center justify-center mx-auto mb-5">
        <Smartphone size={28} className="text-[#1565D8]" />
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Two-Factor Authentication</h1>
      <p className="text-slate-500 text-sm mb-8">Enter the 6-digit code from your authenticator app or sent to +44 *** *** 7821.</p>

      <div className="flex gap-2 justify-center mb-6">
        {code.map((digit, i) => (
          <input
            key={i}
            id={`mfa-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            className={`w-12 h-14 text-center text-xl font-black border-2 rounded-xl focus:outline-none transition-all bg-white ${
              digit ? 'border-[#1565D8] text-[#1565D8]' : 'border-slate-200 text-slate-800 focus:border-[#1565D8]'
            }`}
          />
        ))}
      </div>

      <button onClick={onComplete} className="w-full py-3 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl cursor-pointer transition-all">
        Verify Code
      </button>
      <button className="mt-3 text-sm text-[#1565D8] font-semibold cursor-pointer hover:underline block w-full text-center">
        Resend code · 0:59
      </button>

      <div className="mt-5 pt-5 border-t border-slate-100">
        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 cursor-pointer mx-auto">
          <Key size={14} /> Use passkey instead
        </button>
      </div>
    </div>
  )
}

function VerifyEmail({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-[#EEF4FF] rounded-3xl flex items-center justify-center mx-auto mb-5">
        <Mail size={34} className="text-[#1565D8]" />
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Check your email</h1>
      <p className="text-slate-500 text-sm mb-2">We've sent a verification link to</p>
      <p className="font-bold text-slate-800 mb-6">james@example.com</p>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 text-left">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">What to expect</div>
        {[
          'Click the verification link in the email',
          'Your account will be activated instantly',
          'You will be redirected to complete your profile',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-2 mt-2">
            <div className="w-4 h-4 rounded-full bg-[#1565D8] text-white text-[9px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</div>
            <span className="text-xs text-slate-600">{step}</span>
          </div>
        ))}
      </div>

      <button onClick={onComplete} className="w-full py-3 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl cursor-pointer transition-all">
        I've verified my email
      </button>
      <button className="mt-3 text-sm text-slate-500 hover:text-slate-700 cursor-pointer block w-full">Resend email</button>
    </div>
  )
}

function Welcome({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to PROFILE, James!",
      desc: "Your verified professional identity journey starts now. Let's get you set up in just a few minutes.",
      action: "Let's Go",
    },
    {
      icon: User,
      title: 'Add your photo',
      desc: 'A professional photo builds trust and helps recruiters and collaborators recognise you.',
      action: 'Upload Photo',
      skip: true,
    },
    {
      icon: GraduationCap,
      title: 'Add your first credential',
      desc: 'Start with your highest qualification. We will help you get it verified by the issuing institution.',
      action: 'Add Credential',
      skip: true,
    },
    {
      icon: CheckCircle,
      title: "You're ready!",
      desc: 'Your profile is set up. Explore the platform and start building your trust record.',
      action: 'Enter PROFILE',
      final: true,
    },
  ]

  const cur = steps[step]
  const StepIcon = cur.icon

  return (
    <div className="text-center">
      {/* Progress dots */}
      <div className="flex gap-2 justify-center mb-8">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-[#1565D8]' : i < step ? 'w-3 bg-[#1565D8]/40' : 'w-3 bg-slate-100'}`} />
        ))}
      </div>

      <div className="mx-auto mb-5 size-16 rounded-2xl bg-profile-blue-light text-profile-blue flex items-center justify-center">
        <StepIcon size={30} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>{cur.title}</h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">{cur.desc}</p>

      {step === 1 && (
        <div className="mb-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 cursor-pointer hover:border-[#1565D8] hover:bg-[#EEF4FF]/30 transition-all group">
          <User size={32} className="text-slate-300 group-hover:text-[#1565D8] mx-auto mb-2 transition-colors" />
          <div className="text-sm text-slate-400 group-hover:text-[#1565D8]">Click to upload or drag a photo</div>
          <div className="text-xs text-slate-400 mt-1">JPG, PNG or WEBP · Max 10MB</div>
        </div>
      )}

      <button
        onClick={() => cur.final ? onComplete() : setStep(s => s + 1)}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl cursor-pointer transition-all shadow-sm"
      >
        {cur.action}
        {!cur.final && <ArrowRight size={15} />}
      </button>

      {cur.skip && (
        <button onClick={() => setStep(s => s + 1)} className="mt-3 text-sm text-slate-400 hover:text-slate-600 cursor-pointer">
          Skip for now
        </button>
      )}
    </div>
  )
}

function ForgotPassword({ onView }: { onView: (v: AuthView) => void }) {
  const [sent, setSent] = useState(false)
  return (
    <div>
      <h1 className="text-2xl font-black text-slate-800 mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>Reset password</h1>
      <p className="text-slate-500 text-sm mb-7">{sent ? "We've sent reset instructions to your email." : "Enter your email and we'll send you a reset link."}</p>

      {!sent ? (
        <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" placeholder="james@example.com" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1565D8] bg-white" required />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-[#1565D8] hover:bg-[#1255C0] text-white font-bold rounded-xl cursor-pointer transition-all">
            Send Reset Link
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-[#16A34A]" />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Check your inbox. The link expires in 30 minutes.</p>
        </div>
      )}

      <button onClick={() => onView('signin')} className="mt-5 text-center text-sm text-[#1565D8] font-semibold cursor-pointer hover:underline block w-full">
        Back to Sign In
      </button>
    </div>
  )
}

export default function Auth({ initialView = 'signin', onComplete, onBack }: AuthProps) {
  const [view, setView] = useState<AuthView>(initialView)
  const [accountType, setAccountType] = useState<AccountType>(null)

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type)
    setView('signup')
  }

  const content = () => {
    switch (view) {
      case 'signin': return <SignIn onView={setView} onComplete={() => setView('mfa')} />
      case 'account-type': return <AccountTypeSelect onSelect={handleAccountTypeSelect} />
      case 'signup': return <SignUp accountType={accountType} onView={setView} onComplete={() => setView('verify-email')} />
      case 'forgot': return <ForgotPassword onView={setView} />
      case 'mfa': return <MFAScreen onComplete={() => setView('welcome')} />
      case 'verify-email': return <VerifyEmail onComplete={() => setView('mfa')} />
      case 'welcome': return <Welcome onComplete={onComplete} />
      default: return null
    }
  }

  const showBack = ['account-type', 'signup', 'forgot'].includes(view)
  const handleBack = () => {
    if (view === 'signup') setView('account-type')
    else if (view === 'account-type' || view === 'forgot') setView('signin')
    else onBack()
  }

  return (
    <AuthShell showBack={showBack || view === 'signin'} onBack={view === 'signin' ? onBack : handleBack}>
      {content()}
    </AuthShell>
  )
}
