import React from 'react';

const Option = ({ text, isSelected, onSelect }) => {
  const optionStyle = {
    backgroundColor: isSelected ? 'lightblue' : 'white',
  };

  return (
    <div style={optionStyle} onClick={() => onSelect(text)}>
      {text}
    </div>
  );
};

export default Option;
