import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";

const ManageMyItems = () => {
  const { user } = useContext(AuthContext);
  const u = {
    displayName: user.displayName,
    email: user.email,
  };

  const print = () => {
    console.log('data:', data);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["manageItems"],
    queryFn: async () =>
      await axios
        .post(`http://localhost:5000/getMyItem/`, u, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((e) => {
          console.log('error from react query', e);
        }),
    refetchInterval: 300000,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if(error) {
    return <p>{error.message}</p>;
  }

  if (data.length === null) {
    return <p>No Item found or lost yet</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Post Type</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((d) => {
              <tr key={d._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={d.thumbnail}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>;
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageMyItems;
