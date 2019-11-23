const jwt = require('jsonwebtoken');
const Order = require('../models/order');
const User = require('../models/user');
const Car = require('../models/car');

const getTokenFrom = req => {
  const authorization = req.get('Authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = {
  create: async (req, res, next) => {
    const body = req.body;
    const idCar = req.body.car;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const user = await User.findById(decodedToken.id);
      const car = await Car.findById(idCar);

      const order = new Order({
        fromDate: body.fromDate,
        toDate: body.toDate,
        user: user._id,
        car: car,
        price: body.price,
        content: body.content,
        isCompleted: false
      });

      const savedOrder = await order.save();
      user.orders = user.orders.concat(savedOrder._id);
      await user.save();
      car.orders = car.orders.concat(savedOrder._id);
      await car.save();
      res.json(savedOrder.toJSON());
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const orders = await Order.find({});
      const userOrders = [];

      orders.map(o => {
        if (o.user == decodedToken.id) {
          userOrders.push(o);
        }
      });

      res.json(userOrders.map(o => o.toJSON()));
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.id;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const order = await Order.findById(id);

      if (order.user != decodedToken.id) {
        return res.status(401).json({ error: 'access denied' });
      }

      if (order) {
        res.json(order.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const orderById = await Order.findById(id);

      if (orderById.user != decodedToken.id) {
        return res.status(401).json({ error: 'access denied' });
      }

      const order = {
        fromDate: body.fromDate,
        toDate: body.toDate,
        car: body.car,
        price: body.price,
        content: body.content
      };

      const updatedOrder = await Order.findByIdAndUpdate(id, order, {
        new: true
      });
      if (updatedOrder) {
        res.json(updatedOrder.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const order = await Order.findById(id);

      if (order.user != decodedToken.id) {
        return res.status(401).json({ error: 'access denied' });
      }

      await Order.findByIdAndRemove(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
};
