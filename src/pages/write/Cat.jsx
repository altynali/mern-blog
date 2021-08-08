import { useState } from 'react';

const Cat = ({ cat, handleCat }) => {
  const [active, setActive] = useState(false);
  const classes = ['writeCat'];

  if (active) classes.push('active');

  return (
    <span
      className={classes.join(' ')}
      onClick={() => {
        handleCat(cat.name);
        setActive(!active);
      }}
    >
      {cat.name}
    </span>
  );
};

export default Cat;
