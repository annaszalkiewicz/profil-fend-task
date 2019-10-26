class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;

		/* Event that listens to input change value & call updateValue method */
		document
			.getElementById('name')
			.addEventListener('change', this.view.updateValue);

		/* Event that listens to submit form */
		document
			.getElementById('form')
			.addEventListener('submit', this.submitHandler);
	}
	/* Check if input isn't empty and submit form */
	submitHandler(e) {
		e.preventDefault();

		const input = document.getElementById('name');

		if (input.value.trim() === '') {
			return;
		} else {
			console.log(this.name.value);
		}
	}

	init() {
		this.view.displayYear();
	}
}

export default Controller;
