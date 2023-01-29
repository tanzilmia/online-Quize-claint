import { useQuery } from "@tanstack/react-query";
import React from "react";

const UserHistory = () => {
  const { data: userhistorys = [], refetch } = useQuery({
    queryKey: ["all-user-history"],
    queryFn: async () => {
      const res = await fetch(`https://online-quize-server.vercel.app/all-user-history`);
      const data = await res.json();
      return data;
    },
  });

  const deleteHistory = (id) => {
    try {
      fetch(`https://online-quize-server.vercel.app/delete-user-history?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
        });
    } catch (err) {}
  };

  const resetHistory = (id) => {
    try {
      fetch(`https://online-quize-server.vercel.app/reset-user-history?id=${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
        });
    } catch (err) {}
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold my-4">All User Info </h2>
      <div className="flex justify-center">
        <table className="table-auto w-full text-center text-sm">
          <thead class="bg-gray-200">
            <tr className="sticky top-0 bg-gray-200">
              <th className="px-4 py-2">Seriul</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">category</th>
              <th className="px-4 py-2">score</th>
              <th className="px-4 py-2">rightAns</th>
              <th className="px-4 py-2">wrongAns</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userhistorys.length &&
              userhistorys.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <th className="border px-4 py-2"> {index + 1} </th>
                  <th className="border px-4 py-2">{user.date}</th>
                  <th className="border px-4 py-2">{user.email}</th>
                  <th className="border px-4 py-2">{user.categoryName}</th>
                  <th className="border px-4 py-2">{user.score}</th>
                  <th className="border px-4 py-2">{user.rightAns}</th>
                  <th className="border px-4 py-2">{user.wrongAns}</th>
                  <th className="border px-4 py-2">
                    {" "}
                    <button
                      className="btn btn-sm bg-red-500"
                      onClick={() => deleteHistory(user._id)}
                    >
                      Delete
                    </button>
                  </th>
                  <th className="border px-4 py-2">
                    {" "}
                    <button
                      className="btn btn-sm"
                      onClick={() => resetHistory(user._id)}
                    >
                      Reset History
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

export default UserHistory;
