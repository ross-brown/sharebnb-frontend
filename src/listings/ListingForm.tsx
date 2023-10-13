import { useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingFormInterface } from "../interfaces";
import { useNavigate } from "react-router-dom";




function ListingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ListingFormInterface>({
    title: "",
    type: "",
    description: "",
    price: "",
    location: ""
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<[] | string>([]);


  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    console.log("evt.target.file IS:", evt.target.files);

    if (!evt.target.files) {
      setPhoto(null);
    } else {
      setPhoto(evt.target.files[0]);
    }
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;

    setFormData(fData => ({ ...fData, [name]: value }));
  }


  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const listingData = new FormData();

    if (photo) {
      listingData.append("photo", photo);
    }

    for (const key in formData) {
      listingData.append(key, formData[key as keyof ListingFormInterface]);
    }

    try {
      await ShareBnbApi.createListing(listingData);
      navigate("/");
    } catch (error) {
      console.error("error creating listing", error[0].message);
      setFormErrors(error[0].message);
    }
  }


  return (
    <div className="min-h-screen bg-[url('https://picsum.photos/id/434/2000/1333')] p-20 bg-bottom">
      <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4 font-bold text-neutral-800 text-center">ShareB&B your space</h2>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Title </label>
          <input
            required
            name="title"
            onChange={handleChange}
            value={formData.title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Type</label>
          <input
            required
            name="type"
            onChange={handleChange}
            value={formData.type}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Description </label>
          <input
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Price </label>
          <input
            required
            name="price"
            onChange={handleChange}
            value={formData.price}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Location </label>
          <input
            required
            name="location"
            onChange={handleChange}
            value={formData.location}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Photo </label>
          <input
            id="file"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="focus:ring focus:ring-green-500 focus:ring-opacity-50 appearance-none block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        {formErrors.length > 0 && "NO PHOTO"}
        <button className="mx-auto mt-12 block px-5 py-3 rounded-lg
                        bg-green-600 hover:bg-green-500 focus:outline-none
                        focus:ring focus:ring-offset-2 focus:ring-green-400
                        focus:ring-opacity-50 active:bg-green-700
                        text-white shadow-lg uppercase tracking-wider
                        font-semibold text-sm sm:text-base">Submit</button>
      </form>
    </div>
  );
}


export default ListingForm;
