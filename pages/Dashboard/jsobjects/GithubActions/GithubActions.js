export default {
	issues: [],
	getAllIssues: () => Object.values(this.issues).map(item => ({
		...item,
		customers: getSegmentSFProductDependancy.data
			.filter(product => product.product_dependency_detail_c.indexOf(item.number) > -1)
			.map(opp => getSegmentSFAccounts.data.find(item => item.id === opp.account_id).name).join(", ")
	})),
	fetchProductDependnacies: () => {
		let list = GithubUtils.getProductDependanciesGithub().filter(item => item.issueIds?.length > 0).map(item => item.issueIds);
		this.issues = {};
		_.uniq(_.flatten(list)).forEach((item) => {
			getGithubIssue.run({ issueId: item }).then((response) => {
				this.issues[item] = {
					..._.pick(response, ["number", "title", "created_at", "state", "closed_at"]),
					url: GithubUtils.formatGithubUrl(response.url),
					label: response.labels.map((item) => _.pick(item, ["name", "color"]))
				}
			});
		});
	}
}