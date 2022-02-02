import { atom, selector} from "recoil";

export enum Categories {
    "TO_DO" = "To Do",
    "DOING" = "Doing",
    "DONE" = "Done"
};

export interface IToDo{
    text: string;
    id:number;
    category: ICategory;
}

export interface ICategory{
    text: string;
}

export const categoryListState = atom<ICategory[]>({
    key: "categoryList",
    default: localStorage.getItem("categories")? 
    JSON.parse(localStorage.getItem("categories") as any)
    :
    [
        {
            text: Categories.TO_DO,
        }, 
        {
            text:Categories.DOING,
        },
        { 
            text:Categories.DONE,

        } 
    ]
});

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: localStorage.getItem("toDos")? JSON.parse(localStorage.getItem("toDos") as any) : []
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return  toDos.filter(toDo => toDo.category.text === category);
    }
});

export const allToDoSelector = selector({
    key: "allToDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        return toDos;
    }
})