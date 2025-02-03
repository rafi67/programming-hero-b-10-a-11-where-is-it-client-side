import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Loading from "./Loading";
import { IoMdLogIn } from "react-icons/io";
import { MdReport } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { VscDebugDisconnect } from "react-icons/vsc";

const Home = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () =>
      await axios.get("http://localhost:5000/getItem").then((res) => res.data),
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
    <div className="space-y-4">
      {/* lost and find items section */}
      <section className="flex flex-col items-center space-y-2">
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
                  <p>{d.description}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <button className="btn btn-primary">See All</button>
      </section>

      {/* how it works section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">How to Proceed</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* card 1 */}
          <div className="flex flex-col flex-start text-left h-[250px] space-y-2 rounded-2xl bg-[#E7C1D3] p-6">
            <IoMdLogIn className="text-4xl" />
            <h1 className="text-xl font-extrabold">
              Create an account and log in.
            </h1>
            <p className="text-lg font-medium">
              Sign up quickly, log in securely, and access all features to
              report, list, and find lost items effortlessly.
            </p>
          </div>

          {/* card 2 */}
          <div className="flex flex-col flex-start text-left h-[250px] space-y-2 rounded-2xl bg-[#EFDA6E] p-6">
            <MdReport className="text-4xl" />
            <h1 className="text-xl font-extrabold">
              Report a lost item or list a found item
            </h1>
            <p className="text-lg font-medium">
              Describe your lost or found item with details and images to help
              connect with the right person faster.
            </p>
          </div>

          {/* card 3 */}
          <div className="flex flex-col flex-start text-left h-[250px] space-y-2 rounded-2xl bg-[#A4DAC3] p-6">
            <BsSearch className="text-4xl" />
            <h1 className="text-xl font-extrabold">
              Browse the listings or use search filters
            </h1>
            <p className="text-lg font-medium">
              Easily explore listings or apply search filters to quickly find
              lost or found items that match your needs.
            </p>
          </div>

          {/* card 4 */}
          <div className="flex flex-col flex-start text-left h-[250px] space-y-2 rounded-2xl bg-[#77AAEA] p-6">
            <VscDebugDisconnect className="text-4xl" />
            <h1 className="text-xl font-extrabold">
              Connect with the owner/finder securely
            </h1>
            <p className="text-lg font-medium">
              Send secure messages through the platform to safely connect with
              the item's owner or finder.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
