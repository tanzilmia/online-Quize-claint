import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const AllQuize = () => {
  const { data: categories = [] , refetch} = useQuery({
    queryKey: ["allCategorys"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/allCategorys`);
      const data = await res.json();
      return data;
    },
  });



  const handleDelet = (id) =>{
    try {
      fetch(`http://localhost:5000/delete-category?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message === "Successfully Deleted"){
            refetch()
          }
        });
    } catch (err) {}
  }



  console.log(categories);

  return (
    <div>
      <h2>All Quize Info</h2>
      <table className="table w-full table-responsive rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr className="sticky top-0 bg-gray-200">
            <th className="text-center text-sm font-medium text-gray-800 p-2">Seriul</th>
            <th className="text-center text-sm font-medium text-gray-800 p-2">CategoryName</th>
            <th className="text-center text-sm font-medium text-gray-800 p-2">Action</th>
            <th className="text-center text-sm font-medium text-gray-800 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.data?.length &&
            categories?.data?.map((category, index) => (
              <tr className="border-t hover:bg-gray-100" key={category._id}>
                <th className="text-center text-sm p-2"> {index + 1} </th>
                <th className="text-center text-sm p-2">
                  {" "}
                  {category.categoryName}{" "}
                </th>
                <th className="text-center text-sm p-2">
                  {" "}
                  <Link
                    to={`/dashboard/allQuize/${category.categoryName}`}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </Link>{" "}
                </th>
                <th>
                  <button onClick={()=>handleDelet(category._id)} className="btn btn-sm btn-warning">Delete</button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
};

export default AllQuize;
