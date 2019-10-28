import Model from './model.mjs';

class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.results = [];

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
			this.fetchSeries();
		}
	};

	fetchSeries = () => {
		const input = document.getElementById('name');
		let query = input.value.trim();

		fetch(`https://api.tvmaze.com/search/shows?q=${query}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				for (let i = 0; i < res.length; i++) {
					this.results = [
						...this.results,
						new Model(
							res[i].show.name,
							res[i].show.url,
							res[i].show.image,
							res[i].show.status,
							res[i].show.premiered,
							res[i].show.rating.average,
							res[i].show.summary
						)
					];
				}

				this.showResults();
			})
			.catch(err => console.log(err));
	};

	showResults = () => {
		this.results.map(result => this.view.render(result));
	};

	init = () => {
		this.view.displayYear();
		console.log(this.view);
		console.log(this.model);
	};
}

export default Controller;
