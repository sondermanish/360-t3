export default {
	getSFTableData: () => {	
		let data = getSegmentSFOpportunities.data.sort((a, b) => {
			const dateA = new Date(a.created_date);
			const dateB = new Date(b.created_date);
			return dateB - dateA;
		});
		const groupedData = {};
		let currentAccountId;
		data.forEach(item => {
			const account_id = item.account_id;
			if ( !!currentAccountId && currentAccountId !== account_id && groupedData[currentAccountId].length > 1 && !groupedData[currentAccountId].filter((item) => !item.id).length) {
				groupedData[currentAccountId].push({
					account_id: currentAccountId,
					amount: groupedData[currentAccountId].reduce((total, item) => total + parseInt(item.amount || 0), 0)
				});
				groupedData[currentAccountId].unshift(groupedData[currentAccountId].pop())
			}
			currentAccountId = account_id;
			
			if (!groupedData[account_id]) groupedData[account_id] = [];
			groupedData[account_id].push(item);
		});
		return _.flatten(Object.values(groupedData));
	},
	getAllAccountIds: () => _.uniqBy(getSegmentSFOpportunities.data, "account_id").map(item => item.account_id),
	getDomainFromEmail: (value = "") => {
		value = value?.toLowerCase().trim();
		return emailAddresses.parseOneAddress(value)?.domain?.split(".")[0];
		/*if (value
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
			console.log("test", value.split("@")[1]?.split(".")[0]);
			return value.split("@")[1]?.split(".")[0]
		}
		return "";*/
	}
}