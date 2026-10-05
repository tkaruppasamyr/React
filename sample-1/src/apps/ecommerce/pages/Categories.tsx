import { CategoriesList } from "../../../component/ecommerce/categories/CategoriesComponents";
import { axiosInstance } from "../../../api/axios";
import { useEffect } from "react";

export const Catergories = () => {

    useEffect(() => {

        const categoriesLoaderapi = async () => {
            try{
                const response = await categoriesLoader();
                if(response.status === 200){
                    console.log("Categories loaded successfully", response.data);
                }
            }catch(error){
                console.error("Error loading categories", error);
                throw error;
            }
        }
       
        categoriesLoaderapi();
    }, []);
    return (
        <div>
            <CategoriesList />
        </div>
    );
};



export const categoriesLoader = async () =>{
    try{
        const api = await axiosInstance.Get('/products/api/categories/');
        return api;
    }catch(error){
        console.error("Error loading categories", error);
        throw error;
    }
}