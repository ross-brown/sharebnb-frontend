import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesList from './RoutesList';
import { useState, useEffect } from 'react';
import { CurrentUserInterface, LoginFormInterface, SignupFormInterface } from './interfaces';
import ShareBnbApi from './api/api';
import Navbar from './Navbar';
import { UserContext, SearchContext } from './contexts';
import decode from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserInterface>({
    data: null,
    isLoaded: false
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function fetchUserInfo() {
    async function getUser() {
      if (token) {
        try {
          const { username } = decode<{ username: string; }>(token);
          ShareBnbApi.token = token;
          const currentUser = await ShareBnbApi.getCurrentUser(username);

          setCurrentUser({ data: currentUser, isLoaded: true });
        } catch (error) {
          setCurrentUser({ data: null, isLoaded: true });
        }
      } else {
        setCurrentUser({ data: null, isLoaded: true });
      }
    }
    getUser();
  }, [token]);

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);


  async function login(loginData: LoginFormInterface) {
    const token = await ShareBnbApi.login(loginData);
    setToken(token);
  }

  async function signup(signupData: SignupFormInterface) {
    const token = await ShareBnbApi.signup(signupData);
    setToken(token);
  }

  async function logout() {
    setCurrentUser({ data: null, isLoaded: true });
    setToken(null);
  }

  return (
    <div>
      <h1>ShareBnB</h1>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: currentUser.data, setCurrentUser }}>
          <SearchContext.Provider value={searchTerm}>
            <Navbar logout={logout} search={setSearchTerm} />
            <RoutesList login={login} signup={signup} />
          </SearchContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div >
  );
}

export default App;
