import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  children: ReactNode;
  text: string;
  to: string;
  classLink: string;
  classSpan: string;
}

const ButtonNavigate: React.FC<ButtonProps> = ({
  children,
  text,
  to,
  classLink,
  classSpan,
}) => {
  return (
    <Link
      to={to}
      className={`d-flex justify-content-center align-items-center button-orange-second px-4 px-3 py-2 rounded-2 mx-1 fw-bold ${classLink}`}
    >
      {children}
      <span className={`${classSpan}`}>&nbsp;{text}</span>
    </Link>
  );
};

export default ButtonNavigate;
