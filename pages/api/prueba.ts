import { findOrCreateAuthWithEmail } from '../../controllers/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function prueba(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support GET method`,
			});
		}
		res.status(201).json('ok');
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
