type LogoTheme = 'light' | 'dark' | 'white'

const assets = {
  symbol: '/brand/profile-symbol-transparent.svg',
  horizontalLight: '/brand/profile-logo-horizontal-light-transparent.svg',
  horizontalDark: '/brand/profile-logo-horizontal-dark-transparent.svg',
  primaryLight: '/brand/profile-logo-primary-light-transparent.svg',
  primaryDark: '/brand/profile-logo-primary-dark-transparent.svg',
} as const

interface LogoImageProps {
  className?: string
  priority?: boolean
}

export function ProfileIcon({
  size = 32,
  className = '',
  priority = false,
}: LogoImageProps & { size?: number; theme?: 'light' | 'dark' | 'color' }) {
  return (
    <img
      src={assets.symbol}
      alt="PROFILE"
      width={size}
      height={size}
      loading={priority ? 'eager' : 'lazy'}
      className={`shrink-0 object-contain ${className}`}
    />
  )
}

export function ProfileLogoFull({
  height = 42,
  theme = 'dark',
  className = '',
  priority = false,
}: LogoImageProps & {
  height?: number
  theme?: LogoTheme
}) {
  const src = theme === 'white' ? assets.horizontalDark : assets.horizontalLight

  return (
    <img
      src={src}
      alt="PROFILE — Professional Identity"
      width={Math.round(height * 2.8)}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      className={`block h-auto object-contain ${className}`}
    />
  )
}

export function ProfilePrimaryLogo({
  size = 240,
  theme = 'dark',
  className = '',
  priority = false,
}: LogoImageProps & {
  size?: number
  theme?: LogoTheme
}) {
  const src = theme === 'white' ? assets.primaryDark : assets.primaryLight

  return (
    <img
      src={src}
      alt="PROFILE — Professional Identity"
      width={size}
      height={size}
      loading={priority ? 'eager' : 'lazy'}
      className={`block object-contain ${className}`}
    />
  )
}

export default ProfileLogoFull
