import axios from "axios";
import DatePicker from "react-datepicker";
import { useParams } from "react-router";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  axios.defaults.withCredentials = true;
  const { data, isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () =>
      await axios
        .post(`http://localhost:5000/getItem/${id}`, { email: user.email })
        .then((res) => res.data),
  });

  if (isPending) {
    return <Loading></Loading>;
  }

  if (error) {
    console.log("error from details page", error.message);
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-1.5 p-0 mx-auto">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Post Type</label>
          <select
            defaultValue={data.postType}
            className="select"
            name="postType"
            readOnly
          >
            <option disabled={true}>Select Post Type</option>
            <option value="Found" disabled={true}>
              Found
            </option>
            <option value="Lost" disabled={true}>
              Lost
            </option>
          </select>
          <label className="fieldset-label">Thumbnail</label>
          <figure className="px-10 pt-10">
            <img
              src={data.thumbnail}
              alt="Shoes"
              className="rounded-xl w-full h-[250px]"
            />
          </figure>
          <label className="fieldset-label">Title</label>
          <input
            type="text"
            className="input"
            defaultValue={data.title}
            name="title"
            readOnly
          />
          <fieldset className="fieldset">
            <label className="fieldset-label">Description</label>
            <textarea
              className="textarea h-24 resize-none"
              defaultValue={data.description}
              name="description"
            ></textarea>
          </fieldset>
          <fieldset className="fieldset">
          <label className="fieldset-label">Category</label>
            <select
              defaultValue={data.category}
              className="select"
              name="category"
            >
              <option disabled={true}>Select Category</option>
              <option value="Pets">Pets</option>
              <option value="Documents">Documents</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <label className="fieldset-label">Location</label>
            <input
              type="text"
              className="input"
              defaultValue={data.location}
              name="location"
              readOnly
            />
          </fieldset>
          <label className="fieldset-label">Date Lost Or Found</label>
          <DatePicker
            showIcon
            placeholderText="Select Date"
            className="input"
            selected={data.date}
            readOnly
          ></DatePicker>
          <label className="fieldset-label">Contact Information</label>
          <input
            type="text"
            className="input"
            defaultValue={data.contactInformation.displayName}
            name="displayName"
            readOnly
          />
          <input
            type="email"
            className="input"
            defaultValue={data.contactInformation.email}
            name="email"
            readOnly
          />
          {data.postType === "Lost" ? (
            <button className="btn btn-neutral mt-4">Found This!</button>
          ) : (
            <button className="btn btn-neutral mt-4">This is Mine!</button>
          )}
        </fieldset>
      </div>
    </div>
  );
};

export default Details;