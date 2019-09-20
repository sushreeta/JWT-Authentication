# JWT-Authentication
This repo include below APIs for user to register, login, check profile/account information and logout.

    localhost:3000/users/register

    localhost:3000/users/login

    localhost:3000/users/account

    localhost:3000/users/logout

  

User can create a new account or register by providing username, email and password. 
Internally it will validate the uniqueness of email and encrypt the password.

    Example: {
      "username":"user1",
      "email":"user1@gmail.com",
      "password":"secret121"
    }

User can login by creating a JWT token.

    Example: {
        "email":"user1@gmail.com",
        "password":"secret121"
    }

User can check profile information passing the JWT created at the time of login, in the header.

    Example: { 'x-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyNjA2NjBlMjNlODRlN2Rj'}

User can logout by deleting the JWT token created at the time of login.

    Example: { 'x-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyNjA2NjBlMjNlODRlN2Rj'}  



Follow below steps to see how it works:

  1. To clone the repository:
  
    $ git clone https://https://github.com/sushreeta/JWT-Authentication

  2. Open command prompt or Terminal and get inside JWT-Authentication directory in your local machine. Then run below command.
    
    $ npm install

  3. Now you are ready to test the APIs
