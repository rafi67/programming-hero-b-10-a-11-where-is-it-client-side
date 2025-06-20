import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Loading from "./Loading";
import { IoMdLogIn } from "react-icons/io";
import { MdReport } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { VscDebugDisconnect } from "react-icons/vsc";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const Home = () => {
  const { url } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["home"],
    queryFn: async () =>
      await axios
        .get(url + "getItems")
        .then((res) => res.data)
        .catch((e) => {
          toast.error(e.message);
        }),
    refetchInterval: 300000,
    refetchOnWindowFocus: false,
  });

  const query = useQueryClient();

  const resetDetails = () => {
    query.removeQueries("details");
  };

  const [text] = useTypewriter({
    words: ["Help People to find their stuff"],
    loop: true,
  });

  if (isLoading) {
    return <Loading className="mx-auto"></Loading>;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="space-y-4">
      {/* lost and find items section */}
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center space-y-2 mb-16"
      >
        <h1 className="text-xl lg:text-4xl font-extrabold text-[#0B0B0B]">
          {text}
          <Cursor cursorColor="black" />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.map((d) => (
            <div key={d._id} className="card bg-base-100 w-full shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={d.thumbnail}
                  alt="Shoes"
                  className="rounded-xl w-full h-[250px]"
                />
              </figure>
              <div className="card-body items-start space-y-3">
                <h2 className="card-title text-[#09080F] font-semibold text-sm lg:text-2xl">
                  {d.title}
                </h2>
                <p className="text-[#09080F99] text-sm lg:text-xl font-medium text-left">
                  {d.description}
                </p>
                <div className="card-actions">
                  <Link
                    onClick={resetDetails}
                    className="btn bg-white border-2 border-[#9538E2] text-[#9538E2] font-semibold rounded-full"
                    to={`/details/${d._id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          className="btn border-2 border-[#9538E2] rounded-full text-[#9538E2] font-bold mt-12"
          to="/lostAndFoundItems"
        >
          See All
        </Link>
      </motion.section>

      {/* how to proceed section */}
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-4"
      >
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
              the items owner or finder.
            </p>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mt-24 space-y-4"
      >
        <h1 className="text-3xl text-[#09080F] font-bold">Where Is It</h1>
        <p className="text-lg font-medium text-[#09080F99]">
          WhereIsIt is a Lost and Found web application designed to help users
          reconnect with their misplaced belongings. It provides a seamless
          platform where individuals can report lost items, list found objects,
          and browse a database to find matches. With secure communication
          features, users can connect with the rightful owners or finders to
          arrange safe item recovery. The app leverages a user-friendly
          interface, advanced search filters, and image uploads to enhance
          efficiency. **WhereIsIt** aims to simplify the lost-and-found process,
          reducing stress and increasing the chances of retrieving valuable
          possessions.
        </p>
      </motion.section>
    </div>
  );
};

export default Home;
