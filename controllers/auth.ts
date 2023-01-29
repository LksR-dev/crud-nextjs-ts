import dbConnect from 'lib/connection';
import Auth, { AuthUser } from 'models/auth';
import { createUser } from './user';
import sendCode from 'lib/sendgrid';
import { addMinutesToDate, isCodeExpired } from 'lib/date';

function getRandomIntToString() {
	return (Math.floor(Math.random() * Math.ceil(99999 - 10000)) + 10000).toString();
}

async function createAuth(data: AuthUser) {
	const { email, userID, code, expires } = data;
	try {
		const newAuth = new Auth({ email, userID, code, expires });
		const authSaved = await newAuth.save();
		return authSaved;
	} catch (e) {
		console.error({ Message: 'Error to create auth', Error: e });
		throw e;
	}
}
