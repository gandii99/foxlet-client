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

const InputDate: React.FC<Props> = ({
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
      <input {...register} type="datetime-local" className={classInput} />
      {errors[name] && (
        <span className="font-13 text-danger">{errors[name].message}</span>
      )}
    </label>
  );
};

export default InputDate;
