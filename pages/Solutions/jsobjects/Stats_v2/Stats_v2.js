export default {
	calculateDateRange: () => {
    const currentDate = new Date();
    const pastDate = new Date();
	  let reportDate = new Date();
		pastDate.setDate(currentDate.getDate() - 30);
		
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
        default:
            throw new Error('Invalid date range');
    }

    return {
        currentDate: currentDate, // or formatDate(currentDate) if formatted
        pastDate: pastDate, // or formatDate(pastDate) if formatted
				reportDate: reportDate
    };
}
	
	,
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
}
}