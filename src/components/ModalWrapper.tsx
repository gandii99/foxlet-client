import React, { ReactNode } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalWrapperProps {
  children: ReactNode;
  title: string;
  handleCloseModal: () => void;
}
const ModalWrapper = ({
  children,
  title,
  handleCloseModal,
}: ModalWrapperProps) => {
  return (
    <>
      <div
        className={
          'position-fixed top-0 start-0 bottom-0 end-0 z-index bg-dark opacity-50'
        }
        onClick={handleCloseModal}
      />
      <div
        className={
          'bg-white rounded-3 position-fixed top-50 start-50 translate-middle z-index col-xl-9 '
        }
      >
        <div
          className={
            'px-5 py-3 d-flex justify-content-between align-items-center'
          }
        >
          <h2 className={''}>{title}</h2>
          <button onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faClose} className="account-icon w-100" />
          </button>
        </div>
        <hr />
        <div className={'d-flex p-5'}>{children}</div>
      </div>
    </>
  );
};

export default ModalWrapper;
