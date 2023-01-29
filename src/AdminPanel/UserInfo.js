import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const res = await fetch(`https://online-quize-server.vercel.app/all-user`);
      const data = await res.json();
      return data;
    },
  });

  const deleteUser = (id) => {
    try {
      fetch(`https://online-quize-server.vercel.app/delete-user?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
        });
    } catch (err) {}
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl text-bold">User Info </h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Seriul</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Activity</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <th> {index + 1} </th>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>
                    {" "}
                    <Link
                      className="btn btn-sm btn-primary rounded-2xl"
                      to={`/single-user-info/${user.email}`}
                    >
                      View Details
                    </Link>{" "}
                  </th>
                  <th>
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => deleteUser(user._id)}
                      className="btn btn-sm btn-warning rounded-2xl"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
