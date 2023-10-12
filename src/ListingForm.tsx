import { useState } from "react";
import ShareBnbApi from "./api/api";
import { ListingFormInterface } from "./interfaces";
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
      setFormErrors(error[0].message)
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">Photo: </label>
      <input
        id="file"
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange} />
      <label htmlFor="file">Title: </label>
      <input
        name="title"
        onChange={handleChange}
        value={formData.title} />
      <label htmlFor="file">Type: </label>
      <input
        name="type"
        onChange={handleChange}
        value={formData.type} />
      <label htmlFor="file">Description: </label>
      <input
        name="description"
        onChange={handleChange}
        value={formData.description} />
      <label htmlFor="file">Price: </label>
      <input
        name="price"
        onChange={handleChange}
        value={formData.price} />
      <label htmlFor="file">Location: </label>
      <input
        name="location"
        onChange={handleChange}
        value={formData.location} />
        {formErrors.length > 0 && "NO PHOTO"}
      <button>Submit</button>
    </form>
  );
}


export default ListingForm;
