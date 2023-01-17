import React, { useState } from 'react';

interface Props {
  label?: string;
  placeholder?: number;
  classLabel?: string;
  classInput?: string;
  classError?: string;
  register?: any;
  errors?: any;
  name?: string;
  disabled?: boolean;
}

const InputNumber: React.FC<Props> = ({
  label = '',
  placeholder = '',
  classLabel = '',
  classInput = '',
  register = {},
  errors = {},
  name = '',
  disabled = false,
}) => {
  return (
    <label className={classLabel}>
      {label}
      <input
        {...register}
        type="number"
        step="0.01"
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

export default InputNumber;
