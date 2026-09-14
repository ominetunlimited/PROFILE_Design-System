export function ProfileIcon({ size = 32, theme = 'color' }: { size?: number; theme?: 'light' | 'dark' | 'color' }) {
  const bg = theme === 'dark' ? '#0A2E8A' : theme === 'light' ? '#fff' : '#1565D8'
  const fg = theme === 'light' ? '#1565D8' : '#fff'

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PROFILE logo">
      <rect width="40" height="40" rx="10" fill={bg} />
      {/* Hexagon-inspired P shape */}
      <path d="M12 10h10c4.418 0 8 3.134 8 7s-3.582 7-8 7h-6v6H12V10z" fill={fg} />
      <path d="M16 14v9h6c2.209 0 4-1.567 4-3.5S24.209 16 22 16h-6z" fill={bg === '#fff' ? '#EEF4FF' : bg} />
      {/* Gold accent dot */}
      <circle cx="28" cy="30" r="4" fill="#F4B400" />
    </svg>
  )
}

export function ProfileWordmark({ size = 28, theme = 'dark' }: { size?: number; theme?: 'light' | 'dark' | 'white' }) {
  const color = theme === 'white' ? '#FFFFFF' : theme === 'light' ? '#0A2E8A' : '#111111'
  return (
    <span
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 900,
        fontSize: size,
        letterSpacing: '-0.03em',
        color,
        lineHeight: 1,
      }}
    >
      PROFILE
    </span>
  )
}

export function ProfileLogoFull({
  iconSize = 36,
  wordmarkSize = 22,
  theme = 'dark',
  gap = 10,
}: {
  iconSize?: number
  wordmarkSize?: number
  theme?: 'light' | 'dark' | 'white'
  gap?: number
}) {
  const iconTheme = theme === 'white' ? 'color' : theme === 'dark' ? 'color' : 'color'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      <ProfileIcon size={iconSize} theme={iconTheme} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <ProfileWordmark size={wordmarkSize} theme={theme} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: theme === 'white' ? 'rgba(255,255,255,0.6)' : '#94A3B8',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          Professional Identity
        </span>
      </div>
    </div>
  )
}

export default ProfileLogoFull
