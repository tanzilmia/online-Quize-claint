import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = () => {

    const {data:users=[],refetch} = useQuery({
        queryKey:["all-user"],
        queryFn : async ()=>{
            const res = await fetch(`http://localhost:5000/all-user`)
            const data = await res.json()
            return data
        }
    })


    const deleteUser = (id) =>{
        try{
            fetch(`http://localhost:5000/delete-user?id=${id}`,{
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
        }catch(err){}
    }

     
    return (
        <div>
            <h2 className='text-center text-2xl text-bold'>User Info </h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th>Seriul</th>
        <th>Name</th>
        <th>Email</th>
        <th>Activity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {
        users.length && 
        users.map((user,index)=> <tr key={user._id}>
            <th> {index + 1} </th>
            <th>{user.name}</th>
            <th>{user.email}</th>
            <th> <Link className='btn btn-sm' to = {`/single-user-info/${user.email}`}>View Details</Link> </th>
            <th><button disabled ={user.role === "admin"} onClick={()=>deleteUser(user._id)} className='btn btn-sm'>Delete</button></th>
          </tr>)
    }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default UserInfo;