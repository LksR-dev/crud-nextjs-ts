import { findOrCreateAuthWithEmail } from 'controllers/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function findOrCreateUser(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	try {
		if (req.method !== 'POST') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const newUser = await findOrCreateAuthWithEmail(req.body.email);
		res.status(201).json(newUser);
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
