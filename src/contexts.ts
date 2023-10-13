import { createContext } from "react";
import { CurrentUserInterface, UserInterface } from "./interfaces";


interface UserContextInterface {
  currentUser: UserInterface | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserInterface>> | null;
  hasBookedListing: ((id: string) => boolean) | null;
  bookListing: ((id: string) => void) | null;
  cancelBooking: ((id: string) => void) | null;
}


const UserContext = createContext<UserContextInterface>({
  currentUser: null,
  setCurrentUser: null,
  hasBookedListing: null,
  bookListing: null,
  cancelBooking: null
});
const SearchContext = createContext("");
export { UserContext, SearchContext };
