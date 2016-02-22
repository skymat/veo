import mongoose from 'mongoose';
import User from './User';

mongoose.connect('mongodb://veo:veo@ds055855.mongolab.com:55855/veo');
mongoose.connection.on('error', () => console.log('mongoDB connection error'));
mongoose.connection.once('open', () => console.log('mongoDB connection open'));