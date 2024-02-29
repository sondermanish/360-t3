export default {
	onPageLoad: () => {
		getSegmentSFOpportunities.run().then(() => {
			getSegmentSFAllCases.run();
			getSegmentSFAccounts.run();
			getSegmentSFContacts.run();
		})
	}
}