import React from 'react';
import './Button.css';

// Spinner component for the loading state
const Spinner = () => (
  <div className="spinner">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      style={{ width: '20px', height: '20px' }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray="31.415, 31.415"
      />
    </svg>
  </div>
);

const Buttons = ({ ...props }) => {
  return (
    <button
      disabled={props.disable}
      className={props.className}

      style={{
        height: props.height,
        width: props.width,
        backgroundColor: props.bgcolor,
        borderRadius: props.radius,
        color: props.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: props.disable ? 'not-allowed' : 'pointer',
        opacity: props.disable ? 0.6 : 1,
        ...props.style,
        minWidth: '17px',
        border: props.border,
        padding: '0 10px',
      }}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <Spinner />
      ) : (
        <>
          {props.icon}
          <span
            style={{
              fontSize: '15px',
              fontWeight: 600,
              marginLeft: 3,
              textTransform: 'none',
            }}
          >
            {props.text}
          </span>
        </>
      )}
    </button>
  );
};

export default Buttons;
