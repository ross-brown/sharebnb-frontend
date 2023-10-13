import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesList from './RoutesList';
import { useState, useEffect } from 'react';
import { CurrentUserInterface, LoginFormInterface, SignupFormInterface } from './interfaces';
import ShareBnbApi from './api/api';
import Navbar from './Navbar';
import { UserContext, SearchContext } from './contexts';
import decode from "jwt-decode";
import Loading from './common/Loading';


/** ShareBnB application
 *
 * State:
 * - currentUser: user obj from API to tell if logged in or not
 * - token: JWT token for authenticated users
 * - searchTerm: search term from the nav bar
 * - bookings: for the current user, this is their current bookings
 *
 * App -> { RoutesList, Navbar }
 */

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserInterface>({
    data: null,
    isLoaded: false
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem("sharebnb-token"));
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(new Set<string>([]));

  useEffect(function fetchUserInfo() {
    async function getUser() {
      if (token) {
        try {
          const { username } = decode<{ username: string; }>(token);
          ShareBnbApi.token = token;
          const currentUser = await ShareBnbApi.getCurrentUser(username);

          setCurrentUser({ data: currentUser, isLoaded: true });
          setBookings(new Set(currentUser.bookings.map(b => b.id)));
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
      ? localStorage.setItem("sharebnb-token", token)
      : localStorage.removeItem("sharebnb-token");
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

  function hasBookedListing(id: string) {
    return bookings.has(id);
  }

  function bookListing(id: string) {
    if (hasBookedListing(id)) return;
    ShareBnbApi.bookAListing(id);
    setBookings(new Set([...bookings, id]));
  }

  function cancelBooking(id: string) {
    if (!hasBookedListing(id)) return;
    ShareBnbApi.cancelBooking(id);
    setBookings(bookings => new Set([...bookings].filter(i => i !== id)));
  }

  if (!currentUser.isLoaded) return <Loading />;

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{
          currentUser: currentUser.data,
          setCurrentUser,
          hasBookedListing,
          bookListing,
          cancelBooking
        }}>
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
