import type { IconComponent } from './icons'

type GlyphTone = 'brand' | 'trust' | 'growth' | 'opportunity' | 'neutral'
type GlyphSize = 'sm' | 'md' | 'lg'

interface ProfileGlyphProps {
  icon: IconComponent
  tone?: GlyphTone
  size?: GlyphSize
  active?: boolean
  className?: string
}

const tones: Record<GlyphTone, string> = {
  brand: 'bg-profile-blue-light text-profile-blue ring-profile-blue/10',
  trust: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  growth: 'bg-violet-50 text-violet-700 ring-violet-600/10',
  opportunity: 'bg-profile-gold-light text-amber-700 ring-profile-gold/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-400/10',
}

const sizes: Record<GlyphSize, { shell: string; icon: number }> = {
  sm: { shell: 'size-7 rounded-lg', icon: 14 },
  md: { shell: 'size-9 rounded-xl', icon: 17 },
  lg: { shell: 'size-11 rounded-[14px]', icon: 20 },
}

export default function ProfileGlyph({
  icon: Icon,
  tone = 'brand',
  size = 'md',
  active = false,
  className = '',
}: ProfileGlyphProps) {
  const dimensions = sizes[size]

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ring-1 transition-all duration-200 ${
        active ? 'bg-white/16 text-white ring-white/20 shadow-inner' : tones[tone]
      } ${dimensions.shell} ${className}`}
      aria-hidden="true"
    >
      <Icon size={dimensions.icon} strokeWidth={active ? 2.25 : 1.9} />
      <span
        className={`absolute right-1 top-1 size-1 rounded-full ${
          active ? 'bg-profile-gold' : 'bg-current opacity-30'
        }`}
      />
    </span>
  )
}
