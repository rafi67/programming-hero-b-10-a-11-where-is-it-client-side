import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useState } from "react";
import RecoveredItemCard from "../Components/RecoveredItemCard";
import RecoveredItemTable from "../Components/RecoveredItemTable";

const AllRecoveredItems = () => {
  const [isCard, setIsCard] = useState(false);

  const { data, isPending, error } = useQuery({
    queryKey: ["recoveredItems", isCard],
    queryFn: async () => {
      const url = isCard
        ? "http://localhost:5000/getRecoveredItemAndDetails"
        : "http://localhost:5000/getRecoveredItems";

      return await axios
        .get(url, {
          withCredentials: true,
        })
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
  });

  if (isPending) return <Loading></Loading>;

  if (error) {
    toast.error(error.message);
    return;
  }

  return (
    <div>
      <div className="text-right">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          <img
            src="https://img.icons8.com/?size=100&id=11393&format=png&color=000000"
            alt=""
            className="w-[30px] h-[30px]"
            onClick={() => setIsCard(true)}
          />
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          <img
            src="https://img.icons8.com/?size=100&id=FrYK39f5seKb&format=png&color=000000"
            alt=""
            className="w-[30px] h-[30px]"
            onClick={() => setIsCard(false)}
          />
        </button>
      </div>
      {isCard ? (
        <RecoveredItemCard data={data}/>
      ) : (
        <RecoveredItemTable data={data}/>
      )}
    </div>
  );
};

export default AllRecoveredItems;
