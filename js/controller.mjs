class Controller {
	constructor(view, model, results) {
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
	submitHandler = e => {
		e.preventDefault();

		const input = document.getElementById('name');

		if (input.value.trim() === '') {
			return;
		} else {
			this.model.fetchSeries();
		}
	};

	init = () => {
		this.view.displayYear();
		console.log(this.view);
		console.log(this.model);		
	};
}

export default Controller;
