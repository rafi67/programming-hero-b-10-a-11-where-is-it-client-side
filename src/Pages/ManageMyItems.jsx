import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";
import Lottie from "lottie-react";
import NoDataFound from '../noDataFound.json';

const ManageMyItems = () => {
  const { user } = useContext(AuthContext);
  const u = {
    displayName: user.displayName,
    email: user.email,
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/deleteItem/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log('response', res);
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
              refetch();
            }
            else {
              Swal.fire({
                title: "Oops...",
                text: "Something went wrong!",
                icon: "error",
              });
            }
          });
      }
    });
  };

  const { data, isLoading, isPending, error, refetch } = useQuery({
    queryKey: ["manageItems"],
    queryFn: async () =>
      await axios
        .post(`http://localhost:5000/getMyItem/`, u, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((e) => {
          console.log("error from react query", e);
        }),
  });

  if (isLoading || isPending) {
    return <Loading></Loading>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data?.length === 0) {
    return <Lottie className="w-[25%] mx-auto" animationData={NoDataFound}/>;
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
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((d) => (
                <tr key={d._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={`${d.thumbnail}`} alt="Item" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{`${d.postType}`}</td>
                  <td>{`${d.title}`}</td>
                  <td>{`${d.description}`}</td>
                  <td>{`${d.category}`}</td>
                  <td>{`${d.location}`}</td>
                  <td>{`${d.date}`}</td>
                  <th>
                    <Link className="btn btn-ghost btn-xs" to={`/updateItem/${d._id}`}>
                      <MdEdit />
                    </Link>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(d._id)}
                    >
                      <MdDelete />
                    </button>
                  </th>
                </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Image</th>
              <th>Post Type</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Location</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageMyItems;
