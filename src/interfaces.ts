

interface LoginFormInterface {
  username: string;
  password: string;
}

interface SignupFormInterface extends LoginFormInterface {
  firstName: string;
  lastName: string;
  email: string;
}

interface ProfileFormInterface {
  firstName: string;
  lastName: string;
  email: string;
}

interface ListingFormInterface {
  title: string;
  type: string;
  price: string;
  description: string;
  location: string;
}

interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  booking?: BookingInterface[];
  listings?: ListingInterface[];
}

interface BookingInterface {
  username: string;
  listingId: string;
}

interface ListingInterface {
  id: string;
  title: string;
  type: string;
  price: number | string;
  description: string;
  location: string;
  photoUrl?: string;
  ownerUsername: string;
}


interface CurrentUserInterface {
  isLoaded: boolean;
  data: UserInterface | null;
}

interface MessageInterface {
  id: string;
  sender: string;
  recipient: string;
  body: string;
  sentAt: string;
}

export type {
  LoginFormInterface, SignupFormInterface,
  ProfileFormInterface, ListingFormInterface, UserInterface,
   BookingInterface, ListingInterface, CurrentUserInterface, MessageInterface
};
