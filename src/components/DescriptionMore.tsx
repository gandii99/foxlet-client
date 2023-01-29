import React, { useState } from 'react';

interface Props {
  text: string;
  classSpan?: string;
  name?: string;
}

const DescriptionMore: React.FC<Props> = ({
  text = '',
  classSpan = '',
  name = '',
}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (!text) {
    return <></>;
  }

  return (
    <span className={classSpan}>
      {text.length > 80 && (
        <>
          {isReadMore ? text.slice(0, 80) : text}
          <span
            onClick={toggleReadMore}
            className="font-16 border rounded-3 px-1 mx-1"
            role="button"
          >
            {isReadMore ? 'Więcej' : 'Ukryj'}
          </span>
        </>
      )}
    </span>
  );
};

export default DescriptionMore;
