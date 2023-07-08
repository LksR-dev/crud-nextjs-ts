import sgMail from '@sendgrid/mail';

export default async function sendCode(userEmail: string, code: string): Promise<void> {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: userEmail, // Change to your recipient
		from: 'lucasmruiz05@gmail.com', // Change to your verified sender
		subject: 'CODIGO',
		text: code,
		html: `<strong>${code}</strong>`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
}

export async function sendOrderEmail(userEmail, productDetails, productID) {
	const { orderID, productImg, productTitle, count } = productDetails;
	const msg = {
		to: userEmail, // Change to your recipient
		from: 'lucasmruiz05@gmail.com', // Change to your verified sender
		subject: 'Factura de compra.',
		text: 'Orden de compra.',
		html: `
			<strong>¡Ya está listo el detalle de tu compra!</strong>
			<p>Compraste ${productTitle} X${count}</p>
		`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
}
