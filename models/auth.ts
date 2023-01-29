import mongoose, { Schema, model } from 'mongoose';

export interface AuthUser {
	email: string;
	code: string;
	expires: Date;
	userID: string;
}

const authSchema = new Schema<AuthUser>({
	email: { type: String, required: [true, 'Debes ingresar un email.'] },
	code: { type: String, required: true },
	expires: { type: Date, required: true },
	userID: { type: String, required: true },
});

authSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default (mongoose.models.Auth as mongoose.Model<AuthUser>) ||
	model<AuthUser>('Auth', authSchema);
