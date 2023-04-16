import { productsIndex } from 'lib/algolia';

export async function searchProducts(
	querySearch: string,
	hitsPerPage: { limit: number; offset: number },
): Promise<{ products; total: number }> {
	try {
		const { limit, offset } = hitsPerPage;
		const products = await productsIndex.search(querySearch, {
			hitsPerPage: limit,
			page: offset > 1 ? Math.floor(offset / limit) : 0,
		});
		return { products, total: products.nbHits };
	} catch (error) {
		console.error({
			Message: 'Error at algolia search products controller.',
			Error: error.message,
		});
		return error;
	}
}

export async function searchProductAlgolia(id: string) {
	try {
		const product = await productsIndex.getObject(id);
		return product;
	} catch (error) {
		console.error({ Message: 'Error to get a product in algolia', Error: error.message });
		throw error;
	}
}
