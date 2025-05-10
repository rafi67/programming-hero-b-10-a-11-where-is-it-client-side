import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { toast } from "react-toastify";

const AllRecoveredItems = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["recoveredItems"],
    queryFn: async () =>
      await axios
        .get("http://localhost:5000/getRecoveredItems", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isPending) return <Loading></Loading>;

  if (error) {
    toast.error(error.message);
    return;
  }

  let i = 1;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Recovered Location</th>
              <th>Recovered Date</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d._id}>
                <th>{i++}</th>
                <td>{d.recoveredLocation}</td>
                <td>{d.date}</td>
                <td>{d.recoveredPerson.displayName}</td>
                <td>{d.recoveredPerson.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecoveredItems;
