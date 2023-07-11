const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();
const { createTokens } = require('../jwt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid  email or password' });
    }
    // will comment the create token and the jwt cuz they are broke, we need to fix them from their file.

    // const accessToken = createTokens(user);
    // res.cookie('access-token', accessToken, {
    //   maxAge: 60 * 60 * 24 * 30 * 1000,
    //   httpOnly: true,
    // });

    // saving user information for middlewares
    req.user = user;

    res.json('you logged in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const signup = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    // checking if the user exist
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(409).json({ error: 'Email is already registered' });
    }

    // checking if the password valid
    const hashedPassword = await bcrypt.hash(password, 10);

    // saving user information to DB
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// logout
const logout = async (req, res) => {
  res.clearCookie('access-token');
  res.send('Cookie deleted successfully');
};

const passwordReset = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
  login,
  logout,
  passwordReset,
};
