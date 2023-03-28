import Airtable from 'airtable';
export const airtableBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE,
);

export function syncProductsFromAirtableToAlgolia(limit: number, productsIndex) {
	try {
		// use `firstPage` instead of `eachPage`.
		airtableBase('Furniture')
			.select({
				pageSize: limit,
			})
			.eachPage(
				async function (records, fetchNextPage) {
					const objects = records.map((r) => {
						return {
							objectID: r.id,
							...r.fields,
						};
					});
					await productsIndex.saveObjects(objects);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
					return 'Sync finished';
				},
			);
	} catch (error) {
		console.error({ Message: 'Error to search products in airtable', Error: error.message });
		throw error;
	}
}
