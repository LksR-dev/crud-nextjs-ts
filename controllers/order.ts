import dbConnect from 'lib/connection';
import Order from 'models/order';
import { findUserByID } from 'controllers/user';
import { Preference } from 'lib/types';
import { createPreference, getMerchantOrder } from 'lib/mercadopago';

function createPreferenceStructure(userData, productData, productDetails, orderID) {
	const { title, description, picture_url, category_id, unit_price, quantity } = productData;
	const { phone, identification, address, email, name, surname } = userData;
	const preference: Preference = {
		items: [
			{
				title,
				description,
				picture_url,
				category_id,
				unit_price,
				currency_id: 'ARS',
				quantity: productDetails.quantity,
			},
		],
		payer: {
			phone,
			identification,
			address,
			email,
			name,
			surname,
		},
		back_urls: {
			succes: 'https://www.google.com/',
			pending: 'https://www.google.com/',
		},
		external_reference: orderID,
		notification_url: 'localhost:3000/api/webhooks/mercadopago',
	};
	return preference;
}

export async function createOrderDB(userData, productData, productDetails) {
	await dbConnect();
	try {
		const newOrder = new Order({
			userID: userData.id,
			productID: productData.product_id,
			productDetails,
			status: 'pending',
		});
		const orderSaved = await newOrder.save();
		const orderID: string = orderSaved.id;
		const preferenceStructure = createPreferenceStructure(
			userData,
			productData,
			productDetails,
			orderID,
		);
		const urlToRedirect = await createPreference(preferenceStructure);
		return { orderID, urlToRedirect };
	} catch (error) {
		console.error({ Message: 'Error to create order', Error: error });
		throw error;
	}
}

export async function changeOrderStatusAndNotifyUser(id: string, topic: string) {
	try {
		if (topic === 'merchant_order') {
			const order = await getMerchantOrder(id);
			const orderStatus = order.order_status;
			if (orderStatus === 'paid') {
				const orderID = order.external_reference;
				const updatedOrderDB = await Order.findByIdAndUpdate(
					orderID,
					{ status: orderStatus },
					{
						returnDocument: 'after',
					},
				);
				const user = await findUserByID(updatedOrderDB.userID);
			}
		}
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}