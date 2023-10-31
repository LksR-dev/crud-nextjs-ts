import { NextRequest } from 'next/server';

/**
 *
 * HERE ONLY ACCEPT GLOBAL MIDDLEWARES
 *
 * THE REST OF MIDDLEWARES GOING INTO LIB/MIDDLEWARES
 *
 */

export default function middleware(req: NextRequest) {
	if (req.method == 'OPTIONS') {
		return new Response('', {
			headers: {
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
				'Access-Control-Allow-Headers': req.headers.get('Access-Control-Request-Headers') as string,
				Vary: 'Access-Control-Request-Headers',
				'Content-Length': '0',
			},
		});
	}
}
