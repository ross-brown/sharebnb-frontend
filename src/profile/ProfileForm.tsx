import { useState } from "react";
import { useCurrentUser } from "../contexts";
import ShareBnbApi from "../api/api";
import { ProfileFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";


function ProfileForm() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [formData, setFormData] = useState({
        username: currentUser?.username,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email
    });
    const [formErrors, setFormErrors] = useState<string[][] | string[]>([]);
    const [isSaved, setIsSaved] = useState(false);

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;

        setFormData(fData => ({
            ...fData, [name]: value
        }));
    }

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        const profileData: ProfileFormInterface = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        const username = formData.username!;
        let updatedUser: any;

        try {
            updatedUser = await ShareBnbApi.saveProfile(username, profileData);
            setCurrentUser(currentUser => ({
                ...currentUser,
                data: {
                    ...currentUser.data,
                    ...updatedUser
                },
            }));
            setFormData(fData => ({ ...fData }));
            setFormErrors([]);
            setIsSaved(true);
        } catch (errors) {
            const messages = getErrorMsg(errors);
            setFormErrors(messages);
        }
    }

    return (
        <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-xl mb-4 font-bold text-neutral-800 text-center">Edit your profile</h2>
            <div className="mb-4">
                <label className="block text-neutral-700 text-sm font-bold mb-2">Username</label>
                <input
                    disabled
                    placeholder={formData.username}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label className="block text-neutral-700 text-sm font-bold mb-2">First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-neutral-700 text-sm font-bold mb-2">Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-neutral-700 text-sm font-bold mb-2">Email address</label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
                />
            </div>
            {formErrors.length > 0 && <Alert errors={formErrors} />}
            {isSaved && "Updated successfully"}
            <div className="mb-4">
                <button className="mx-auto mt-12 block px-5 py-3 rounded-lg
                        bg-green-600 hover:bg-green-500 focus:outline-none
                        focus:ring focus:ring-offset-2 focus:ring-green-400
                        focus:ring-opacity-50 active:bg-green-700
                        text-white shadow-lg uppercase tracking-wider
                        font-semibold text-sm sm:text-base">Save Changes</button>
            </div>
        </form>
    );
}

export default ProfileForm;
