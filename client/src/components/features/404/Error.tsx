import React from 'react';
import './Error.css';

function Error(): JSX.Element {
  return (
    <div className='Error'>
      <h1>Error Page</h1>
      <img className='Error_img'
        src="https://www.rush-analytics.ru/wp-content/uploads/2022/01/vse-nachinaetsya-s-idei.-63.png"
        alt="error"
      />
    </div>
  );
}

export default Error;
