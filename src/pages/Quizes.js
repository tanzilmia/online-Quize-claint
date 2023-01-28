import React, { useContext } from 'react';
import CategoryDiv from '../components/CategoryDiv';
import { mycontext } from '../contextApi/Authcontext';



const Quizes = () => {
    const {categoryObject, loading} = useContext(mycontext);
    const {categoryOptions} = categoryObject;
    if(loading){
        return <p>Loaddings..</p>
    }
   
    return (
        <div>
            <h2>All Quize Gose to here </h2>
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