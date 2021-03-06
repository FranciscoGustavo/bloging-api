import mongoose from 'mongoose';
import config from '../config';
import { info, error } from '../utils/debug';

const connectMongo = async (): Promise<any> => {
	const HAS_SRV = config.db.isLocal ? '' : '+srv';
	const PASSWORD = encodeURIComponent(config.db.password);
	const USER = encodeURIComponent(config.db.user);
	const DB_NAME = config.db.name;
	const mongoUri = `mongodb${HAS_SRV}://${USER}:${PASSWORD}@${config.db.host}/${DB_NAME}?retryWrites=true&w=majority`;
	try {
		await mongoose.connect(
			mongoUri,
			{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
		);
		return info('Connection to mongo is ready');
	} catch (err) {
		error(err);
		return process.exit(1);
	}
};

export default connectMongo;
