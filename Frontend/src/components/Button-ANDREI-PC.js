// import React from 'react';
// import './Button.css';
// import { Link } from 'react-router-dom';

// export function Button() {
//   return (
//     <Link to='sign-up'>
//       <button className='btn'>Sign Up</button>
//     </Link>
//   );
// }

import React from "react";
import "./Button.scss";
import { Link } from "react-router-dom";

const STYLES = [
  "btn--primary",
  "btn--outline",
  "btn--test",
  "btn--gray",
  "btn--green",
];

const SIZES = ["btn--medium", "btn--large", "btn--large--dark--green"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  linkTo,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <div>
      {linkTo ? (
        <Link to={linkTo} className="btn-mobile">
          <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={(e) => onClick(e)}
          type={type}
        >
          {children}
        </button>
      )}
    </div>
  );
};
