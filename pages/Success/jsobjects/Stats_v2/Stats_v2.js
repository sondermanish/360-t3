export default {
	usageInputs: {},
	getUsageInputs: () => this.usageInputs,
	calculateUsageInputs: () => {
		const currentDate = new Date();
		const pastDate = new Date();
		const pastYear = new Date();
		let reportDate = new Date();
		let startDate;
		let usage_meter_id;
		let usage_metric;
    if (fetchLicenses.data && fetchLicenses.data.data.data[0].subscription.subscriptionId) {
        // Use startDate from subscriptionId if available
        const epochTime = fetchLicenses.data.data.data[0].subscription.startDate; // Epoch time in seconds
        startDate = new Date(epochTime * 1000); // Convert to milliseconds
				usage_meter_id = "um.1zquF6Ny3Z2.AOODs";
				usage_metric = "REVENUE"
    } else {
        // Fallback to regular startDate
        const epochTime = fetchLicenses.data.data.data[0].startDate; // Epoch time in seconds
        startDate = new Date(epochTime * 1000); // Convert to milliseconds
				usage_meter_id = "um.209yEkSp1fc.Yc3Ni";
				usage_metric = "USAGE"
    };
		pastDate.setDate(currentDate.getDate() - 30);
		pastYear.setDate(currentDate.getDate() - 365);
		
		const dateRange = ReportPeriod.selectedOptionValue; // Assuming Select1.selectedOptionValue contains the date range

		switch (dateRange) {
			case '30_days':
				reportDate.setDate(currentDate.getDate() - 30);
				break;
			case '3_months':
				reportDate.setMonth(currentDate.getMonth() - 3);
				break;
			case '6_months':
				reportDate.setMonth(currentDate.getMonth() - 6);
				break;
			case '12_months':
				reportDate.setMonth(currentDate.getMonth() - 12);
				break;
			default:
				throw new Error('Invalid date range');
		}
		this.usageInputs = {
			currentDate: currentDate, // or formatDate(currentDate) if formatted
			pastDate: pastDate, // or formatDate(pastDate) if formatted
			reportDate: reportDate,
			startDate: startDate,
			pastYear: pastYear,
			usage_meter_id: usage_meter_id,
			usage_metric: usage_metric
		};
		console.log("Stats_v2",this.usageInputs,this.getUsageInputs());
		FetchActiveUsage.run({usageInputs: this.usageInputs});
		FetchAggregateUsage.run({usageInputs: this.usageInputs});
		return this.usageInputs;
	},
	countAccountsByMetricAndTotalHours(response, threshold) {
		let count = 0;
		let totalHours = 0;

		if (response && response.results && response.results.length > 0) {
			const metrics = response.results[0].data;

			for (const metric of metrics) {
				if (metric.metricValues && metric.metricValues.length > 0) {
					const sumHours = metric.metricValues.reduce((acc, val) => acc + val, 0);

					if (sumHours > threshold) {
						count++;
						totalHours += sumHours;
					}
				}
			}
		}
		return { count, totalHours };
	},
	calculateUtilisation(SeatsPurchased, ActiveUsers, HoursPurchased, LastMonthUsage) {
		if (SeatsPurchased > 0) {
			return (ActiveUsers * 100 / SeatsPurchased).toFixed(1)+'%';
		} else if (HoursPurchased > 0) {
			return ((LastMonthUsage * 12 * 100 / HoursPurchased).toFixed(1))+'%';
		} else {
			return 'N/A';
		}
	},
	transformDataForChart(FetchUsageReport) {
		// Check if 'results' and its 'data' field are defined and not empty
		if (!FetchUsageReport.data.results || FetchUsageReport.data.results.length === 0 ||
				!FetchUsageReport.data.results[0].data || FetchUsageReport.data.results[0].data.length === 0) {
			return []; // Return an empty array if data is not available
		}

		const dataPoints = FetchUsageReport.data.results[0].data[0];
		const chartData = dataPoints.timestamps.map((timestamp, index) => {
			const date = new Date(timestamp);
			// Format the date as 'dd-mmm' (e.g., '02-Oct')
			const formattedDate = date.toLocaleDateString('en-GB', {
				day: '2-digit', month: 'short'
			}).replace(/ /g, '-');
			return {
				x: formattedDate,
				y: dataPoints.metricValues[index]
			};
		});

		return chartData;
	},
	UserCountBreakdown(apiResponse) {
    let totalUsage = 0;
    let loggedInUsage = 0;
    let anonymousUsage = 0;
    let loggedInCount = 0;
    let anonymousCount = 0;
    const accountUsageMap = {};
		const monthlyLoggedInUsers = {};
		const monthlyAnonymousUsers = {};

    if (apiResponse && apiResponse.results && apiResponse.results.length > 0) {
        const data = apiResponse.results[0].data;
			
        data.forEach(item => {
            const accountID = item.groupedBy.fieldValue;
            const usage = item.metricValues.reduce((acc, value) => acc + value, 0);

            totalUsage += usage;
            accountUsageMap[accountID] = (accountUsageMap[accountID] || 0) + usage;

            if (accountID.length > 80) {
                loggedInUsage += usage;
                loggedInCount++;
            } else {
                anonymousUsage += usage;
                anonymousCount++;
            }
					
						item.timestamps.forEach((timestamp) => {
							const date = moment(timestamp);
							const month = date.format('MMMM-YYYY');
							if (accountID.length > 80) {
								if (!monthlyLoggedInUsers[month]) {
									monthlyLoggedInUsers[month] = 0;
								}	
								monthlyLoggedInUsers[month] += 1;
							} else {
								if (!monthlyAnonymousUsers[month]) {
									monthlyAnonymousUsers[month] = 0;
								}	
								monthlyAnonymousUsers[month] += 1;
							}
						});
        });
    }

    return {
        total: {
            userCount: Object.keys(accountUsageMap).length,
            totalUsage: totalUsage
        },
        loggedIn: {
            userCount: loggedInCount,
            totalUsage: loggedInUsage,
						monthlyUsers: monthlyLoggedInUsers
        },
        anonymous: {
            userCount: anonymousCount,
            totalUsage: anonymousUsage,
						monthlyUsers: monthlyAnonymousUsers
        }
    };
}
}