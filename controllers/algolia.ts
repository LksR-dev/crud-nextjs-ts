import { productsIndex } from 'lib/algolia';

export async function searchProducts(
	querySearch: string,
	hitsPerPage: { limit: number; offset: number },
): Promise<{ products; total: number }> {
	try {
		const products = await productsIndex.search(querySearch, hitsPerPage);
		return { products, total: products.nbHits };
	} catch (error) {
		console.error({
			Message: 'Error at algolia search products controller.',
			Error: error.message,
		});
		return error;
	}
}
