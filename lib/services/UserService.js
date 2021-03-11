const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UserService {

  static async create({ email, password, name }) {
    const user = await User.findByEmail(email);

    if(user) throw new Error('Email already exists. Try logging in!');

    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)); 
    const newUser = await User.insert({ email, passwordHash, name });

    return newUser;
  }

  static async authorize({ email, password }) {
    try {
      const user = await User.findByEmail(email);
      const emailsMatch = user.compare(email, user.email);

      if(!emailsMatch) throw new Error('Email is incorrect. Try again!');

      const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
      if(!passwordsMatch) throw new Error('Invalid Password');
      
      return user;

    } catch(err) {
      err.status = 401;
      throw err;
    }
  }

  static authToken(user) {
    return jwt.sign({ user: user.toJSON() }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  static verifyAuthToken(token) {
    const { user } = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }
};
