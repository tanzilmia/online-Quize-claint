import moment from 'moment/moment'
import React, { useContext, useEffect, useState } from 'react'
import { mycontext } from '../contextApi/Authcontext'
function Quize() {
  const [queges, setqueges] = useState([])
  const {user,loading} = useContext(mycontext)
  const date = moment().format("MMM Do YY");
  const [userdata, setuserdata] = useState(null)
  const [currentQuestion, setcurrentQuestion] = useState(0)
  const [score, setscore] = useState(0)
  const [wrongAns, setwrongAns] = useState(0)
  const email = user?.email
  const name = user?.displayName
  console.log(date)

  console.log(userdata)
  const loadDataFormDb = ()=>{
    const userinfo = {
      date,
      email,
      name,
      currentQuestion,
      score,
      wrongAns,
      
    }
    fetch(`http://localhost:5000/userifno?email=${user?.email}&date=${date}`,{
      method : 'POST',
      headers : {
        'content-type': 'application/json', 
      },
      body : JSON.stringify(userinfo)

    })
    .then(res => res.json())
    .then(result =>{
        console.log(result);
        
    })
      fetch(`http://localhost:5000/quize?email=${user?.email}&date=${date}`)
      .then(res => res.json())
      .then(data => setqueges(data))
  }

  const answer = queges[currentQuestion]?.correct_answer
  const getAnswer = (option) =>{
    if(option === answer){
      setscore(score + 1)
      console.log(`right answer ${option}`)
      fetch(`http://localhost:5000/userifno-correctans?email=${user?.email}&date=${date}`,{
        method : 'PUT',
        headers : {
          'content-type': 'application/json', 
        },
        body : JSON.stringify({score})
      })
      .then(res => res.json())
      .then(result =>{
          console.log(result);
          
      })
      
    }
    if(option !== answer){
      setwrongAns(wrongAns + 1)
      fetch(`http://localhost:5000/userifno-incurrentquestion?email=${user?.email}&date=${date}`,{
        method : 'PUT',
        headers : {
          'content-type': 'application/json', 
        },
        body : JSON.stringify({wrongAns})
      })
      .then(res => res.json())
      .then(result =>{
          console.log(result);
          
      })
      console.log(`wrong answer ${option}`)
    }
    fetch(`http://localhost:5000/userifno-currentquestion?email=${user?.email}&date=${date}`,{
      method : 'PUT',
      headers : {
        'content-type': 'application/json', 
      },
      body : JSON.stringify({currentQuestion})
    })
    .then(res => res.json())
    .then(result =>{
        console.log(result);
        
    })
    setcurrentQuestion(currentQuestion + 1)
  }
  useEffect(() => {
    fetch(`http://localhost:5000/userinfo?email=${user?.email}&date=${date}`)
    .then(res => res.json())
    .then(data => setuserdata(data))

  }, [user?.email,date,currentQuestion])

  if(loading){
    return <p>Lorem ...</p>
  }


  return (
    <div>

      <div> <button onClick={loadDataFormDb} disabled = {userdata?.currentQuestion >=3}>Load Today Data</button> </div>
      
      { userdata?.currentQuestion >=3 ?
        <>
         <h2>Today Task Complete</h2>
        </>
        :
        <>
         <div> Quize {currentQuestion} / {queges.length} </div>
        <div> {queges[currentQuestion]?.question} </div>
        <div> right answer {score} / {queges.length} </div>
        <div> wrong ans {wrongAns} / {queges.length} </div>
        <div> 
          <ul>
          {
            queges[currentQuestion]?.options?.map((option,_id)=> 
              <>
              <br />
              <li><button key={_id} onClick={()=> getAnswer(option)}> {option} </button></li>
              </>
              )
           }
          </ul>
        </div>
        </>
      }

      
     </div>
  )
}

export default Quize