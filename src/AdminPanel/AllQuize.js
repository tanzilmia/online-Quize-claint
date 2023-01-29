import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const AllQuize = () => {
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["allCategorys"],
    queryFn: async () => {
      const res = await fetch(`https://online-quize-server.vercel.app/allCategorys`);
      const data = await res.json();
      return data;
    },
  });

  const handleDelet = (id) => {
    try {
      fetch(`https://online-quize-server.vercel.app/delete-category?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Successfully Deleted") {
            refetch();
          }
        });
    } catch (err) {}
  };

  console.log(categories);

  return (
    <div className="m-4">
      <h2>All Quize Info</h2>
      <div className="flex justify-center">
        <table className="table-auto w-full text-center">
          <thead className="bg-gray-200">
            <tr className="sticky top-0 bg-gray-200">
              <th className="px-4 py-2">Seriul</th>
              <th className="px-4 py-2">CategoryName</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.data?.length &&
              categories?.data?.map((category, index) => (
                <tr className="border-t hover:bg-gray-100" key={category._id}>
                  <th className="text-center border text-sm p-2">
                    {" "}
                    {index + 1}{" "}
                  </th>
                  <th className="text-center border text-sm p-2">
                    {" "}
                    {category.categoryName}{" "}
                  </th>
                  <th className="text-center border text-sm p-2">
                    {" "}
                    <Link
                      to={`/dashboard/allQuize/${category.categoryName}`}
                      className="btn btn-sm btn-info"
                    >
                      View Details
                    </Link>{" "}
                  </th>
                  <th className="border">
                    <button
                      onClick={() => handleDelet(category._id)}
                      className="btn btn-sm btn-warning"
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

export default AllQuize;
