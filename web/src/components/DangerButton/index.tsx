import React, { ButtonHTMLAttributes } from "react";

import "./styles.css";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function DangerButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button className="danger-button" {...props}>
      {children}
    </button>
  );
}
