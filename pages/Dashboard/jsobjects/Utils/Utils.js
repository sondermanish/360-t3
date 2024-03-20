export default {
	getCustomerEmailDomain: (email = this.getKeygenLicense().customerEmail) => {
		var domainRegex = /@([a-zA-Z0-9.-]+)$/;
    var match = email.match(domainRegex);
    if (match && match.length > 1) {
        return match[1];
    } else {
        return null; // return null if no match found
    }
	}
}