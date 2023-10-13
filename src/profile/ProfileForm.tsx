import { useContext, useState } from "react";
import { UserContext } from "../contexts";
import ShareBnbApi from "../api/api";
import { ProfileFormInterface } from "../interfaces";
import Alert from "../common/Alert";



function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser?.username,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email
    });
    const [formErrors, setFormErrors] = useState<string[] | string>([]);
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
            firstName: formData.firstName!,
            lastName: formData.lastName!,
            email: formData.email!,
        };

        const username = formData.username!;
        let updatedUser: any;

        try {
            updatedUser = await ShareBnbApi.saveProfile(username, profileData);
        } catch (error) {
            setFormErrors(error);
        }
        updatedUser!.listings = currentUser?.listings;
        updatedUser!.bookings = currentUser?.bookings;

        setFormData(fData => ({ ...fData }));
        setFormErrors([]);
        setIsSaved(true);
        setCurrentUser!(currentUser => ({
            ...currentUser,
            data: updatedUser,
        }));
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        disabled
                        placeholder={formData.username} />
                </div>
                <div>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email address</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                {formErrors.length > 0 && <Alert errors={formErrors} />}
                {isSaved && "Updated successfully"}
                <div>
                    <button>Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;
