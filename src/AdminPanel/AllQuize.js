import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const AllQuize = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["allCategorys"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/allCategorys`);
      const data = await res.json();
      return data;
    },
  });

  console.log(categories);

  return (
    <div>
      <h2>All Quize Info</h2>
      {/* <table className="table w-full table-responsive">
        <thead>
          <tr>
            <th className="text-center text-sm">Seriul</th>
            <th className="text-center text-sm">CategoryName</th>
            <th className="text-center text-sm">TotalQuize</th>
          </tr>
        </thead>
        <tbody>
          {categories?.data?.length &&
            categories?.data?.map((category, index) => (
              <tr key={category._id}>
                <th className="text-center text-sm"> {index + 1} </th>
                <th className="text-center text-sm">
                  {" "}
                  {category.categoryName}{" "}
                </th>
                <th className="text-center text-sm">
                  {" "}
                  <Link
                    to={`/dashboard/allQuize/${category.categoryName}`}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </Link>{" "}
                </th>
              </tr>
            ))}
        </tbody>
      </table> */}
      <table className="table w-full table-responsive rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-center text-sm font-medium text-gray-800 p-2">Seriul</th>
            <th className="text-center text-sm font-medium text-gray-800 p-2">CategoryName</th>
            <th className="text-center text-sm font-medium text-gray-800 p-2">TotalQuize</th>
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
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
};

export default AllQuize;
