import dbConnect from 'lib/connection';
import Order from 'models/order';
import { findUserByID } from 'controllers/user';
import { Preference, UserInterface, ProductInterface } from 'lib/types';
import { createPreference, getMerchantOrder } from 'lib/mercadopago';
import { sendOrderEmail } from 'lib/sendgrid';

function createPreferenceStructure(userData: UserInterface, productData, orderID) {
	const items = productData.results.map((product) => {
		const { title, description, images, unit_price } = product.fields;
		return {
			title,
			description,
			picture_url: images[0].url,
			unit_price,
			currency_id: 'ARS',
			quantity: 1,
		};
	});
	const { phone, identification, address, email, name, surname } = userData;
	const preference: Preference = {
		items,
		payer: {
			phone,
			identification,
			address,
			email,
			name,
			surname,
		},
		back_urls: {
			succes: 'https://ecommerce-front-sage-three.vercel.app/',
			pending: 'https://ecommerce-front-sage-three.vercel.app/',
		},
		external_reference: orderID,
		notification_url: 'https://webhook.site/09bfb75a-476e-4299-91b9-e97e5504cebc',
	};
	return preference;
}

export async function createOrderDB(
	userData: UserInterface,
	productData,
	productsIDs: string[],
	productDetails,
) {
	await dbConnect();
	try {
		const newOrder = new Order({
			userID: userData.id,
			productID: productsIDs,
			productDetails,
			status: 'pending',
		});
		const orderSaved = await newOrder.save();
		const orderID: string = orderSaved.id;
		const preferenceStructure = createPreferenceStructure(userData, productData, orderID);
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
				const { userID, productDetails } = updatedOrderDB;
				const user = await findUserByID(userID);
				await sendOrderEmail(user.email, productDetails);
			}
		}
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}

export async function getMyOrders(userID: string) {
	try {
		return await Order.find({ userID });
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}

export async function getOrder(id: string) {
	try {
		return await Order.findById(id);
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}
