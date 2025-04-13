import cn from 'classnames';
import * as React from 'react';

import styles from './Input.module.scss';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // className={`${styles.input} ${className}`}
        className={cn(styles.input, className, 'form-control')}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
