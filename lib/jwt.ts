import jwt from 'jsonwebtoken';

export function generate(obj): string {
	const token: string = jwt.sign(obj, process.env.JWT_SECRET);
	return token;
}

export function decode(token): string {
	try {
		const splitedToken = token.split(' ');
		const decoded: string = jwt.verify(splitedToken[1], process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		console.error({ Message: 'Error in decode token', error });
		return null;
	}
}
