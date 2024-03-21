export default {
	getChartData: (stripeId) => {
		let account = getSegmentSFAccounts.data.find(item => item.stripe_id_c === stripeId);
		return {
			legend: {
			selectedMode: false
		},
		grid: {},
		yAxis: {
			type: 'value'
		},
		xAxis: {
			type: 'category',
			data: Object.keys(JSON.parse(Query1.data[0].months))
		},
		series:  {
				name: account.name,
				type: 'bar',
				stack: 'total',
				data: Object.values(JSON.parse(Query1.data.find(item => item.stripe_customer_id === account.stripe_id_c)?.months || "{}"))
			}
		}
	}
}