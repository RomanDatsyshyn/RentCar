const jwt = require('jsonwebtoken');
const Car = require('../models/car');
const Order = require('../models/order');
const querystring = require('querystring');

const getTokenFrom = req => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('admin ')) {
    return authorization.substring(6);
  }
  return null;
};

const isDateInRange = (date, from, to) => {
  return date > from && date < to ? true : false;
};

const isDateAvaliable = (from, to, fOrder, tOrder) => {
  const f = isDateInRange(from, fOrder, tOrder);
  const t = isDateInRange(to, fOrder, tOrder);

  if (f == true || t == true) {
    console.log('Початкова або кінцева дата входить в діапазон');
    return false;
  } else if (from < fOrder && to > tOrder) {
    console.log(
      'початкова дата менше за діапазон, але кінцева більша за діазон'
    );
    return false;
  } else return true;
};

module.exports = {
  create: async (req, res, next) => {
    const body = req.body;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.ADMINSECRET);

      if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const car = new Car({
        town: body.town,
        name: body.name,
        class: body.class,
        year: body.year,
        price: body.price,
        carImage: req.file.path,
        transmission: body.transmission,
        engine: body.engine
      });

      const savedCar = await car.save();
      res.json(savedCar.toJSON());
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const cars = await Car.find({});
      res.json(cars.map(c => c.toJSON()));
    } catch (err) {
      next(err);
    }
  },
  getByParams: async (req, res, next) => {
    try {
      let town = req.query.town;
      let carClass = req.query.class;
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      let avaliableCars = [];
      let сarsByParams = [];

      // Отримуємо всі авто
      const cars = await Car.find({});

      // Вибираємо авто з потрібними town і class
      cars.map(c => {
        if (c.town === town && c.class === carClass) {
          avaliableCars.push(c);
        }
      });

      for (let i = 0; i < avaliableCars.length; i++) {
        // Якшо пусті ордери, то добавляємо авто в список доступних
        if (avaliableCars[i].orders.length == 0) {
          сarsByParams.push(avaliableCars[i]);
        } else {
          // Якщо ордери не пусті, то:
          const orders = avaliableCars[i].orders;
          let status = [];
          let Avaliable = true;

          // Проходимося по всіх ордерах конкретної машини
          for (let i = 0; i < orders.length; i++) {
            let order = await Order.findById(orders[i]);

            status.push(
              isDateAvaliable(fromDate, toDate, order.fromDate, order.toDate)
            );
          }
          console.log(status);

          // Перевіряємо чи немає конфліктів із вже існуючими замовленнями на цю машину
          for (let i = 0; i < status.length; i++) {
            if (status[i] == false) {
              Avaliable = false;
            }
          }

          // Якшо авто не конфліктує з іншими замовленнями, то додаємо цю машину в список доступних
          if (Avaliable) {
            сarsByParams.push(avaliableCars[i]);
          }
        }
      }

      res.json(сarsByParams.map(car => car.toJSON()));
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const car = await Car.findById(id);

      if (car) {
        res.json(car.toJSON());
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
      const decodedToken = jwt.verify(token, process.env.ADMINSECRET);

      if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const car = {
        town: body.town,
        name: body.name,
        class: body.class,
        year: body.year,
        price: body.price,
        // carImage: req.file.path,
        transmission: body.transmission,
        engine: body.engine
      };

      const updatedCar = await Car.findByIdAndUpdate(id, car, { new: true });
      if (updatedCar) {
        res.json(updatedCar.toJSON());
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
      const decodedToken = jwt.verify(token, process.env.ADMINSECRET);

      if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      await Car.findByIdAndRemove(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
};
