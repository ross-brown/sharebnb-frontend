import { ListingInterface } from "../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ShareBnbApi from "../api/api";
import Button from "../common/Button";

interface ListingEditFormProps {
  listingData: ListingInterface;
  onClose: () => void;
}

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp'
// ];

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  type: z.string(),
  price: z.coerce.string(),
  photoUrl: z.instanceof(FileList) //TODO: optional???
});

type FormFields = z.infer<typeof formSchema>;

function ListingEditForm({ listingData, onClose }: ListingEditFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: listingData.title,
      description: listingData.description,
      location: listingData.location,
      type: listingData.type,
      price: listingData.price as string,
    }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    for (const field in data) {
      const currentField = data[field as keyof FormFields];

      if (typeof currentField !== 'object') {
        formData.append(field, currentField);
      }
    }

    if (data.photoUrl[0]) formData.append("photo", data.photoUrl[0]);
    try {
      await ShareBnbApi.updateListing(listingData.id, formData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating listing", error);
    }
  };

  return (
    <form className="border-2 max-w-2xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl mb-4 font-bold text-neutral-800 text-center">Edit Your Listing</h2>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Title </label>
        <input
          required
          {...register("title")}
          name="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Type</label>
        <input
          required
          {...register("type")}
          name="type"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Description </label>
        <textarea
          rows={8}
          {...register("description")}
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Price </label>
        <input
          required
          {...register("price")}
          name="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">Location </label>
        <input
          required
          {...register("location")}
          name="location"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="file">New Photo - optional </label>
        <input
          id="file"
          type="file"
          {...register("photoUrl")}
          name="photoUrl"
          accept="image/*"
          className="focus:ring focus:ring-green-500 focus:ring-opacity-50 appearance-none block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
      </div>
      {errors && <div>{errors.photoUrl?.message}</div>}
      <div className="flex justify-center">
        <Button color="green">Save Changes</Button>
      </div>
    </form>
  );
}

export default ListingEditForm;
