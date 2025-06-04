import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router";
import Lottie from "lottie-react";
import Search from "../search.json";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const LostAndFoundItem = () => {
  const { url } = useContext(AuthContext);
  const [isFound, setIsFound] = useState(true);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["page"],
    queryFn: async () =>
      await axios
        .get(url+"getAllItem", { withCredentials: true })
        .then((res) => res.data),
    refetchInterval: 300000,
    refetchOnWindowFocus: false,
  });

  const search = (e) => {
    let input = e.target.value.toLowerCase();
    input = input.replace(/^\s+|\s+$/g, "");

    const result = data.filter(
      (d) =>
        d.title.toLowerCase() === input || d.location.toLowerCase() === input
    );
    if (result.length !== 0) {
      setIsFound(true);
      query.setQueryData(["page"], result);
    } else setIsFound(false);
  };

  const query = useQueryClient();

  const resetDetails = () => {
    query.removeQueries("details");
  };

  if (isPending) {
    return <Loading></Loading>;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="space-y-2">
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search"
          onChange={search}
        />
      </label>
      <h1 className="text-4xl text-center font-extrabold text-[#0B0B0B]">
        Lost & Found Items
      </h1>
      {isFound ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.map((d) => (
            <div key={d._id} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={d.thumbnail}
                  alt="Shoes"
                  className="rounded-xl w-full h-[250px]"
                />
              </figure>
              <div className="card-body items-start space-y-3">
                <h2 className="card-title text-[#09080F] font-semibold text-2xl">
                  {d.title}
                </h2>
                <p className="text-[#09080F99] text-xl font-medium text-left">
                  {d.description}
                </p>
                <div className="card-actions">
                  <Link
                    className="btn bg-white border-2 border-[#9538E2] text-[#9538E2] font-semibold rounded-full"
                    to={`/details/${d._id}`}
                    onClick={resetDetails}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <Lottie className="w-[30%] mx-auto" animationData={Search} />
          <button
            className="btn btn-primary rounded-3xl"
            onClick={() => {
              setIsFound(true);
              refetch();
            }}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default LostAndFoundItem;
