import { HTMLAttributes, forwardRef } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseClasses = 'rounded-lg bg-white'
    const variantClasses = {
      'shadow-sm border border-gray-200': variant === 'default',
      'shadow-lg border border-gray-200': variant === 'elevated',
      'border-2 border-gray-200': variant === 'outlined',
    }
    
    const classes = [
      baseClasses,
      Object.entries(variantClasses).find(([_, condition]) => condition)?.[0] || '',
      className
    ].filter(Boolean).join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card }
