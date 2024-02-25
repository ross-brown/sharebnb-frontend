import { useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { getErrorMsg } from "../utils";
import Button from "../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ListingFormProps {
  addListing: (data: ListingInterface) => void;
}

const formSchema = z.object({
  title: z.string(),
  type: z.string(),
  description: z.string(),
  price: z.coerce.string(),
  location: z.string(),
  photoUrl: z.instanceof(FileList)
});

type FormFields = z.infer<typeof formSchema>;

function ListingForm({ addListing }: ListingFormProps) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isValid } } = useForm<FormFields>({
    resolver: zodResolver(formSchema)
  });

  const [formErrors, setFormErrors] = useState<string[] | string>([]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const listingData = new FormData();

    for (const field in data) {
      const currentField = data[field as keyof FormFields];

      if (typeof currentField !== 'object') {
        listingData.append(field, currentField);
      }
    }

    if (data.photoUrl[0]) listingData.append("photo", data.photoUrl[0]);

    try {
      const newListing = await ShareBnbApi.createListing(listingData);
      addListing(newListing);
      navigate("/");
    } catch (errors) {
      const messages = getErrorMsg(errors);
      console.error("error creating listing", messages);
      setFormErrors(messages);
    }
  };


  return (
    <div className="min-h-screen bg-[url('https://picsum.photos/id/434/2000/1333')] p-20 bg-bottom">
      <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-800">
          ShareB&B your space
        </h2>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="file">Title </label>
          <div className="mt-2">
            <input
              required
              {...register("title")}
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="file">Type</label>
          <div className="mt-2">
            <input
              required
              {...register("type")}
              name="type"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="file">Description </label>
          <div className="mt-2">
            <textarea
              {...register("description")}
              rows={4}
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="file">Price </label>
          <div className="mt-2">
            <input
              required
              {...register("price")}
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="file">Location </label>
          <div className="mt-2">
            <input
              required
              {...register("location")}
              name="location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="file">Photo </label>
          <div className="mt-2">
            <input
              id="file"
              type="file"
              {...register("photoUrl")}
              name="photoUrl"
              accept="image/*"
              className="focus:ring focus:ring-green-500 focus:ring-opacity-50 appearance-none block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        </div>
        {formErrors.length > 0 && "NO PHOTO"}
        <div className="flex justify-center">
          <Button
            color="green"
            disabled={!isValid}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}


export default ListingForm;
