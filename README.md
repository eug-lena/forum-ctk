# Running the program

## Prerequisites

- [MongoDB](https://www.mongodb.com/) (this project was done using MongoDB version v7.0.0)
- [NodeJS & npm](https://nodejs.org/en/) (this project was done using Node version v18.17.1)

## server

0. Open the terminal in the project directory
1. `cd server`
2. `npm install`
3. `npm run dev`

## client

0. Open the terminal in the project directory
1. `cd client`
2. `npm install`
3. `npm run serve`

The website can be viewed on a web browser with the URL `http://localhost:8080/`

# Time spent

The total time spent on this project is approximately 8 hours.

# Project description

## Frontend

- All pages & components can be found under `client/src`
- The navigation bar is located in `App.vue`
- All API calls from the frontend are handled in `Api.js`

This project resembles a forum-like application, which displays all posts created by its users. They are displayed on the home screen and can be sorted by their title, in ascending (a-z) or descending (z-a) alphabetical order. There is also a possibility for users to filter the posts by searching for a specific topic, which allows them to read only what they are interested in.
The posts are by default sorted by ascending date.

The application allows the users to create new posts by writing a short title, selecting a topic, and expressing their thoughts in a text field. This is done via the `Create a post!` button in the navigation bar.

Then, by clicking `More...` on a specific post, they are taken to a new page, which displays all the comments for the corresponding post. The users can then add a comment by clicking the `Add comment` button, which displays a drop-down-like segment, where they can write their comment and `Submit` it. The comments are sorted by ascending date.

## Backend

- All backend endpoints and the postman tests are located in `server` & `server/tests`
- The controllers & models can be found in their respective folders.

The tests can be run locally by doing:

1. `cd server`
2. `npm test`

Note: these steps need to be followed *after* [setting up the program](#running-the-program).

Otherwise, the `forumDB.postman_collection.json` file can be imported into Postman and run there.
