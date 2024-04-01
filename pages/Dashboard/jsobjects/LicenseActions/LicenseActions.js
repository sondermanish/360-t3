export default {
	licenses: [],
	getLicenes: () => this.licenses,
	fetchLicenses: () => {
		this.licenses = [];
		let stripeIds = getSegmentSFAccounts.data.filter(item => !!item.stripe_id_c).map(item => item.stripe_id_c);
		let numberOfRuns = Math.ceil(stripeIds.length / 17);
		new Array(numberOfRuns).fill(0).forEach((item, index) => {
			//console.log(stripeIds.slice(index * 17, 17 * (index + 1)));
			fetchLicense.run({ stripeIds: stripeIds.slice(index * 17, 17 * (index + 1)).join(",") }).then((response) => {
				let data = response.data.data.filter(item => !!item.subscription && !!item.subscription.purchasedUsage).map(item => _.pick(item.subscription, ["customerEmail", "customerId", "purchasedUsage", "usedUsage"]))
				this.licenses = this.licenses.concat(data);
			});
		});
	}
}