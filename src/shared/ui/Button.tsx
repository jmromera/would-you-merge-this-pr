import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors ' +
  'disabled:pointer-events-none disabled:opacity-50 h-10 px-4 text-sm'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-solid text-white hover:bg-[#9a6bf0]',
  secondary: 'border border-line-strong bg-surface text-fg hover:bg-raised hover:border-faint',
  ghost: 'text-muted hover:bg-raised hover:text-fg',
}

const classes = (variant: Variant, className = '') => `${base} ${variants[variant]} ${className}`.trim()

interface VariantProps {
  variant?: Variant
}

export function Button({
  variant = 'secondary',
  className,
  type = 'button',
  ...props
}: VariantProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={classes(variant, className)} {...props} />
}

export function ButtonLink({
  variant = 'secondary',
  className,
  ...props
}: VariantProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={classes(variant, className)} {...props} />
}

/** Square, label-only-for-screen-readers button for the top bar. */
export function IconButton({
  label,
  className = '',
  children,
  ...props
}: { label: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-raised hover:text-fg ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
