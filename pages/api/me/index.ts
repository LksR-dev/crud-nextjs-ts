import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByID } from 'controllers/user';
import { decodeToken } from 'lib/jwt';

export default async function findOrCreateUser(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const userID = decodeToken(req.headers.authorization);
		console.log(userID.userID);

		// const newUser = await findUserByID(userID.userID);
		res.status(201).json('ok');
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
