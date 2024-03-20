export default {
	getAccounts: () => {
		let annualOpps = getSalesforceOpportunities.data.records;
		let uniqueAccounts = _.uniqBy(annualOpps, "Account.Name");
		return uniqueAccounts;
	}
}