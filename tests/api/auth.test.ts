import request from 'supertest';
import { server } from 'mocks/server';

describe('AUTH Tests', () => {
	describe('give a email for get a code', () => {
		test('should respond with a 201 status code', async () => {
			const response = await request(server).get('/api/prueba');
			expect(response.statusCode).toBe(201);
		});

		// test('should have a content-type: application/json', async () => {
		// 	const response = await request(process.env.BASE_URL)
		// 		.post('/api/auth')
		// 		.send({ email: 'lucasmruizsec05@gmail.com' });
		// 	expect(response.headers['content-type']).toContain('application/json');
		// });

		// test('should have a email and code into body response', async () => {
		// 	const response = await request(process.env.BASE_URL)
		// 		.post('/api/auth')
		// 		.send({ email: 'lucasmruizsec05@gmail.com' });
		// 	expect(response.body.email && response.body.code).toBeDefined();
		// 	code = response.body.code;
		// });
	});

	// describe('give a code for get a token', () => {
	// 	test('should respond with a 201 status code', async () => {
	// 		const response = await request(process.env.BASE_URL)
	// 			.post('/api/auth/token')
	// 			.send({ email: 'lucasmruizsec05@gmail.com', code });
	// 		expect(response.statusCode).toBe(201);
	// 		token = response.body.token;
	// 	});

	// 	test('should have a content-type: application/json', async () => {
	// 		const response = await request(process.env.BASE_URL)
	// 			.post('/api/auth/token')
	// 			.send({ email: 'lucasmruizsec05@gmail.com', code });
	// 		expect(response.headers['content-type']).toContain('application/json');
	// 	});

	// 	test('should have a token into body response', async () => {
	// 		const response = await request(process.env.BASE_URL)
	// 			.post('/api/auth/token')
	// 			.send({ email: 'lucasmruizsec05@gmail.com', code });
	// 		expect(response.body.token).toBeDefined();
	// 	});
	// });
});
