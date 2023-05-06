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

export interface Preference {
	items: [
		{
			title: string;
			description: string;
			picture_url: string;
			category_id: string;
			unit_price: number;
			currency_id: 'ARS';
			quantity: number;
		},
	];
	payer: {
		phone: string;
		identification: { type: string; number: string };
		address: AddressInterface;
		email: string;
		name: string;
		surname: string;
	};
	back_urls: {
		succes: string;
		pending: string;
	};
	external_reference: number;
	notification_url: string;
}
