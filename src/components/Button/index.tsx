import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export interface ButtonProps {
  text: string;
  to: string;
}

const ButtonNavigate: React.FC<ButtonProps> = ({ text, to }) => {
  return (
    <Link to={to} className="button-header font-m">
      {text}
    </Link>
  );
};

export default ButtonNavigate;
