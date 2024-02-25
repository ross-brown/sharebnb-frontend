
# ShareBnB Frontend

A web application for sharing outdoor spaces with others. Authenticated users may create listings so that other users may book them.

Demo: https://rbrown-sharebnb.netlify.app

Link to backend repo: https://github.com/ross-brown/sharebnb-backend
## Tech Stack
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![React_Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)



## Features
- User authentication
- View/search for listings, even without an account
- Upload photo when creating a new listing using AWS S3
- Can "book" a listing when logged in
- Message other users on the platform

## Run Locally

Go to the project directory after cloning the repo

```bash
cd sharebnb-frontend
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```


## Future Features

- Write tests
- Delete and Edit a Listing ✅
- Available table in DB, book a listing for certain dates
    -  Possibily add a calender date-picker
- Refactor TypeScript interfaces / common CSS classes


## Authors

- [Ross Brown](https://www.github.com/ross-brown)
- [Chris Alley](https://www.github.com/cp-alley)

