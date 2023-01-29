import { NextApiRequest, NextApiResponse } from 'next';
import { checkUserEmailAndCodeAuth } from 'controllers/auth';
import { generate } from 'lib/jwt';

export default async function sendCodeAndGetToken(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	const { email, code } = req.body;

	try {
		if (req.method !== 'POST') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const userID = await checkUserEmailAndCodeAuth(email, code);
		if (userID) {
			const token = generate({ userID });
			res.status(201).send({ token });
		} else {
			res.status(401).send({ Message: 'Email or code is incorrect.' });
		}
	} catch (e) {
		console.error({ Message: 'Error to generate token.', Error: e });
		res
			.status(401)
			.send({ Message: 'Error to generate token, probably missing data in the request body.' });
	}
}
