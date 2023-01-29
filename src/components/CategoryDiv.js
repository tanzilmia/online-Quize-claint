import moment from 'moment/moment';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';
import '../cssFiles/QuizeCategory.css'

const CategoryDiv = ({category}) => {
    const {user} = useContext(mycontext);
    const {categoryName} = category;
    const date = moment().format("MMM Do YY");
    const currentQuestion = 0;
    const score = 0;
    const rightAns = 0;
    const wrongAns = 0;
    const autoSubmitAnswer = 0;
    const userData = {
        email : user.email,
        name:user.name,
        categoryName,
        date,
        currentQuestion,
        score,
        rightAns,
        wrongAns,
        autoSubmitAnswer
    }

    const handleStartQuize = ()=>{
      try{

        fetch(`https://online-quize-server.vercel.app/store-daily-quize`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(userData)
           })
           .then(res=> res.json())
           .then(data => {console.log(data)})
      }
      catch(err){console.log(err)}
    }

    return (
        <div className='quize_category text-center rounded-lg p-3'>
            <h2 className='quize_title text-3xl my-3 text-white'>{categoryName}</h2>
         <Link onClick={handleStartQuize} className='quize_btns px-4 py-1 rounded-md font-bold text-white' to = {`/playQuize/${categoryName}`}> Start Quize </Link>
            
        </div>
    );
};

export default CategoryDiv;