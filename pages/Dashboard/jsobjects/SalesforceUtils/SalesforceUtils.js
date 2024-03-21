export default {
	getAccounts: () => {
		let annualOpps = getSegmentSFOpportunities.data.map(item => {
			let account = getSegmentSFAccounts.data.find(account => account.id === item.account_id);
			return ({
				"Amount": item.amount,
				"Account": {
					"Id": item.account_id,
					"Name": account.name,
					"Stripe_ID__c": account.stripe_id_c,
				},
				"Owner": {
					"Name": getSegmentSFUsers.data.find(user => user.id === item.owner_id).first_name,
				},
				"Cases": getSegmentSFCases.data.filter(cases => cases.account_id === item.account_id).length,
				"Usage": getAllUsage.data.find(item => item.stripe_customer_id === account.stripe_id_c)?.total_sessions || 0,
				"Contract_Start_Date__c": item.contract_start_date_c,
				"Contract_End_Date__c": item.contract_end_date_c,
				"ARR__c": item.arr_c
			})
		});
		let uniqueAccounts = _.uniqBy(annualOpps, "Account.Name");
		return uniqueAccounts;
	},
	getAllAccountIds: () => _.uniqBy(getSegmentSFOpportunities.data, "account_id").map(item => item.account_id)
}