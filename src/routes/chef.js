const express = require('express');
const chef = require('../controllers/chefController');

const router = express.Router();

router.post('/', chef.createRestaurant);
router.get('/me', chef.getRestaurantInfo);
router.put('/me', chef.editRestaurant);

module.exports = router;
