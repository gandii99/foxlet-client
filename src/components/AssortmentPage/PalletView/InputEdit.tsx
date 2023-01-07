import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import assortmentAPI from '../../../services/assortment';

const InputEdit = (props: {
  id_pallet: number;
  editActive: boolean;
  id: string;
  title: string;
  value: string | number;
  type: string;
  onChangeHandler: (
    id: string,
    value: string | number
    // e: React.FormEvent<HTMLFormElement>
  ) => void;
}) => {
  console.log('inputValue', props.editActive);
  return (
    <div className="d-flex justify-content-between align-items-center">
      <label htmlFor="d-flex name col-8">{props.title}: </label>

      {props.editActive ? (
        <div className="d-flex mx-3">
          <input
            type={props.type}
            id={props.id}
            className="form-control font-xs px-2 py-1"
            placeholder="Nazwa"
            value={props.value}
            onChange={e =>
              props.onChangeHandler(
                props.id,
                props.type === 'number'
                  ? parseFloat(e.currentTarget.value)
                  : e.currentTarget.value
              )
            }
          />
        </div>
      ) : (
        // </form>
        <div className="d-flex justify-content-between align-items-center ">
          <div className="d-flex mx-3">
            <span className="fw-bold d-flex justify-content-between align-items-center">
              {props.type === 'datetime-local'
                ? typeof props.value === 'string' &&
                  dayjs(new Date(props.value)).format('YYYY-MM-DD HH:mm:ss')
                : props.value}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputEdit;
