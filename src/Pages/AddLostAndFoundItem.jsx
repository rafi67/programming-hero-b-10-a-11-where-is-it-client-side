import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLostAndFoundItem = () => {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-1.5 p-0 mx-auto">
      <form className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Post Type</label>
          <select defaultValue="Select Post Type" className="select" name="postType">
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
          <fieldset className="fieldset">
            <label className="fieldset-label">Description</label>
            <textarea
              className="textarea h-24 resize-none"
              placeholder="Description"
              name="description"
            ></textarea>
          </fieldset>
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
          </select>
          <label className="fieldset-label">Location</label>
          <input
            type="text"
            className="input"
            placeholder="Location"
            name="location"
          />
          <label className="fieldset-label">Date Lost Or Found</label>
          <DatePicker showIcon placeholderText="Select Date" className="input" selected={startDate} onChange={(date) => setStartDate(date)}></DatePicker>
          <label className="fieldset-label">Contact Information</label>
          <input
            type="text"
            className="input"
            placeholder="Name"
            name="displayName"
            readOnly
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            readOnly
          />
          <button className="btn btn-neutral mt-4">Add</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLostAndFoundItem;
