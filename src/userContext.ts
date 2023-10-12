import { createContext } from "react";
import { CurrentUserInterface, UserInterface } from "./interfaces";


interface UserContextInterface {
  currentUser: CurrentUserInterface
}


const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
