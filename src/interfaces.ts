

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
  // type: string;
  photo: File;
  // price: number | string;
  // description: string;
  // location: string;
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

export type {
  LoginFormInterface, SignupFormInterface,
  ProfileFormInterface, ListingFormInterface, UserInterface, BookingInterface, ListingInterface
};
