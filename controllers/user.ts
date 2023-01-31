import dbConnect from 'lib/connection';
import User, { UserInterface, UserWithIDInterface } from 'models/user';

export async function createUser(email: string): Promise<UserWithIDInterface> {
	try {
		const newUser = new User({
			email,
			name: '',
			surname: '',
			address: {},
			identification: {},
			phone: {},
		});
		const userSaved = await newUser.save();
		return userSaved;
	} catch (e) {
		console.error({ Message: 'Error to create user', Error: e });
	}
}

export async function findAllUser(): Promise<UserInterface[]> {
	await dbConnect();
	try {
		const allUsers = await User.find({});
		return allUsers;
	} catch (e) {
		console.error({ Message: 'Error to find user', Error: e });
	}
}

export async function findUserByID(id: string): Promise<UserInterface> {
	await dbConnect();
	try {
		const userByID = await User.findById(id).exec();
		return userByID;
	} catch (e) {
		console.error({ Message: 'Error to find user by id', Error: e });
	}
}

export async function updateUserByID(id: string, data: UserInterface): Promise<UserInterface> {
	await dbConnect();
	try {
		const userUpdated = await User.findByIdAndUpdate(id, data, { returnDocument: 'after' });
		return userUpdated;
	} catch (e) {
		console.error({ Message: 'Error to update user by id', Error: e });
	}
}
