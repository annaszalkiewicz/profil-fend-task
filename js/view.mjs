class View {
	constructor() {}

	render() {}

	// Display year in the footer
	displayYear() {
		const d = new Date();
		return (document.getElementById('footer_date').innerHTML = d.getFullYear());
	}
}

export default View;
