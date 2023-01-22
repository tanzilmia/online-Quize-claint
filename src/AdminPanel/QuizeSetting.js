import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../cssFiles/DashDiv.css'
const QuizeSetting = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset 
      } = useForm();
      const [quizeError, setquizeError] = useState("");

      const handleAddCategories = (data)=>{
        const categories = data.addCategoreys
        console.log(categories);
       
        const categoryData = {
            categoryName:categories
        }

        try{
            fetch(`http://localhost:5000/addcategory`,{
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body:JSON.stringify(categoryData)
            })
            .then(res=> res.json())
            .then(data =>{
                console.log(data);
                if(data.message === "exist"){
                    alert("Quize is already exist")
                }
                if(data.message === "successfull"){
                    alert("Quize add successfull")
                    reset()
                }
            })
          }catch(error){
            console.log(error)
          }
       
        
      }

    return (
        <div>
           <div className="addQuize divthree w-4/12">
            <h2 className="text-center text-2xl pt-4 text-lime-50">Add New Categories</h2>
             <form onSubmit={handleSubmit(handleAddCategories)}  action="">
             <div className="add_quize_inputdiv">
                <input type="text"  {...register("addCategoreys", {
                required: "Name is Required",
              })} placeholder="Enter Your Category Name" />
                </div>
                <button className="addbtn" type="submit">Add Categories</button>
             </form>
           </div>
        </div>
    );
};

export default QuizeSetting;