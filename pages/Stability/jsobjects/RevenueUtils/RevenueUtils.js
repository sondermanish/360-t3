export default {
	revenueByAccount: null,
	getUniqueRevenue() {
		let tempData = [];
		getSegmentSFAllCases.data.filter(i => i.priority == "critical").forEach(i => {
			tempData.push(i.account_id);
		});
		// return tempData;
		return Array.from(new Set(tempData)).reduce((s, acc) => s + this.revenueByAccount[acc], 0);
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
	}
}