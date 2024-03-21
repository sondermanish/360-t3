export default {
	issues: {},
	getAllIssues: () => this.issues,
	onPageLoad: () => {
		getSegmentSFOpportunities.run(() => {
			let list = Utils.getProductDependanciesGithub().filter(item => item.issueIds?.length > 0).map(item => item.issueIds);
			this.issues = {};
			_.uniq(_.flatten(list)).forEach((item) => {
				getGithubIssue.run({ issueId: item }).then((response) => {
					this.issues[item] = {
						..._.pick(response, ["number", "title", "created_at", "state", "closed_at"]),
						url: Utils.formatGithubUrl(response.url),
						label: response.labels.map((item) => _.pick(item, ["url", "name", "color", "description"]))
					}
				});
			});
		})
	}
}