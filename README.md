

## DineEase
DineEase is a versatile platform for browsing, liking, and requesting meals. It offers comprehensive admin tools for managing meals, tracking requests, and handling reviews. With secure authentication, detailed payment records, and responsive design, DineEase ensures a seamless experience for users and administrators alike.

## Live site url
https://hostel-management-30afb.web.app/

## Server site repo

https://github.com/strongfornt/DineEase-Server

## Admin idp
- email: admin@gmail.com
- pass: Adminn

## Key Features

 - Displays upcoming meals: only premium users can like meals.
 - Admin Meal Management: Add, update meal statuses, and manage requests.
 - Payment History: Displays payment history with relevant messages.

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Express,JWT
- Database: MongoDB
- Authentication: Firebase



## Running the Project Locally

1- Clone the cleint site repo repository:
- git clone https://github.com/strongfornt/dineEase-Client
- cd dine-ease
- npm i
2- Set up Firebase for authentication and paste your own credential in firebase.config file.

3- Clone the server site repo repository:
 - git clone https://github.com/strongfornt/TipTrove-server
 - set up dependencies : npm i
 - Set up MongoDB
 - Set up MongoDB Atlas or run a local instance.
 - Add your MongoDB connection URI located in index file

- npm run dev in client site  then Open your browser and navigate to http://localhost: port
- if you want run server as well then write this command in terminal  nodemon index.js , and paste the port in browser
