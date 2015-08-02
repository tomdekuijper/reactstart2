import generateApi from 'koa-mongo-rest';
import koaRouter from 'koa-router';
import Director from './models/director';
import User from './models/user';
import bcrypt from 'bcrypt';
import uuid from 'node-uuid';

export default function(app) {
  const mongoUrl = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || '127.0.0.1:27017/isofilmdb';
  const mongoose = require('mongoose');
  mongoose.connect(mongoUrl);

  app.use(koaRouter(app));

//  generateApi(app, Car, '/api');
//  generateApi(app, Film, '/api');
  generateApi(app, Director, '/api');

  app.post('/auth/register', function *(next) {
    yield next;
    const SALT_WORK_FACTOR = 10;
    const error = {message: 'Username already exists'};
    try {
      const body = this.request.body;
      const salt = yield bcrypt.genSalt.bind(this, SALT_WORK_FACTOR);
      const hash = yield bcrypt.hash.bind(this, body.password, salt);
      body.password = hash;
      body.token = uuid.v1();
      const result = yield User.create(body);
      this.status = 201;
      this.body = result;
    } catch (err) {
      this.status = 409;
      this.body = error;
    }
  });

  app.post('/auth/login', function *(next) {
    yield next;
    try {
      const body = this.request.body;
      const error = {message: 'Username and password doesn\'t match'};
      const user = yield User.findOne({
        username: body.username
      });
      if (!user) throw error;
      const match = yield bcrypt.compare.bind(this, body.password, user.password);
      if (!match) throw error;
      user.token = uuid.v1();
      this.status = 201;
      this.body = yield user.save();
    } catch (err) {
      this.status = 401;
      this.body = err;
    }
  });

  // generateApi(app, User, '/api');
}

