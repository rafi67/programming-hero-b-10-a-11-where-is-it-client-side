import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router";

const LostAndFoundItem = () => {

  
  const { data, isPending, error } = useQuery({
    queryKey: ["page"],
    queryFn: async () =>
      await axios
        .get("http://localhost:5000/getAllItem", { withCredentials: true })
        .then((res) => res.data),
        refetchInterval: 300000,
  });

  const query = useQueryClient();

  const resetDetails = () => {
    query.removeQueries("details");
  };

  if (isPending) {
    return <Loading></Loading>;
  }

  if (error) {
    console.log("Lost and Found Item", error.message);
  }

  return (
    <div className="space-y-2">
      <h1 className="text-4xl text-center font-extrabold text-[#0B0B0B]">
        Lost & Found Items
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((d) => (
          <>
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
                    to={`/details/${d._id}`} onClick={resetDetails}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default LostAndFoundItem;
