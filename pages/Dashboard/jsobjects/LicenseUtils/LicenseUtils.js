export default {
	calculateUtilisation(item) {
		let SeatsPurchased = item?.purchasedUsage?.users, 
				ActiveUsers = item?.usedUsage?.users,
				HoursPurchased = item?.purchasedUsage?.sessions,
				LastMonthUsage = item?.usedUsage?.sessions;
		if (SeatsPurchased > 0) {
			return (ActiveUsers * 100 / SeatsPurchased).toFixed(1);
		} else if (HoursPurchased > 0) {
			return ((LastMonthUsage * 12 * 100 / HoursPurchased).toFixed(1));
		} else {
			return 'N/A';
		}
	}
	
}