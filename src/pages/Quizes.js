import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import CategoryDiv from '../components/CategoryDiv';
import { mycontext } from '../contextApi/Authcontext';



const Quizes = () => {
    const {loading} = useContext(mycontext);
    
    const {data :categoryOptions=[]} = useQuery({
          queryKey: ["allCategorys-quizepage"],
          queryFn: async ()=>{
            const res = await fetch(`https://online-quize-server.vercel.app/allCategorys-quizepage`)
            const data = await res.json()
            return data
          }
    })




    if(loading){
        return <p>Loaddings..</p>
    }
   
    return (
        <div className='m-4'>
            <h2 className='text-center text-2xl my-4'> Chose Your Category </h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4'>
            {
                categoryOptions?.length &&

                categoryOptions?.map(category => <CategoryDiv key = {category._id} category={category} /> )
            }
            </div>
        </div>
    );
};

export default Quizes;