import { rest } from 'msw';

const handlers = [
	rest.get('/api/prueba', async (req, res, ctx) => {
		return res(ctx.status(201));
	}),
];

export { handlers };
