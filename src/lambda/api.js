const lapLengthTable =  require('laplengths-core');

export function handler(event, context, callback) {
	const params = JSON.parse(event.body)
	let table = new lapLengthTable(params).getTable()
	callback(null, {
		statusCode: 200,
		body: JSON.stringify(table)
	});
}