import { createContext } from "react";
import { CurrentUserInterface, UserInterface } from "./interfaces";


interface UserContextInterface {
  currentUser: UserInterface | null;
  setCurrentUser: (data: CurrentUserInterface) => void;
}


const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
