import {useReducer, useState} from 'react'

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
            return state
        }
        case 'change_name':{
            console.log('changing name')
            const current = state.filter((x) => x.id == id)
            state = state.filter((x) => x.id !== id)
            current.name = action.nextName
            state.push(current)
            localStorage.setItem('task', JSON.stringify(state))
            return state
        }
        case 'change_desc':{
            console.log('changing description')
            const current = state.filter((x) => x.id == id)
            state = state.filter((x) => x.id !== id)
            current.desc = action.nextDesc
            state.push(current)
            localStorage.setItem('task', JSON.stringify(state))
            return state
        }
        case 'change_cat':{
            console.log('changing name')
            const current = state.filter((x) => x.id == id)
            state = state.filter((x) => x.id !== id)
            current.cat = action.nextCat
            state.push(current)
            localStorage.setItem('task', JSON.stringify(state))
            return state
        }
    }
    throw Error('Unknown action type: ' + action.type)
}
// localStorage.setItem('task', JSON.stringify([{name: 'English', desc: 'pain', cat:'homework', id:0}, {name: 'Math', desc: 'lightwork', cat:'homework', id:1}, {name: 'task project', desc: 'ugh', cat:'coding', id:2}]))
const initialState = JSON.parse(localStorage.getItem('task'))

const List = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)
    const [current, setCurrent] = useState({})

    const [newTask, setNewTask] = useState({name: 'default', desc: 'default', cat: 'default'})
    function remove(id){
        console.log('removing')
        dispatch({type: 'remove', id: id})
    }

    function changeName(e){
        console.log(e.target.value)
        console.log('change name')
        dispatch({type: 'change_name', nextName: e.target.value, id: current.id})
    }
    function changeDesc(e){
        console.log('change desc')
        dispatch({type: 'change_desc', nextDesc: e.target.value, id: current.id})
    }
    function changeCat(e){
        console.log('change cat')
        dispatch({type: 'change_cat', nextCat: e.target.value,id: current.id})
    }
    

    function editToggle(x){
        console.log('editing')
        setCurrent(x)
        setEdit(!edit)
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
            setNewTask({name: e.target.value, desc: newTask.desc, cat: newTask.cat})
        }else if(e.target.id == 'desc'){
            console.log('desc')
            setNewTask({name: newTask.name, desc: e.target.value, cat: newTask.cat})
        }else{
            console.log('cat')
            setNewTask({name: newTask.name, desc: newTask.desc, cat: e.target.value})
        }
    }
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
                <input 
                    placeholder={current.cat}
                    onChange={changeCat} 
                />
                <button onClick={()=>editToggle({})}>Done</button>
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
                <input 
                    onChange={updateNew}
                    name='cat'
                    id='cat'
                />
                <button onClick={()=>{
                    addToggle({})
                    handleAddition()
                }}>Done</button>
            </form>
        )
    }
  return (
    <article>
        {state.map((x, index) => (
            <div key={index}>
                <h1>{x.name}</h1>
                <h3>{x.cat}</h3>
                <p>{x.desc}</p>
                <button onClick={() => editToggle(x)}>Edit Task</button>
                <button onClick={() => remove(x.id)}>Remove Task</button>
            </div>
        ))}
    <button onClick={() => addToggle()}>Add Task</button>
            
    </article>
  )
}

export default List