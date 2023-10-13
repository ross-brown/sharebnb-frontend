

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

interface MessageFormInterface {
  recipient: string;
  body: string;
}

interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bookings: UserListingsAndBookingsInterface[];
  listings: UserListingsAndBookingsInterface[];
}

interface UserListingsAndBookingsInterface {
  id: string;
  title: string;
  price: string;
  photoUrl: string;
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
  photoUrl: string;
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
  LoginFormInterface, SignupFormInterface, MessageFormInterface,
  ProfileFormInterface, ListingFormInterface, UserInterface,
  BookingInterface, ListingInterface, CurrentUserInterface, MessageInterface,
  UserListingsAndBookingsInterface
};
