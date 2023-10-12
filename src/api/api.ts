const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";
import {
  LoginFormInterface,
  SignupFormInterface, ProfileFormInterface, ListingFormInterface
} from "../interfaces";



class ShareBnbApi {
  // the token for interactive with the API will be stored here.
  //TODO: remove hard code at some point....
  static token: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiaWF0IjoxNjk3MDQ3Njg5fQ.wGEFkpIXDZUSW6c_nR7GOUsnyXIL7axNB2NdFacOmI4`;

  static async request(endpoint: string, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${ShareBnbApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  //TODO: MAKE SEPARATE REQUEST FUNCTION FOR MUTLIPART FORM TYPES
  // remove content-type, DO NOT stringify the body of the request


  //Each API Route

  /** Get the current user. */
  static async getCurrentUser(username: string) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get listings (filtered by title if not undefined) */
  static async getListings(title: string) {
    const res = await this.request(`listings`, { title });
    return res.listings;
  }

  /** Get details on a specifc listing by id */
  static async getListing(id: number | string) {
    const res = await this.request(`listings/${id}`);
    return res.listing;
  }

  static async createListing(data: FormData) {
    const res = await this.request(`listings`, data, "POST");
    return res.listing;
  }

  static async updateListing(id: number | string, data: ListingFormInterface) {
    const res = await this.request(`listings/${id}`, data, "PATCH");
    return res.listing;
  }

  /** Book a listing */
  static async bookAListing(id: number | string) {
    const res = await this.request(`listings/${id}/book`, {}, "POST");
    return res.booking;
  }

  /** Cancel a booking */
  static async cancelBooking(id: number | string) {
    const res = await this.request(`listings/${id}/book`, {}, "DELETE");
    return res.cancelled;
  }

  /** Get token for login from username, password */
  static async login(data: LoginFormInterface) {
    const res = await this.request(`auth/token`, data, "POST");
    return res.token;
  }

  /** Get token after signing up with form data */
  static async signup(data: SignupFormInterface) {
    const res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Save user profile with form data */
  static async saveProfile(username: string, data: ProfileFormInterface) {
    const res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }


}



export default ShareBnbApi;
