export default {
	onPageLoad: () => {
		getSegmentSFAccounts.run(() => {
			getSegmentSFProductDependancy.run(() => {
				GithubActions.fetchProductDependnacies();
			});
			LicenseActions.fetchLicenses();
		});
	}
}