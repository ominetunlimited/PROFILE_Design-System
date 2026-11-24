import { CheckCircle, Shield, Award, Star } from './icons'

type VerificationLevel = 'verified' | 'trusted' | 'premium' | 'institution'

interface VerificationBadgeProps {
  level?: VerificationLevel
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const configs: Record<VerificationLevel, { icon: typeof CheckCircle; color: string; bg: string; label: string }> = {
  verified: { icon: CheckCircle, color: '#1565D8', bg: '#EEF4FF', label: 'Verified' },
  trusted: { icon: Shield, color: '#16A34A', bg: '#DCFCE7', label: 'Trusted' },
  premium: { icon: Award, color: '#B8860B', bg: '#FFF8E1', label: 'Premium' },
  institution: { icon: Star, color: '#7C3AED', bg: '#EDE9FE', label: 'Institution' },
}

const sizes = { sm: 14, md: 18, lg: 22 }

export default function VerificationBadge({ level = 'verified', size = 'md', showLabel }: VerificationBadgeProps) {
  const cfg = configs[level]
  const Icon = cfg.icon
  const px = sizes[size]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full font-semibold"
      style={{
        backgroundColor: cfg.bg,
        color: cfg.color,
        padding: showLabel ? '3px 8px 3px 4px' : '3px',
        fontSize: size === 'sm' ? 11 : size === 'md' ? 12 : 13,
      }}
    >
      <Icon size={px} color={cfg.color} fill={cfg.color} fillOpacity={0.2} />
      {showLabel && cfg.label}
    </span>
  )
}
