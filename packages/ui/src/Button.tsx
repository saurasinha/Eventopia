import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  return (
    <button
      {...props}
      style={{
        padding: '10px 20px',
        background: '#0070f3',
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        ...(style || {}),
      }}
    >
      {children}
    </button>
  );
};


