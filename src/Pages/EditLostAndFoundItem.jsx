import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "./Loading";

const EditLostAndFoundItem = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user, url } = useContext(AuthContext);

  const { id } = useParams();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["details"],
    queryFn: async () =>
      await axios
        .get(`${url}getItem/${id}`, { withCredentials: true })
        .then((res) => res.data),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("my-form");
    const formData = new FormData(form);
    const updateItem = {
      postType: formData.get("postType"),
      thumbnail: formData.get("thumbnail"),
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      location: formData.get("location"),
      date: startDate.toLocaleDateString("en-US"),
      recovered: data.recovered,
      contactInformation: {
        displayName: user.displayName,
        email: user.email,
      },
    };

    axios
      .put(`${url}updateItems/${id}`, updateItem, {
        withCredentials: true,
      })
      .then((res) => {
        setStartDate(new Date());
        form.reset();
        if (res.data.acknowledged) {
          toast.success("Updated Successfully");
          refetch();
        } else {
          toast.error("Failed to Update");
        }
      });
  };

  if (isPending) return <Loading></Loading>;

  if (error) toast.error(error.message);

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-1.5 p-0 mx-auto">
      <form id="my-form" className="card-body" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="fieldset-label">Post Type</label>
          <select defaultValue={data.postType} className="select" name="postType">
            <option disabled={true} selected={true}>
              Select Post Type
            </option>
            <option value="Found">Found</option>
            <option value="Lost">Lost</option>
          </select>
          <figure className="px-10 pt-10">
            <img
              src={data.thumbnail}
              alt="Shoes"
              className="rounded-xl w-full h-[250px]"
            />
          </figure>
          <label className="fieldset-label">Thumbnail</label>
          <input
            type="text"
            className="input"
            placeholder="URL"
            name="thumbnail"
            defaultValue={data.thumbnail}
          />
          <label className="fieldset-label">Title</label>
          <input
            type="text"
            className="input"
            placeholder="Title"
            name="title"
            defaultValue={data.title}
          />
          <label className="fieldset-label">Description</label>
          <textarea
            className="textarea h-24 resize-none"
            placeholder="Description"
            name="description"
            defaultValue={data.description}
          ></textarea>
          <label className="fieldset-label">Category</label>
          <select
            className="select"
            name="category"
            defaultValue={data.category}
          >
            <option disabled={true} selected={true}>
              Select Category
            </option>
            <option value="Pets">Pets</option>
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Others">Others</option>
          </select>

          <label className="fieldset-label">Location</label>
          <input
            type="text"
            className="input"
            placeholder="Location"
            name="location"
            defaultValue={data.location}
          />
          <label className="fieldset-label">Date</label>
          <DatePicker
            showIcon
            placeholderText="Select Date"
            className="border-2 border-gray-200"
            selected={data.date}
            onChange={(date) => setStartDate(date)}
          ></DatePicker>
          <button className="btn btn-neutral mt-4">Update</button>
        </fieldset>
      </form>
    </div>
  );
};

export default EditLostAndFoundItem;
