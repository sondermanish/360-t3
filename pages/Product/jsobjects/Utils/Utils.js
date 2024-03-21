export default {
	getAllAccountIds: () => _.uniqBy(getSegmentSFOpportunities.data, "account_id").map(item => item.account_id),
	formatGithubUrl: (url) => url.replace("api.", "").replace("repos/", ""),
	extractGitHubIssueIds: (inputString) => {
		const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/(?:\w+\/\w+\/issues|issues)\/(\d+)/g;
		const issueIds = [];
		let match;
		while ((match = regex.exec(inputString)) !== null) {
			issueIds.push(match[1]);
		}
		return issueIds;
	},
	getProductDependanciesGithub: () => {
		return getSegmentSFOpportunities.data
		.map((item) => {
			let dependancy = item.product_dependency_detail_c;
			let issueIds = this.extractGitHubIssueIds(dependancy);
			return {
				id: item.id,
				product_dependency_detail_c: item.product_dependency_detail_c,
				product_dependency_priority_c: item.product_dependency_priority_c,
				amount: item.amount,
				name: item.name,
				stage_name: item.stage_name,
				owner_id: item.owner_id,
				issueIds
			}
		})
	},
	getGithubIssueOpps: () => {
		let dependancies = this.getProductDependanciesGithub();
		let issueIds = _.uniq(dependancies.reduce((issueIds, item) => issueIds.concat(item.issueIds), []))
		let githubIssuesOpps = [];
		issueIds.forEach((issueId) => {
			let opps = dependancies.filter(opp => opp.issueIds.includes(issueId)).map((item) => ({ ...item, issueId }));
			githubIssuesOpps = githubIssuesOpps.concat([{ issueId }].concat(opps));
		})
		let ids = githubIssuesOpps.filter(item => !!item.id).map(item => item.id);
		dependancies = dependancies.filter((item) => !ids.includes(item.id));
		return githubIssuesOpps.concat((dependancies));
	}
}