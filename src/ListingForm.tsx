import { useState } from "react";
import ShareBnbApi from "./api/api";





function ListingForm() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    location: ""
  });
  const [photo, setPhoto] = useState<File | null>(null);

  
  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    console.log("evt.target.file IS:", evt.target.files);

    if (!evt.target.files) return;
    setPhoto(evt.target.files[0]);
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;

    setFormData(fData => ({ ...fData, [name]: value }));
  }


  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    const listingData = new FormData();
    listingData.append("photo", photo);
    listingData.append("title", formData.title);
    listingData.append("type", formData.type);
    listingData.append("location", formData.location);
    listingData.append("price", formData.price);
    listingData.append("description", formData.description);

    const newListingData = await ShareBnbApi.createListing(listingData);
    console.log("value from api to create listing", newListingData);
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
      <button>Submit</button>
    </form>
  );
}


export default ListingForm;
