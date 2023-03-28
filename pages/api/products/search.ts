import { NextApiRequest, NextApiResponse } from 'next';
import { searchProducts } from 'controllers/algolia';
import { UserInterface, UserTokenDecoded } from 'lib/types';
import { airtableBase } from 'lib/airtable';

export default async function searchProductsQuery(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<UserInterface | void> {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		// searchProducts();
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
