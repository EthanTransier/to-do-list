import {useReducer, useState} from 'react'

localStorage.setItem('cats', JSON.stringify(['homework', 'coding', 'chores']))

const Cats = () => {
  console.log(localStorage.getItem('cats'))
  return (
    <div>Cats</div>
  )
}

export default Cats