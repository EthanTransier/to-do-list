import {useReducer} from 'react'

function reducer(state, action) {
    const {type} = action
    const {id} = action

    switch (type) {
        case 'remove':{
            console.log(state)
            return state.filter((x) => x.id !== id)
        }
        case 'add':{
            console.log(state)
            return state.push()
        }
        // case 'change_name':{
        //     const new
        // }
    }
    throw Error('Unknown action type: ' + action.type)
}

const initialState = [{name: 'English', desc: 'pain', cat:'homework', id:0}, {name: 'Math', desc: 'lightwork', cat:'homework', id:1}, {name: 'task project', desc: 'ugh', cat:'coding', id:2}]

const List = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [edit, setEdit] = useState(false)
    function remove(id){
        console.log('removing')
        dispatch({type: 'remove', id: id})
    }

    function changeName(e){
        dispatch({type: 'change_name', nextName: e.target.value, id: id})
    }
    function changeDesc(e){
        dispatch({type: 'change_desc', nextDesc: e.target.value, id: id})
    }
    function changeCat(e){
        dispatch({type: 'change_cat', nextCat: e.target.value,id: id})
    }
    

    // function edit(id){
    //     console.log('editing')
    //     setEdit(true)
    // }

    // function add(){
    //     setEdit(true)
    // }

  return (
    <article>
        {state.map((x, index) => (
            <div key={index}>
                <h1>{x.name}</h1>
                <h3>{x.cat}</h3>
                <p>{x.desc}</p>
                <button onClick={() => edit(x)}></button>
                <button onClick={() => remove(x.id)}>Remove Task</button>
            </div>
        ))     
    }
    <button onClick={() => add()}>Add Task</button>
    {function edit(x){
        return(
            <form className='editPopout' onSubmit={handleSubmit}>
                <input 
                    value={x.name}
                    onChange={changeName} 
                />
                <input 
                    value={x.desc}
                    onChange={changeDesc} 
                />
                <input 
                    value={x.cat}
                    onChange={changeCat} 
                />
            </form>
        )
    }}
    </article>
  )
}

export default List