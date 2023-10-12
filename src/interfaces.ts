

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



export type {
  LoginFormInterface, SignupFormInterface,
  ProfileFormInterface, ListingFormInterface
};
