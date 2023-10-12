import { createContext } from "react";
import { CurrentUserInterface, UserInterface } from "./interfaces";


interface UserContextInterface {
  currentUser: UserInterface | null;
  setCurrentUser: ((data: CurrentUserInterface) => void) | null
}


const UserContext = createContext<UserContextInterface>({currentUser: null, setCurrentUser: null});
const SearchContext = createContext("")
export {UserContext, SearchContext};
