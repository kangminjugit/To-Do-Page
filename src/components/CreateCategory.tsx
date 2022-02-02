import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryListState, categoryState } from "./atoms";

interface IForm{
    category: string;
};

function CreateCategory(){
    const setCategoryList = useSetRecoilState(categoryListState);
    const {handleSubmit, setValue, register} = useForm<IForm>();

    const handleValid = ({category}:IForm) => {
        setCategoryList(oldCategoryList => [...oldCategoryList, {text: category, id: Date.now()}]);
        setValue("category", "");
    }

    return(
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("category", {
                    validate: (value) => value!=="",
                })} 
                placeholder="Write new category"/>
            <button>Add Category</button>
        </form>
    );
}

export default CreateCategory;