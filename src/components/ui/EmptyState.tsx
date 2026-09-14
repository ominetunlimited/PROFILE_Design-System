import type { ReactNode } from 'react'
import Button from './Button'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: { label: string; onClick: () => void; icon?: ReactNode }
  secondaryAction?: { label: string; onClick: () => void }
  compact?: boolean
}

export default function EmptyState({ icon, title, description, action, secondaryAction, compact }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8 px-4' : 'py-16 px-6'}`}>
      <div className={`rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 ${compact ? 'w-12 h-12' : 'w-16 h-16'}`}>
        {icon}
      </div>
      <h3 className={`font-bold text-slate-700 ${compact ? 'text-sm' : 'text-base'}`} style={{ fontFamily: 'Plus Jakarta Sans' }}>
        {title}
      </h3>
      <p className={`text-slate-500 mt-1 max-w-xs leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className={`flex gap-2 ${compact ? 'mt-4' : 'mt-6'}`}>
          {action && (
            <Button size={compact ? 'sm' : 'md'} icon={action.icon} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" size={compact ? 'sm' : 'md'} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
