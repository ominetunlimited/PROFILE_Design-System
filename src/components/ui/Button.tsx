import type { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconRight?: ReactNode
  loading?: boolean
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-profile-blue hover:bg-profile-deep text-white shadow-sm hover:shadow-[0_10px_24px_rgba(21,101,216,0.22)]',
  secondary: 'bg-[#EEF4FF] hover:bg-[#DBEAFE] text-[#1565D8]',
  ghost: 'hover:bg-slate-100 text-slate-700',
  outline: 'border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700',
  gold: 'bg-[#F4B400] hover:bg-[#E6A000] text-white shadow-sm',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-lg',
  md: 'px-4 py-2 text-sm gap-2 rounded-xl',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-xl',
}

export default function Button({
  children, variant = 'primary', size = 'md', icon, iconRight, loading, fullWidth, className = '', ...props
}: ButtonProps) {
  return (
    <button
      className={`relative overflow-hidden inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none
        ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      aria-busy={loading || undefined}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="size-3.5 rounded-full border-2 border-current border-r-transparent animate-spin" aria-hidden="true" />
      ) : icon}
      {children}
      {iconRight}
    </button>
  )
}
