import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = 'btn'
    const variantClasses = {
      'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
      'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
      'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50': variant === 'outline',
      'text-gray-700 hover:bg-gray-100': variant === 'ghost',
    }
    const sizeClasses = {
      'h-8 px-3 text-xs': size === 'sm',
      'h-10 px-4 py-2': size === 'md',
      'h-12 px-6 text-lg': size === 'lg',
    }
    
    const classes = [
      baseClasses,
      Object.entries(variantClasses).find(([_, condition]) => condition)?.[0] || '',
      Object.entries(sizeClasses).find(([_, condition]) => condition)?.[0] || '',
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
