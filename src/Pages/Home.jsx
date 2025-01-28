import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Loading from "./Loading";

const Home = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const [text] = useTypewriter({
    words: ["Help People to find their stuff"],
    loop: true,
  });

  if (isPending) {
    return <Loading></Loading>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <h1 className="text-4xl font-extrabold text-gray-400">
        {text}
        <Cursor cursorColor="gray" />
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((d) => (
          <>
            <div key={d._id} className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src={d.thumbnail}
                  alt="Shoes"
                  className="rounded-xl w-full h-[250px]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{d.title}</h2>
                <p>
                  {d.description}
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

const getItems = async () => {
  return await axios.get("http://localhost:5000/getItem").then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export default Home;
