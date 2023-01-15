import React, { useState } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  classLabel?: string;
  classInput?: string;
  classError?: string;
  register?: any;
  errors?: any;
  name?: string;
}

const InputText: React.FC<Props> = ({
  label = '',
  placeholder = '',
  classLabel = '',
  classInput = '',
  register = {},
  errors = {},
  name = '',
}) => {
  return (
    <label className={classLabel}>
      {label}
      <input
        {...register}
        type="text"
        className={classInput}
        placeholder={placeholder}
      />
      {errors[name] && (
        <span className="font-13 text-danger">{errors[name].message}</span>
      )}
    </label>
  );
};

export default InputText;
