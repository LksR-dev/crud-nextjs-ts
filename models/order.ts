import mongoose, { Schema, model } from 'mongoose';
import { DB } from 'lib/connection';
import { UserInterface, AddressInterface } from './user';

export interface OrderInterface {
	userID: string;
	productID: number;
	productDetails: {};
	status: string;
}

const orderSchema = new Schema<OrderInterface>({
	userID: { type: String, required: [true, 'Debes ingresar el id del usuario.'] },
	status: {
		type: String,
		required: [true, 'Debes ingresar el id del usuario.'],
		default: 'pending',
	},
	productID: { type: Number, required: [true, 'Debes ingresar el id del producto.'] },
	productDetails: { type: Object, required: [true, 'Debes ingresar una descripcion.'] },
});
orderSchema;
orderSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default (mongoose.models.Order as mongoose.Model<OrderInterface>) ||
	model<OrderInterface>('Order', orderSchema);
