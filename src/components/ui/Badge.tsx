import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'blue' | 'gold' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'verified' | 'premium'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  icon?: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  blue: 'bg-[#EEF4FF] text-[#1565D8]',
  gold: 'bg-[#FFF8E1] text-[#B8860B]',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  error: 'bg-red-50 text-red-700',
  info: 'bg-cyan-50 text-cyan-700',
  outline: 'border border-slate-200 text-slate-600',
  verified: 'bg-[#1565D8] text-white',
  premium: 'bg-gradient-to-r from-[#F4B400] to-[#E6A000] text-white',
}

export default function Badge({ children, variant = 'default', size = 'sm', icon }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wide ${sizeClass} ${variants[variant]}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
