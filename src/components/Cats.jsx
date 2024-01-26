import {useReducer, useState, useRef, useEffect} from 'react'

// localStorage.setItem('cats', JSON.stringify(['homework', 'coding', 'chores']))

const Cats = () => {
  const ren = useRef(null)
  const sabrina = useRef(null)
  const [renderTrigger, setRenderTrigger] = useState(false);

  // useEffect(() => {
  //   // Function to handle changes in 'cats' item in localStorage
  //   const handleStorageChange = () => {
  //     // Update state to trigger re-render
  //     setRenderTrigger((prev) => !prev);
  //   };

  //   // Listen for changes in the 'cats' item
  //   window.addEventListener('storage', handleStorageChange);
  //   console.log('updated storage')
  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []); // Empty dependency array to run the effect only once on mount
  var cats = JSON.parse(localStorage.getItem('cats'))
  console.log(localStorage.getItem('cats'))




  function newCat(){
    cats.push(ren.current.value)
    localStorage.setItem('cats', JSON.stringify(cats))
    window.location.reload()
  }
  function removeCat(){
    console.log('removing cat')
    cats = cats.filter((x) => x.name !== sabrina.current.value)
    localStorage.setItem('cats', JSON.stringify(cats))
    console.log(localStorage.getItem('cats'))
    window.location.reload()
  }
  return (
    <section>
      <h2>Add Category</h2>
      <input type="text" ref={ren}/>
      <button onClick={()=>newCat()}>Add</button>
      <h2>Remove Category</h2>
      <input type="text" ref={sabrina}/>
      <button onClick={()=>removeCat()}>remove</button>
    </section>
  )
}

export default Cats