import Model from './model.mjs';

class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.sort = document.getElementById('sort');
		this.filterStatus = document.getElementById('filterByStatus');
		this.filterDate = document.getElementById('filterByReleaseDate');
		this.container = document.getElementById('results');

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

		/* Event that listens to filter by status options changes */
		this.filterStatus.addEventListener('change', this.filterStatusHandler);

		/* Event that listens to filter by release date changes */
		this.filterDate.addEventListener('change', this.filterDateHandler);

		/* Window scroll event that calls scrollHandler */
		window.onscroll = this.scrollHandler;
	}

	scrollHandler = () => {
		this.view.scrollToTop();
		this.view.setStickySidebar();
		//Detect if user is at the ottom of the page
		if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
			this.view.loadMoreResults();
		}
	};
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
					this.view.showFilterContainer();
					this.view.showResults();
					this.view.changeFooterPosition();
				}
			})
			.catch(err => console.log(err));
	};

	/* This method handles changing sort types depending on event target value and calls proper method to sort search results */
	sortChangeHandler = e => {
		switch (e.target.value) {
			case 'za':
				this.view.sortByName();
				this.view.results.reverse();
				break;

			case 'highestRating':
				this.view.sortByRating();
				break;

			case 'lowestRating':
				this.view.sortByRating();
				this.view.results.reverse();
				break;

			case 'newest':
				this.view.sortByReleaseDate();
				break;

			case 'oldest':
				this.view.sortByReleaseDate();
				this.view.results.reverse();
				break;

			default:
				this.view.sortByName();
		}
		this.view.showResults();
	};

	filterStatusHandler = e => {
		this.view.filterByStatus(e);
	};

	filterDateHandler = e => {
		this.view.filterByDate(e);
	};

	init = () => {
		this.view.displayYear();
		this.view.changeFooterPosition();
	};
}

export default Controller;
