import { useCurrentUser } from "../contexts";
import ShareBnbApi from "../api/api";
import { ProfileFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";
import { Spinner } from "../common/Spinner";
import Button from "../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    username: z.string(),
    firstName: z.string().max(30, { message: "Must be fewer than 30 characters" }),
    lastName: z.string().max(30, { message: "Must be fewer than 30 characters" }),
    email: z.string().email({ message: "Invalid email address" })
});

type FormFields = z.infer<typeof formSchema>;

function ProfileForm() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const { register, handleSubmit, formState: { isSubmitting, isSubmitted, isValid, errors } } = useForm<FormFields>({
        defaultValues: {
            username: currentUser?.username,
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            email: currentUser?.email
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<FormFields> = async ({ username, firstName, lastName, email }) => {
        const profileData: ProfileFormInterface = {
            firstName,
            lastName,
            email,
        };

        try {
            const updatedUser = await ShareBnbApi.saveProfile(username, profileData);
            setCurrentUser(currentUser => ({
                ...currentUser,
                data: {
                    ...currentUser.data,
                    ...updatedUser
                },
            }));
        } catch (errors) {
            const messages = getErrorMsg(errors);
            console.error(messages);
        }
    };

    return (
        <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg my-8" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-800">
                Edit your profile
            </h2>
            <div className="mb-4">
                <label className="block text-sm text-neutral-900 font-medium leading-6">
                    Username
                </label>
                <div className="mt-2">
                    <input
                        disabled
                        placeholder={currentUser?.username}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm text-neutral-900 font-medium leading-6">
                    First Name
                </label>
                <div className="mt-2">
                    <input
                        {...register("firstName")}
                        name="firstName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm text-neutral-900 font-medium leading-6">
                    Last Name
                </label>
                <div className="mt-2">
                    <input
                        {...register("lastName")}
                        name="lastName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm text-neutral-900 font-medium leading-6">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        {...register("email")}
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                    />
                </div>
            </div>
            <div className="flex justify-start">
                <Button color="green" disabled={isSubmitting} >
                    Save
                </Button>
            </div>
            {isSubmitting &&
                <div className="flex justify-center m-6 font-semibold text-xl">
                    <div role="status">
                        <Spinner size="lg" />
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {Object.entries(errors).map(([field, error]) => (
                <Alert key={field} messages={error.message ? [error?.message] : []} />
            ))}
            {(isSubmitted && isValid) && <Alert type="success" messages={["Updated successfully"]} />}
            {/* TODO: this doesn't exactly work the way i want...  */}
        </form>
    );
}

export default ProfileForm;
