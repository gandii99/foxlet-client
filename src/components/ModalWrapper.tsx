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
          'position-fixed top-0 start-0 bottom-0 end-0 z-index bg-dark opacity-50 '
        }
        onClick={handleCloseModal}
      />
      <div
        className={
          'bg-white rounded-3 position-fixed top-50 start-50 translate-middle z-index col-11 col-md-10 col-lg-9 col-xl-7 modal-height'
        }
      >
        <div
          className={
            'px-5 pt-3 d-flex justify-content-between align-items-center '
          }
        >
          <h2 className={'p-0 m-0'}>{title}</h2>
          <button
            onClick={handleCloseModal}
            className="square-40 d-flex justify-content-center align-items-center button-orange-second text-dark border-dark"
          >
            <FontAwesomeIcon icon={faClose} className="account-icon w-100" />
          </button>
        </div>
        <hr />
        <div className={'d-flex py-4 py-sm-5 px-3 px-md-5 pt-0 '}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
