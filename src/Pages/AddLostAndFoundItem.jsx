import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const AddLostAndFoundItem = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user, url } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("my-form");
    const formData = new FormData(form);
    const data = {
      postType: formData.get("postType"),
      thumbnail: formData.get("thumbnail"),
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      location: formData.get("location"),
      date: startDate.toLocaleDateString("en-US"),
      recovered: false,
      contactInformation: {
        displayName: user.displayName,
        email: user.email,
      },
    };

    if (
      !formData.has("postType") ||
      !formData.has("thumbnail") ||
      !formData.has("title") ||
      !formData.has("description") ||
      !formData.has("category") ||
      !formData.has("location")
    ) {
      toast.error("Please fill the form!");
    } else {
      axios
        .post(url+"addItems", data, { withCredentials: true })
        .then((res) => {
          setStartDate(new Date());
          form.reset();
          if (res.data.acknowledged) {
            toast.success("Added Successfully");
          } else {
            toast.error("Failed");
          }
        });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-1.5 p-0 mx-auto">
      <form id="my-form" className="card-body" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="fieldset-label">Post Type</label>
          <select
            defaultValue="Select Post Type"
            className="select"
            name="postType"
          >
            <option disabled={true} selected={true}>
              Select Post Type
            </option>
            <option value="Found">Found</option>
            <option value="Lost">Lost</option>
          </select>
          <label className="fieldset-label">Thumbnail</label>
          <input
            type="text"
            className="input"
            placeholder="URL"
            name="thumbnail"
          />
          <label className="fieldset-label">Title</label>
          <input
            type="text"
            className="input"
            placeholder="Title"
            name="title"
          />
          <label className="fieldset-label">Description</label>
          <textarea
            className="textarea h-24 resize-none"
            placeholder="Description"
            name="description"
          ></textarea>
          <label className="fieldset-label">Category</label>
          <select
            defaultValue="Select Category"
            className="select"
            name="category"
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
          />
          <label className="fieldset-label">Date</label>
          <DatePicker
            showIcon
            placeholderText="Select Date"
            className="border-2 border-gray-200"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          ></DatePicker>
          <button className="btn btn-neutral mt-4">Add</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLostAndFoundItem;
