import mongoose, { Schema, model, Types } from 'mongoose';

export interface AddressInterface {
	zipCode: string;
	streetName: string;
	cityName: string;
	stateName: string;
	streetNumber: number;
	floor?: string;
	apartment?: string;
}

export interface UserInterface {
	email: string;
	name: string;
	surname: string;
	phone: { areaCode: string; number: number };
	identification: { type: string; number: string };
	address: AddressInterface;
}

export interface UserWithIDInterface extends UserInterface {
	_id: Types.ObjectId;
}

const userSchema = new Schema<UserInterface>({
	email: { type: String, required: [true, 'Debes ingresar un email.'] },
	name: { type: String, required: false, default: '' },
	surname: { type: String, required: false, default: '' },
	phone: { type: Object, required: false, default: {} },
	identification: { type: Object, required: false, default: {} },
	address: { type: Object, required: false, default: {} },
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default (mongoose.models.User as mongoose.Model<UserInterface>) ||
	model<UserInterface>('User', userSchema);
