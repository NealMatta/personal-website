import React, { ReactNode } from 'react';

interface CardTitleProps {
  children: ReactNode;
}

export default function CardTitle({ children }: CardTitleProps) {
  return <h1 className="font-bold">{children}</h1>;
}
