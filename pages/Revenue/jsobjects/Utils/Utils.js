export default {
	getMRRARRChartData:(month = "April 2023") => {
		return (getSegmentSFOpportunities.data.reduce((total, record) => {
			if (record.stage_name !== "Closed Won") return total;
			let monthvalue = month;
			if (moment(record.contract_end_date_c).valueOf() >= moment(`${moment(monthvalue).daysInMonth()} ${monthvalue}`).valueOf() && moment(record.contract_start_date_c).valueOf() <= moment(`${moment(monthvalue).daysInMonth()} ${monthvalue}`).valueOf()) {
				let MRR = record.amount/Math.floor((moment(record.contract_end_date_c).valueOf() -moment(record.contract_start_date_c).valueOf())/(1000 * 60 * 60 * 24 * 30))
				return total + MRR;	
			} 
			return total;
		}, 0) * 12/1000).toFixed(0);
	},
	  writeToStore: () => {
        // Calculate ARR for the current month and year
                const currentARR = this.getMRRARRChartData(moment().format("MMMM YYYY"));

        // Store the calculated ARR value under the label "EnterpriseARR"
        storeValue("EnterpriseARR", currentARR);
    }
}
