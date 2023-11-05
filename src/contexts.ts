import { createContext, useContext } from "react";
import { CurrentUserInterface, UserInterface } from "./interfaces";


interface UserContextInterface {
  currentUser: UserInterface | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserInterface>>;
  hasBookedListing: ((id: string) => boolean);
  bookListing: ((id: string) => void);
  cancelBooking: ((id: string) => void);
}


const UserContext = createContext<UserContextInterface | null>(null);

const useCurrentUser = () => {
  const currentUserContext = useContext(UserContext);

  if (!currentUserContext) {
    throw new Error("useCurrentUser must be used within the Provider");
  }

  return currentUserContext;
};



const SearchContext = createContext("");




export { useCurrentUser, SearchContext, UserContext };
