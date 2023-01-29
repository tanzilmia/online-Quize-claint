import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const CategoryWizeQuizeData = () => {
  const quizedata = useLoaderData();

  const handleEditeQuize = (id) => {
    console.log(id);
  };

  const deleteQuize = (id) => {
    try {
      fetch(`https://online-quize-server.vercel.app/delete-quize?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Successfully Deleted") {
            setTimeout(() => {
              window.location.reload(true);
            }, 100);
          }
        });
    } catch (err) {}
  };

  return (
    <div className="m-4">
      {quizedata?.data.length > 0 ? (
        <div className="flex justify-center">
          <table className="table-auto w-full text-center text-xs">
            <thead>
              <tr className="sticky top-0 bg-gray-200">
                <th className="px-4 py-2 bg-slate-200 text-black">Serial</th>
                <th className="px-4 py-2 bg-slate-200 text-black">Title</th>
                <th className="px-4 py-2 bg-slate-200 text-black">
                  Category Name
                </th>
                <th className="px-4 py-2 bg-slate-200 text-black">
                  Correct Answer
                </th>
                <th className="px-4 py-2 bg-slate-200 text-black">Option 1</th>
                <th className="px-4 py-2 bg-slate-200 text-black">Option 2</th>
                <th className="px-4 py-2 bg-slate-200 text-black">Option 3</th>
                <th className="px-4 py-2 bg-slate-200 text-black">Option 4</th>
                <th className="px-4 py-2 bg-slate-200 text-black">Action</th>
                <th className="px-4 py-2 bg-slate-200 text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {quizedata?.data?.length &&
                quizedata?.data?.map((category, index) => (
                  <tr key={category._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{category.title}</td>
                    <td className="border px-4 py-2">
                      {category.categoryName}
                    </td>
                    <td className="border bg-slate-400 text-white px-4 py-2">
                      {category.correctAnswer}
                    </td>
                    {category.quizeOptions.map((option) => (
                      <td className="border px-4 py-2">{option}</td>
                    ))}
                    <td className="border px-4 py-2">
                      <Link
                        to={`/dashboard/editequize/${category._id}`}
                        onClick={() => handleEditeQuize(category._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Edite
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => deleteQuize(category._id)}
                        className="btn btn-sm btn-warning"
                      >
                        {" "}
                        Delete{" "}
                      </button>{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2>No Data Available</h2>
        </div>
      )}
    </div>
  );
};

export default CategoryWizeQuizeData;
