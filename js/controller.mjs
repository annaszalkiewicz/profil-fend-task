import Model from './model.mjs';

class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.sort = document.getElementById('sort');

		/* Event that listens to input change value & call updateValue method */
		document
			.getElementById('name')
			.addEventListener('change', this.view.updateValue);

		/* Event that listens to submit form */
		document
			.getElementById('form')
			.addEventListener('submit', this.submitHandler);

		/* Event that listens to sort options changes */
		this.sort.addEventListener('change', this.sortChangeHandler);
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
					this.view.results = [
						...this.view.results,
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
				if (this.view.results.length === 0) {
					this.view.noResultsHandler();
				} else {
					this.view.showResults();
				}
			})
			.catch(err => console.log(err));
	};

	init = () => {
		this.view.displayYear();
		console.log(this.view);
		console.log(this.model);
	};
}

export default Controller;
