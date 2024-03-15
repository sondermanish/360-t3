export default {
	onPageLoad: () => {
		getSegmentSFOpportunities.run().then(() => {
			getSegmentSFAccounts.run()
		})
	}
}