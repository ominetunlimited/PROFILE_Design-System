interface TrustScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function TrustScore({ score, size = 'md', showLabel = true }: TrustScoreProps) {
  const radius = size === 'sm' ? 22 : size === 'md' ? 30 : 40
  const stroke = size === 'sm' ? 4 : size === 'md' ? 5 : 6
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const dim = (radius + stroke) * 2
  const fontSize = size === 'sm' ? 13 : size === 'md' ? 18 : 26

  const color = score >= 80 ? '#1565D8' : score >= 60 ? '#F4B400' : '#DC2626'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={stroke} />
        <circle
          cx={dim / 2} cy={dim / 2} r={radius} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fill: color, fontSize, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, letterSpacing: -0.5 }}
        >
          {score}
        </text>
      </svg>
      {showLabel && <span className="text-xs text-slate-500 font-medium">Trust Score</span>}
    </div>
  )
}
