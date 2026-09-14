import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react'

type ToastVariant = 'success' | 'warning' | 'error' | 'info'

interface ToastItem {
  id: string
  variant: ToastVariant
  title: string
  message?: string
}

interface ToastContextValue {
  toast: (variant: ToastVariant, title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

const icons: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
}

const styles: Record<ToastVariant, { border: string; icon: string; bg: string }> = {
  success: { border: 'border-[#00C853]/30', icon: 'text-[#00C853]', bg: 'bg-white' },
  warning: { border: 'border-[#F59E0B]/30', icon: 'text-[#F59E0B]', bg: 'bg-white' },
  error:   { border: 'border-[#DC2626]/30', icon: 'text-[#DC2626]', bg: 'bg-white' },
  info:    { border: 'border-[#0057D9]/30', icon: 'text-[#0057D9]', bg: 'bg-white' },
}

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), 4000)
    return () => clearTimeout(t)
  }, [item.id, onDismiss])

  const s = styles[item.variant]
  const Icon = icons[item.variant]

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-xl ${s.bg} ${s.border} animate-[fade-up_0.2s_ease_forwards] min-w-[280px] max-w-[360px]`}>
      <Icon size={16} className={`${s.icon} shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-800">{item.title}</div>
        {item.message && <div className="text-xs text-slate-500 mt-0.5 leading-snug">{item.message}</div>}
      </div>
      <button
        onClick={() => onDismiss(item.id)}
        className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0 -mt-0.5 -mr-1 p-1"
      >
        <X size={13} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  const toast = useCallback((variant: ToastVariant, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, variant, title, message }])
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map(item => (
          <div key={item.id} className="pointer-events-auto">
            <ToastItem item={item} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
