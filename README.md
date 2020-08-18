# My-Twitter (Clone) App

[Feel It!!](https://my-twitter-media.herokuapp.com/)

### Made Of...

> This app has been created using ReactJS,Express,NodeMailer,HapiJoi,JsonWebToken and MongoDB as persistence manager.
> Hapi Joi helps in Parameter Validation
> NodeMailer helps in sending emails for password recovery.
> Authentication is provided by JsonWebToken

### What's in it for me ? :metal:

- User can signup and login.
- Intial Password is sent to email and user is asked to reset password
- Upon Login success ,user can view all tweets in the system
- User can tweet , and include any image/gif in the tweet
- User can comment , like ,retweet and Share the tweet
- Counts for comments ,likes ,retweets and shares are displayed and updated in realtime
- User can Delete his own tweet.

### Prerequisite (For Server)

- create a .env file
- include DB_CONNECT (MongoDB URL from MongoDB server)
- PORT (API port where you want to run your server)
- TOKEN_SECRET (any gibberish string for JSON web tokens)
- API_VERSION (Version of your API)
- EMAIL (Gmail ID for NodeMailer)
- PASSWORD (Gmail's password)

## Run API Server

- Run npm install
- Run npm run start-api
- API server will be launched at http://localhost:[PORT]

## Launch React App

- Run npm install
- Run npm run dev
- Application runs on http://localhost:3000
