export default {
	revenueByAccount: null,
	getUniqueRevenue(data) {
		// return this.revenueByAccount;
		const revenueData = this.getRevenueMap();
		// return revenueData;
		return Array.from(new Set(data)).reduce((s, acc) => s + revenueData[acc], 0);
	},
	getData() {
		return getSegmentSFAccounts.data;
	},
	getRevenueMap() {
		let tempData = {};
		getSegmentSFOpportunities.data.forEach(i => {
			tempData[i.account_id] = i.amount ? parseInt(i.amount) : 0;
		});
		this.revenueByAccount = tempData;
		return tempData;
	},
	getRevenue(id) {
		return this.revenueByAccount[id];
	},
	getChartData() {
		const tempData = {};
		getSegmentSFAllCasesChart.data.forEach(i => {
			const currentMonth = moment(i.created_date).format("MMM YY");
			const prev = tempData[currentMonth] ?? [];
			tempData[currentMonth] = Array.from(new Set([...prev, i.account_id]))
		});
		return Object.keys(tempData).map(i => ({
			x: i,
			y: this.getUniqueRevenue(tempData[i])
		}));
	}
}