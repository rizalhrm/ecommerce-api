'use strict'

const User = use('App/Models/User');

class ProfileController {
    
    async getUser({ auth, params }) {
      try {
        const user = await auth.getUser()
        if(auth.user.id !== Number(params.id)) {
          return 'you cant access other user'
        }
        return response.status(201).json(user)
      } catch(e) {
        return {
          status: 'failed',
          message: 'Missing or invalid jwt token!'
        }
      }
  
    }
    
}

module.exports = ProfileController
