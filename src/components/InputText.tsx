import React, { useState } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  classLabel?: string;
  classInput?: string;
  classError?: string;
  register?: any;
  errors?: any;
  type?: string;
  name?: string;
  disabled?: boolean;
}

const InputText: React.FC<Props> = ({
  label = '',
  placeholder = '',
  classLabel = '',
  classInput = '',
  register = {},
  errors = {},
  type = '',
  name = '',
  disabled = false,
}) => {
  return (
    <label className={classLabel}>
      {label}
      <input
        {...register}
        type={type || 'text'}
        className={classInput}
        placeholder={placeholder}
        disabled={disabled}
      />
      {errors[name] && (
        <span className="font-13 text-danger">{errors[name].message}</span>
      )}
    </label>
  );
};

export default InputText;
