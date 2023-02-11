import dbConnect from 'lib/connection';
import User from 'models/user';
import { UserInterface, UserWithIDInterface } from 'lib/types';

export async function createUser(email: string): Promise<UserInterface> {
	try {
		const newUser = new User({
			email,
			name: '',
			surname: '',
			address: {},
			identification: {},
			phone: {},
		});
		const userSaved: UserInterface = await newUser.save();
		return userSaved;
	} catch (e) {
		console.error({ Message: 'Error to create user', Error: e });
		return e;
	}
}

export async function findAllUser(): Promise<UserInterface[]> {
	await dbConnect();
	try {
		const allUsers = await User.find({});
		return allUsers;
	} catch (e) {
		console.error({ Message: 'Error to find user', Error: e });
		return e;
	}
}

export async function findUserByID(id: string): Promise<UserInterface> {
	await dbConnect();
	try {
		const userByID: UserInterface = await User.findById(id).exec();
		return userByID;
	} catch (e) {
		console.error({ Message: 'Error to find user by id', Error: e });
		return e;
	}
}

export async function updateUserByID(id: string, data: UserInterface): Promise<UserInterface> {
	await dbConnect();
	try {
		const userUpdated: UserInterface = await User.findByIdAndUpdate(id, data, {
			returnDocument: 'after',
		});
		return userUpdated;
	} catch (e) {
		console.error({ Message: 'Error to update user by id', Error: e });
		return e;
	}
}
