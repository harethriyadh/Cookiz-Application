const Chef = require('../models/chef');

exports.createChef = async (req, res) => {
  // we need to get an id as an authorized user
  // const id = req.
  const {
    restaurant,
    location,
    openingHours,
    closingHours,
    contactNumber,
    description,
  } = req.body;

  try {
    const checkChef = await Chef.findOne({ restaurant });
    if (checkChef) {
      throw new Error('Chef already exists.');
    }

    const newChef = new Chef({
      // chef: id,
      restaurant,
      location,
      openingHours,
      closingHours,
      contactNumber,
      description,
    });

    await newChef.save();

    res.status(201).json('Chef created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the Chef info
exports.getChefInfo = async (req, res) => {
  // we need to get chef's id value here
  const id = '64affcdef920783b12423498';

  try {
    const checkChef = await Chef.findOne({ userId: id });
    if (!checkChef) {
      throw new Error('Chef does not exist. You need to create your Chef.');
    }

    res.status(200).json({ checkChef });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Edit the chef's info
exports.editChefInfo = async (req, res) => {
  // we need to get chef's id value here
  const id = '64affcdef920783b12423498';

  const {
    restaurant,
    location,
    openingHours,
    closingHours,
    contactNumber,
    description,
  } = req.body;

  try {
    const checkChef = await Chef.findOne({ chef: id });
    if (!checkChef) {
      throw new Error('Chef does not exist');
    }

    checkChef.restaurant = restaurant;
    checkChef.location = location;
    checkChef.openingHours = openingHours;
    checkChef.closingHours = closingHours;
    checkChef.contactNumber = contactNumber;
    checkChef.description = description;

    const savedChef = await checkChef.save();

    res.status(201).json({ savedChef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
