const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";
import {
  LoginFormInterface, MessageInterface,
  SignupFormInterface, ProfileFormInterface, UserInterface, ListingInterface, BookingInterface
} from "../interfaces";


//TODO: create a message, get a message by id, get a user's message(sent, received)
class ShareBnbApi {
  // the token for interactive with the API will be stored here.
  //TODO: remove hard code at some point....
  static token: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiaWF0IjoxNjk3MDQ3Njg5fQ.wGEFkpIXDZUSW6c_nR7GOUsnyXIL7axNB2NdFacOmI4`;

  static async request(endpoint: string, data = {}, method = "GET"): Promise<any> {
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
    console.log("fetch request resp=", resp);

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  /** Makes a request using multipart/form-data */
  static async multipartRequest(endpoint: string, data: FormData, method: "POST" | "PATCH"): Promise<any> {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${ShareBnbApi.token}`,
    };

    const body = data;

    const resp = await fetch(url, { method, headers, body });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  //Each API Route

  /** Get the current user. */
  static async getCurrentUser(username: string): Promise<UserInterface> {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get listings (filtered by title if not undefined) */
  static async getListings(title: string | undefined): Promise<ListingInterface[]> {
    let res;
    title === ""
      ? res = await this.request("listings")
      : res = await this.request("listings", { title });
    // const res = await this.request(`listings`, { title });
    console.log("get listings res=", res);
    return res.listings;
  }

  /** Get details on a specifc listing by id */
  static async getListing(id: number | string): Promise<ListingInterface> {
    const res = await this.request(`listings/${id}`);
    return res.listing;
  }

  /** Create a new lisitng */
  static async createListing(data: FormData): Promise<ListingInterface> {
    const res = await this.multipartRequest(`listings`, data, "POST");
    return res.listing;
  }

  /** Update a listing */
  static async updateListing(id: number | string, data: FormData): Promise<ListingInterface> {
    const res = await this.multipartRequest(`listings/${id}`, data, "PATCH");
    return res.listing;
  }

  /** Delete a listing */
  static async deleteListing(id: number | string): Promise<typeof id> {
    const res = await this.request(`listings/${id}`, {}, "DELETE");
    return res.deleted;
  }

  /** Book a listing */
  static async bookAListing(id: number | string): Promise<BookingInterface> {
    const res = await this.request(`listings/${id}/book`, {}, "POST");
    return res.booking;
  }

  /** Cancel a booking */
  static async cancelBooking(id: number | string): Promise<typeof id> {
    const res = await this.request(`listings/${id}/book`, {}, "DELETE");
    return res.cancelled;
  }

  /** Get token for login from username, password */
  static async login(data: LoginFormInterface): Promise<string> {
    const res = await this.request(`auth/token`, data, "POST");
    return res.token;
  }

  /** Get token after signing up with form data */
  static async signup(data: SignupFormInterface): Promise<string> {
    const res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Save user profile with form data */
  static async saveProfile(username: string, data: ProfileFormInterface): Promise<Partial<UserInterface>> {
    const res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }

  /** Get user's sent messages */
  static async getSentMsgs(username: string): Promise<MessageInterface[]> {
    const res = await this.request(`users/${username}/sent`)
    return res.messages;
  }

  /** Get user's received messages */
  static async getRecvdMsgs(username: string): Promise<MessageInterface[]> {
    const res = await this.request(`users/${username}/inbox`)
    return res.messages;
  }

}



export default ShareBnbApi;
