import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from 'lib/jwt';

export function authMiddleware(callback) {
	return function (req: NextApiRequest, res: NextApiResponse) {
		const token = req.headers.authorization;
		if (!token) res.status(401).send({ Message: 'Missing token.' });

		const decodedToken = decodeToken(token);
		if (decodedToken) {
			callback(req, res, decodedToken);
		} else {
			res.status(401).send({ Message: 'Incorrect token' });
		}
	};
}
