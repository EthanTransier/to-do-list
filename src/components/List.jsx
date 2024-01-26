import {useReducer, useState, useRef, useEffect} from 'react'

function reducer(state, action) {
    const {type} = action
    const {id} = action

    switch (type) {
        case 'remove':{
            console.log(state)
            localStorage.setItem('task', JSON.stringify(state.filter((x) => x.id !== id)))
            return state.filter((x) => x.id !== id)
        }
        case 'add':{
            console.log(state)
            state.push(action.newTask)
            localStorage.setItem('task', JSON.stringify(state))
            updateCats(action.newTask.cat)
            return state
        }
        case 'edit':{
            const editedTask = action.editedTask
            state = state.filter((x) => x.id !== editedTask.id)
            state.push(editedTask)
            localStorage.setItem('task', JSON.stringify(state))
            return state
        }
    }
    throw Error('Unknown action type: ' + action.type)
}

function updateCats(newCat){
    // console.log(localStorage.getItem('cats'))
    var cats = JSON.parse(localStorage.getItem('cats'))
    console.log(cats)
    if(!cats.includes(newCat)){
        cats.push(newCat)
        localStorage.setItem('cats', JSON.stringify(cats))
        console.log(localStorage.getItem('cats'))
    }
}
// localStorage.setItem('task', JSON.stringify([{name: 'English', desc: 'pain', cat:'homework', id:0}, {name: 'Math', desc: 'lightwork', cat:'homework', id:1}, {name: 'task project', desc: 'ugh', cat:'coding', id:2}]))

const initialState = JSON.parse(localStorage.getItem('task'))

const List = () => {
    const noah = useRef(null)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)
    const [current, setCurrent] = useState({})
    console.log(JSON.parse(localStorage.getItem('task')).length)
    const [newTask, setNewTask] = useState({name: 'default', desc: 'default', cat: 'default', id: JSON.parse(localStorage.getItem('task')).length})
     
    
    const currentCats = JSON.parse(localStorage.getItem('cats'))

    function remove(id){
        console.log('removing')
        dispatch({type: 'remove', id: id})
    }

    function changeName(e){
        const newCurrent = current
        newCurrent.name = e.target.value
        setCurrent(newCurrent)
    }
    function changeDesc(e){
        const newCurrent = current
        newCurrent.desc = e.target.value
        setCurrent(newCurrent)
    }
    function changeCat(e){
        const newCurrent = current
        newCurrent.cat = e.target.value
        setCurrent(newCurrent)
    }
    function handleEdit(){
        dispatch({type: 'edit', editedTask: current})
    }

    function startEdit(x){
        console.log('editing')
        setCurrent(x)
        setEdit(true)
    }

    function addToggle(){
        setAdd(!add)
    }

    function handleAddition(){
        dispatch({type: 'add', newTask: newTask})
    }

    function updateNew(e){
        
        if(e.target.id == 'title'){
            console.log('title')
            setNewTask({name: e.target.value, desc: newTask.desc, cat: noah.current.value})
        }else if(e.target.id == 'desc'){
            console.log('desc')
            setNewTask({name: newTask.name, desc: e.target.value, cat: noah.current.value})
        }else{
            console.log('cat')
        setNewTask({name: newTask.name, desc: newTask.desc, cat: noah.current.value})
        }
        
    }
    const cats = JSON.parse(localStorage.getItem('cats'))
    if(edit){
        return(
            <form className='editPopout'>
                <input 
                    placeholder={current.name}
                    onChange={changeName} 
                />
                <input 
                    placeholder={current.desc}
                    onChange={changeDesc} 
                />
                <select 
                    placeholder={current.cat}
                    onChange={changeCat} 
                >
                    {
                        cats.map((x, index) =>(
                            <option value={x} id={index}>{x}</option>
                        ))

                    }
                </select>
                <button onClick={()=>handleEdit()}>Done</button>
            </form>
        )
    }

    if(add){
        return(
            <form className='editPopout'>
                <label htmlFor="title">Name: </label>
                <input 
                    onChange={updateNew}
                    name="title"
                    id='title'
                />
                <label htmlFor="desc"> Description: </label>
                <input 
                    onChange={updateNew}
                    name='desc'
                    id='desc'
                />
                <label htmlFor="cat"> Category: </label>
                <select 
                    placeholder={current.cat}
                    onChange={updateNew} 
                    ref={noah}
                >
                    {
                        cats.map((x, index) =>(
                            <option value={x} id={index}>{x}</option>
                        ))

                    }
                </select>
                <button onClick={()=>{
                    addToggle({})
                    handleAddition()
                }}>Done</button>
            </form>
        )
    }
  return (
  <article>
    {currentCats.map((x, index) => (
      <div key={index}>
        <hr />
        <h1>{x}</h1>
        
        {state.map((y, index2) => (
          y.cat === x ? (
            <div key={index2}>
              <h2>{y.name}</h2>
              {/* <h3>{y.cat}</h3> */}
              <p>{y.desc}</p>
              <button onClick={() => startEdit(y)}>Edit Task</button>
              <button onClick={() => remove(y.id)}>Remove Task</button>
            </div>
          ) : null
        ))}
      </div>
    ))}
    <button onClick={() => addToggle()}>Add Task</button>
  </article>
);

}

export default List