export default {
	onPageLoad: () => {
		setTimeout(() => {
			getAllUsage.run();
		}, 1000)
	}
}