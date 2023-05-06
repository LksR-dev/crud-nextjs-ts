import { NextApiRequest, NextApiResponse } from 'next';
import { changeOrderStatusAndNotifyUser } from 'controllers/order';

export default async function mercadopago(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'POST') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const { id, topic } = req.query;
		const result = await changeOrderStatusAndNotifyUser(id as string, topic as string);
		res.send('ok');
	} catch (error) {
		res.status(400).json(error);
	}
}