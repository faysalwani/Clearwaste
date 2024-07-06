# CLEAR-WASTE PROJECT

## TECHNOLOGIES USED
- FRONTEND: HTML, CSS, JavaScript
- BACKEND: Node.js, MongoDB

## 1. SOFTWARE REQUIREMENTS
- VS Code
- Node.js
- MongoDB

## HOW TO RUN THIS PROJECT

1. Open VS Code.
2. Navigate to the "BACKEND" folder and open it in the terminal.
3. Run the command `npm i` in the terminal.
4. Create a `.env` file in the root folder and fill in the following fields:
   ```.env
   PORT="your port"
   MONGO_URI="your MongoDB link"
   EMAIL_USER="your project email (used to send OTP to users)"
   EMAIL_PASS="email password"
   JWT_SECRET="your secret token"
   TRACKING_ID="tracking ID here"
   DRIVER_EMAIL="email where to send data about users"
   ```.env
5. Run nodemon server.js or node server.js.

Now your backend is ready.

6. Next, navigate to FRONTEND/INDEX/index.html and open it with Live Preview or Live Server.

