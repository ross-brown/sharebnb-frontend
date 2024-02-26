import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList';
import { useState, useEffect } from 'react';
import { CurrentUserInterface, ListingInterface, LoginFormInterface, SignupFormInterface } from './interfaces';
import ShareBnbApi from './api/api';
import Navbar from './Navbar';
import { UserContext, SearchContext } from './contexts';
import decode from "jwt-decode";
import Loading from './common/Loading';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import { useLocalStorage } from './hooks/useLocalStorage';


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
  const [token, setToken] = useLocalStorage("sharebnb-token", null);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(new Set<string | number>([]));
  const [listings, setListings] = useState<ListingInterface[] | null>(null);

  useEffect(() => {
    async function getUser() {
      if (!token) {
        setCurrentUser({ data: null, isLoaded: true });
        return;
      }

      try {
        const { username } = decode<{ username: string; }>(token);
        ShareBnbApi.token = token;
        const currentUser = await ShareBnbApi.getCurrentUser(username);

        setCurrentUser({ data: currentUser, isLoaded: true });
        setBookings(new Set(currentUser.bookings.map(b => b.id)));
      } catch (error) {
        setCurrentUser({ data: null, isLoaded: true });
      }
    }
    getUser();
  }, [token]);

  useEffect(() => {
    async function fetchListings() {
      const Listings = await ShareBnbApi.getListings(searchTerm);
      setListings(Listings);
    }
    fetchListings();
  }, [searchTerm]);

  function addListing(listing: ListingInterface) {
    setListings(list => [...list!, listing]);
  }

  function removeListing(id: string) {
    setListings(list => {
      if (list) return list.filter(listing => listing.id !== +id);
      return list;
    });
  }

  async function login(loginData: LoginFormInterface) {
    const token = await ShareBnbApi.login(loginData);
    setToken(token);
    toast.success(`Welcome back!`);
  }

  async function signup(signupData: SignupFormInterface) {
    const token = await ShareBnbApi.signup(signupData);
    setToken(token);
    toast.success("Account successfully created!");
  }

  function logout() {
    setCurrentUser({ data: null, isLoaded: true });
    setToken(null);
    toast.success("Successfully logged out");
  }

  function hasBookedListing(id: string | number): boolean {
    return bookings.has(id);
  }

  async function bookListing(id: string | number): Promise<void> {
    if (hasBookedListing(id)) return;
    await ShareBnbApi.bookAListing(id);
    setBookings(new Set([...bookings, id]));
  }

  async function cancelBooking(id: string | number): Promise<void> {
    if (!hasBookedListing(id)) return;
    await ShareBnbApi.cancelBooking(id);
    setBookings(bookings => new Set([...bookings].filter(i => i !== id)));
  }

  if (!currentUser.isLoaded) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <UserContext.Provider value={{
          currentUser: currentUser.data,
          setCurrentUser,
          hasBookedListing,
          bookListing,
          cancelBooking,
          logout
        }}>
          <SearchContext.Provider value={searchTerm}>
            <Toaster
              position='top-center'
              toastOptions={{
                style: {
                  fontWeight: "bold",
                  textAlign: "center"
                },
                success: {
                  duration: 4000,
                }
              }}
            />
            <Navbar logout={logout} search={setSearchTerm} />
            <main className='flex-1'>
              <RoutesList login={login} signup={signup} addListing={addListing} removeListing={removeListing} listings={listings} />
            </main>
            <Footer />
          </SearchContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
