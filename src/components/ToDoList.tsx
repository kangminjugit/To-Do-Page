import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { Categories, categoryListState, categoryState, toDoSelector, toDoState,allToDoSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import {useRecoilState, useRecoilValue} from "recoil";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";

function ToDoList(){
    const categories = useRecoilValue(categoryListState);
    const toDos = useRecoilValue(toDoSelector);
    const allToDos = useRecoilValue(allToDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(allToDos));
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [toDos, allToDos]);

    return(
    <div>
        <h1>To Dos</h1>
        <hr/>
        <CreateCategory />
        <hr />
        <select onInput={onInput}>
            {
                categories.map((category, id) => <option key={id} value={category.text}>{category.text}</option>)
            }
        </select>
        <CreateToDo />
        {toDos?.map((toDo, id) => <ToDo key={id} {...toDo} />)}
    </div>
    );
}

export default ToDoList;