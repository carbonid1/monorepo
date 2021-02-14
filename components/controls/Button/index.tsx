import React from 'react';

type ButtonT = JSX.IntrinsicElements['button'];

export const Button: React.FC<ButtonT> = props => {
  return (
    <button {...props} className="bg-green-700 p-3 text-white hover:opacity-90 rounded-md">
      {props.children}
    </button>
  );
};
