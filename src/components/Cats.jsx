import React, { useState, useRef } from 'react';

const Cats = () => {
  const ren = useRef(null);
  const sabrina = useRef(null);
  const [cats, setCats] = useState(JSON.parse(localStorage.getItem('cats')) || []);

  const newCat = () => {
    const newCategory = ren.current.value.trim();
    if (newCategory) {
      const updatedCats = [...cats, newCategory];
      setCats(updatedCats);
      localStorage.setItem('cats', JSON.stringify(updatedCats));
    }
    window.location.reload();
  };

  const removeCat = () => {
    const categoryToRemove = sabrina.current.value.trim();
    if (categoryToRemove) {
      const updatedCats = cats.filter(cat => cat !== categoryToRemove);
      setCats(updatedCats);
      localStorage.setItem('cats', JSON.stringify(updatedCats));
    }
    window.location.reload();
  };

  return (
    <section className='cat-container'>
      <h2>Add Category</h2>
      <div>
        <input type="text" ref={ren} />
        <button onClick={() => newCat()} className='cat-button'>+</button>
      </div>
      <h2>Remove Category</h2>
      <div>
        <input type="text" ref={sabrina} />
        <button onClick={() => removeCat()} className='cat-button'>-</button>
      </div>
    </section>
  );
};

export default Cats;
