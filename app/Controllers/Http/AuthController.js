'use strict'

const User = use('App/Models/User');

class AuthController {

  async refreshToken({ request, auth }) {
    const refreshToken = request.input("refresh_token");
    return await auth.newRefreshToken().generateForRefreshToken(refreshToken);
  }


  async register({request, auth, response}) {

    const username = request.input("username");
    const email = request.input("email");
    const password = request.input("password");

    let user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    user = await user.save();
    let newUser;

    if (user) {
      newUser = await User.findBy("username", username);
    }

    let accessToken = await auth.withRefreshToken().generate(newUser);
    return response.status(200).json({
      access_token: accessToken
    });

  }
  
  async login({ request, auth, response }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      let access_token = await auth.withRefreshToken().attempt(email, password);
      return response.status(200).json({
        access_token: access_token
      });
    } catch (err) {
      return response.status(403).json({
        message: err.message,
        status: "You need to register firts!"
      });
    }
  }

  async profile({ auth, response }) {
    try {
      let profile = await auth.getUser();
      response.status(200).json(profile);
    } catch (error) {
      response.send("Missing or invalid jwt token");
    }
  }

  async logout({ auth, response }) {
    const apiToken = auth.getAuthHeader();
    await auth.revokeTokens([apiToken], true);
    return response.status(200).json({
      msg: "Logout Success!"
    });
  }


}

module.exports = AuthController
