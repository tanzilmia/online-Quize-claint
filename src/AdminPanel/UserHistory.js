import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UserHistory = () => {
    const {data:userhistorys=[],refetch} = useQuery({
        queryKey:["all-user-history"],
        queryFn : async ()=>{
            const res = await fetch(`http://localhost:5000/all-user-history`)
            const data = await res.json()
            return data
        }
    })

    const deleteHistory = (id) =>{
        try{
            fetch(`http://localhost:5000/delete-user-history?id=${id}`,{
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
        }catch(err){}
    }

    const resetHistory = (id) =>{
        try{
         fetch(`http://localhost:5000/reset-user-history?id=${id}`,{
            method:"PUT",
         })
         .then(res=> res.json())
         .then(data => {refetch()})
        
        }catch(err) {}
    }
    
    return (
        <div>
            <h2 className='text-center text-2xl text-bold'>User Info </h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th>Seriul</th>
        <th>Date</th>
        <th>Email</th>
        <th>category</th>
        <th>score</th>
        <th>rightAns</th>
        <th>wrongAns</th>
        <th>Action</th> 
        <th>Action</th> 
      </tr>
    </thead>
    <tbody>
    {
        userhistorys.length && 
        userhistorys.map((user,index)=> <tr key={user._id}>
            <th> {index + 1} </th>
            <th>{user.date}</th>
            <th>{user.email}</th>
            <th>{user.categoryName}</th>
            <th>{user.score}</th>
            <th>{user.rightAns}</th>
            <th>{user.wrongAns}</th>
            <th> <button className='btn btn-sm' onClick={()=>deleteHistory(user._id)}>Delete</button></th>
            <th> <button className='btn btn-sm' onClick={()=>resetHistory(user._id)}>Reset History</button></th>
           
            
          </tr>)
    }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default UserHistory;