export default {
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
		return getSegmentSFProductDependancy.data
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
}