import React from 'react';
import { haptic } from './motion';

type Variant = 'primary' | 'success' | 'danger' | 'info' | 'ghost' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: '',
  success: 'k-btn--success',
  danger: 'k-btn--danger',
  info: 'k-btn--info',
  ghost: 'k-btn--ghost',
  quiet: 'k-btn--quiet',
};

const SIZE_CLASS: Record<Size, string> = { sm: 'k-press--sm', md: '', lg: 'k-press--lg' };

/**
 * The press physics live in CSS (.k-press) rather than JS so they
 * survive on the compositor thread and stay smooth under load.
 * This component only wires up the haptic pairing.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block,
  icon,
  children,
  onPointerDown,
  className = '',
  ...rest
}: Props) {
  const classes = [
    'k-btn',
    variant !== 'quiet' && 'k-press',
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    block && 'k-btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onPointerDown={(e) => {
        if (!rest.disabled) haptic('press');
        onPointerDown?.(e);
      }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
