class View {
	constructor(value) {
		this.value = value;
		/* Event that listens to input change value & call updateValue method */
		document.getElementById('name').addEventListener('change', this.updateValue);
	}

	render() {}

	//Method that update input value
	updateValue(e) {
		this.value = e.target.value;
	}

	// Display year in the footer
	displayYear() {
		const d = new Date();
		return (document.getElementById('footer_date').innerHTML = d.getFullYear());
	}
}

export default View;
