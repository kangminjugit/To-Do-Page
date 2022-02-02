import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryListState, categoryState, IToDo, toDoState } from "./atoms";

function ToDo({text, category, id}:IToDo){
    const curCategory = useRecoilValue(categoryState);
    const categories = useRecoilValue(categoryListState);
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = {text, id, category: name as any};
            return [
                ...oldToDos.slice(0,targetIndex), 
                newToDo, 
                ...oldToDos.slice(targetIndex+1)
            ];
        })
    }
    const deleteToDo = (event:React.MouseEvent<HTMLButtonElement>) => {
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            return [
                ...oldToDos.slice(0, targetIndex),
                ...oldToDos.slice(targetIndex+1)
            ];
        })
    }

    return (
        <li>
            <span>{text}</span>
            {
                categories.map((category, id) => {
                    if(category.text !== curCategory){
                        return <button key={id} name={category.text} onClick={onClick}>{category.text}</button>;
                    }
                })
            }
            <button style={{backgroundColor: "pink"}} onClick={deleteToDo}>Delete</button>
        </li>
    );
}

export default ToDo;