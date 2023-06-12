# Videohub

An application that stores videos through links with the possibility of watching through the built-in player.

## Table of Contents

[Features](#Features)  
[Technologies](#Technologies)  
[Installation](#Installation)  
[Screenshots](#Screenshots)

## Features

- Watch video through player
- Watch video through other players (redirect)
- Add videos by entering a name link and a photo link
- Real-time searching videos from database
- Responsive layout
- Maintaining UI/UX rules, Simple to use

## Technologies

- Frontend

  - HTML, CSS, Type Script
  - React (Hooks, Router)
  - MUI React

- Backend

  - Firebase

- NPM's
  - react 18.2.0
  - typescript 4.9.5
  - react-router-dom 6.11.2
  - react-player 2.12.0
  - @mui/material 5.11.16
  - @mui/icons-material 5.13.3
  - firebase 9.22.1

## Installation

#### 1. Install [Node.js](https://nodejs.org/en/) and [GIT](https://git-scm.com/)

#### 2. Clone the repo

#### 3. Create a Firestore Database in [Firebase](https://firebase.google.com/)

#### 4. Create a **firebaseConfig.ts** api file with your Firebase settings and put it in ./src

example src/firebaseConfig.ts

```bash
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
```

#### 5. Enter the client directory and type

```bash
npm install
```

#### 6. Start the application

```bash
npm start
```

### Screenshots

#### Main page

![main_page](https://i.postimg.cc/JzfTNpwd/Screenshot-1.jpg)

#### Player

![player](https://i.postimg.cc/nzZ05Mh4/Screenshot-2.jpg)

#### Add video to database

![add_video](https://i.postimg.cc/Pq1S21Tf/Screenshot-3.jpg)

## To see the application placed on the Azure server, contact me via e-mail

```
contact@bartekgrzesik.pl
```
