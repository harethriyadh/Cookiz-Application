const Client = require('../models/client');
const Dish = require('../models/dish');
const Chef = require('../models/chef');
const decodeJwtToken = require('../helpers/decodeJwtToken');

exports.createClient = async (req, res) => {
  try {
    const { address, contactNumber } = req.body;
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);
    const existingClient = await Client.findOne({
      userId: decodedToken.userId,
    });

    if (existingClient) {
      throw new Error('Client already exists');
    }

    const createdClient = await Client.create({
      userId: decodedToken.userId,
      address,
      contactNumber,
    });

    return res.status(201).json(createdClient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);
    const client = await Client.findOne({ userId: decodedToken.userId });

    if (!client) {
      throw new Error('Client not found');
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);

    const updatedClient = await Client.findOneAndUpdate(
      { userId: decodedToken.userId },
      req.body,
      { new: true }
    );

    if (!updatedClient) {
      throw new Error('Client not found');
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createFavoriteDish = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);
    const client = await Client.findOne({ userId: decodedToken.userId });

    if (!client) {
      throw new Error('Client not found');
    }

    const { dishId } = req.body;
    const dish = await Dish.findById(dishId);

    if (!dish) {
      throw new Error('Dish not found');
    }

    const favoriteDish = {
      dishId: dish.id,
      name: dish.name,
    };

    client.favoriteDishes.push(favoriteDish);
    await client.save();

    res.status(200).json({ message: 'Favorite dish is added', client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavoriteDishes = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);
    const client = await Client.findOne({ userId: decodedToken.userId });

    if (!client) {
      throw new Error('Client not found');
    }

    const { favoriteDishes } = client;
    res.status(200).json({ favoriteDishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFavoriteDish = async (req, res) => {
  // Delete a favorite dish now is broken but for now it uses the userId from the jwt token
  try {
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);
    const client = await Client.findOne({ userId: decodedToken.userId });

    if (!client) {
      throw new Error('Client not found');
    }

    const dishId = req.params.id;
    client.favoriteDishes.pull(dishId);
    await client.save();

    res.status(200).json({ message: 'Favorite dish is deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = decodeJwtToken(token);
    const client = await Client.findOne({
      userId: decodedToken.userId,
    }).populate('orderHistory');

    if (!client) {
      throw new Error('Client not found');
    }

    const { orderHistory } = client;
    res.status(200).json({ orderHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();

    if (chefs.length === 0) {
      res.json({ message: 'No chefs available yet' });
    }

    res.status(200).json(chefs);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error while retrieving chefs: ${error.message}` });
  }
};
