import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = () => {

    const {data:users=[]} = useQuery({
        queryKey:["all-user"],
        queryFn : async ()=>{
            const res = await fetch(`http://localhost:5000/all-user`)
            const data = await res.json()
            return data
        }
    })

    console.log(users.length)  
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
            <th> <Link to = {`/to`}>View Details</Link> </th>
            <th><button className='btn'>Delete</button></th>
          </tr>)
    }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default UserInfo;