import { type ReactNode } from 'react'

interface Props {
  title: string
  description: string
  icon: ReactNode
  comingSoon?: boolean
}

export default function PlaceholderPage({ title, description, icon, comingSoon }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="font-bold text-slate-700 text-xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>{title}</h3>
        {comingSoon && (
          <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
            This module is actively being built. It will be available in the next release.
          </p>
        )}
        <div className="mt-6 flex gap-3 justify-center">
          <div className="px-4 py-2 bg-[#EEF4FF] text-[#1565D8] text-sm font-semibold rounded-xl">Coming Soon</div>
        </div>
      </div>
    </div>
  )
}
