import axios from "axios";
import DatePicker from "react-datepicker";
import { useParams } from "react-router";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["details"],
    queryFn: async () =>
      await axios
        .get(`http://localhost:5000/getItem/${id}`, { withCredentials: true })
        .then((res) => res.data),
  });

  const handleSubmit = () => {
    if (data.recovered === true) {
      toast.warning("Already added to recovered item");
      return;
    }
    data.recovered = true;
    axios
      .put(`http://localhost:5000/statusUpdate/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const recoveredItem = {
            itemID: data._id,
            recoveredLocation: data.location,
            date: data.date,
            recoveredPerson: data.contactInformation,
          };

          axios
            .post(`http://localhost:5000/addRecoveredItem`, recoveredItem, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200)
                toast.success("Successfully added to Recovered Item");
              else toast.error("Failed to add to the Recovered Item");
            });
        } else toast.error("Failed to update status");
      });
  };

  if (isPending) {
    return <Loading></Loading>;
  }

  if (error) {
    toast.error(`error from details page ${error.message}`);
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-1.5 p-0 mx-auto">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Post Type</label>
          <select
            value={data.postType}
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
            <option value="Others" disabled={true}>
              Others
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
            value={data.title}
            name="title"
            readOnly
          />
          <fieldset className="fieldset">
            <label className="fieldset-label">Description</label>
            <textarea
              className="textarea h-24 resize-none"
              value={data.description}
              name="description"
            ></textarea>
          </fieldset>
          <fieldset className="fieldset">
            <label className="fieldset-label">Category</label>
            <select
              value={data.category}
              className="select"
              name="category"
              readOnly
            >
              <option disabled={true}>Select Category</option>
              <option value="Pets" disabled={true}>
                Pets
              </option>
              <option value="Documents" disabled={true}>
                Documents
              </option>
              <option value="Gadgets" disabled={true}>
                Gadgets
              </option>
              <option value="Others" disabled={true}>
                Others
              </option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <label className="fieldset-label">Location</label>
            <input
              type="text"
              className="input"
              value={data.location}
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
            value={data.contactInformation.displayName}
            name="displayName"
            readOnly
          />
          <input
            type="email"
            className="input"
            value={data.contactInformation.email}
            name="email"
            readOnly
          />
          {data.postType === "Lost" ? (
            <button
              className="btn btn-neutral mt-4"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Found This!
            </button>
          ) : (
            <button
              className="btn btn-neutral mt-4"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              This is Mine!
            </button>
          )}
        </fieldset>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[20%]">
          <fieldset className="fieldset">
            <label className="fieldset-label">Location</label>
            <input
              type="text"
              className="input"
              value={data.location}
              name="location"
              readOnly
            />
            <label className="fieldset-label">Date Lost Or Found</label>
            <DatePicker
              showIcon
              placeholderText="Select Date"
              selected={data.date}
              readOnly
            ></DatePicker>
            <label className="fieldset-label">Contact Information</label>
            <input
              type="text"
              className="input"
              value={data.contactInformation.displayName}
              name="displayName"
              readOnly
            />
            <input
              type="email"
              className="input"
              value={data.contactInformation.email}
              name="email"
              readOnly
            />
          </fieldset>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn mx-1" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Details;
