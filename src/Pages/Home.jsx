import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Loading from "./Loading";

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
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/ymQzKVN5/find-lost-ITems.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md space-y-2">
            <h1 className="mb-5 text-5xl font-bold">How It Works</h1>
            <ul className="list-disc mx-auto text-left">
              <li>Create an account and login</li>
              <li>
                Report a lost item or list a found item with details and images.
              </li>
              <li>
                Browse the listings or use search filters to find matches.
              </li>
              <li>
                Connect with the owner/finder securely through the platform.
              </li>
              <li>Arrange for item recovery and mark it as resolved.</li>
            </ul>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
