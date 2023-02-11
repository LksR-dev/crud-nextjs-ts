import { Types } from 'mongoose';

export interface AuthUser {
	email: string;
	code: string;
	expires: Date;
	userID: string;
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

export interface OrderInterface {
	userID: string;
	productID: number;
	productDetails: {};
	status: string;
}

export interface AddressInterface {
	zipCode: string;
	streetName: string;
	cityName: string;
	stateName: string;
	streetNumber: number;
	floor?: string;
	apartment?: string;
}

export type UserTokenDecoded = {
	userID: string;
	iat: number;
};
