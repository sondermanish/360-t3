export default {
	onPageLoad: () => {
		getSalesforceOpportunities.run().then(() => {
			getAllUsage.run();
			getSalesforceZendeskCases.run();
		})
	}
}