export default {
		selectedTab: "MRR & ARR",
		getAllMonths: () => {
			let currentDate = moment();
			let last12Months = [];
			for (let i = 0; i < 12; i++) {
				last12Months.push(currentDate.format("MMMM YYYY"));
				currentDate = currentDate.subtract(1, 'months');
			}
			return last12Months.reverse();
		}
}