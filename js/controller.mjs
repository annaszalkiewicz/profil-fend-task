import Model from './model.mjs';

class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.sort = document.getElementById('sort');
		this.filterRating = document.getElementById('filterByRating');
		this.filterDate = document.getElementById('filterByReleaseDate');
		this.container = document.getElementById('results');
		this.sortAndFilters = document.getElementById('sortAndFilters');
		this.seriesIds = [];

		/* Event that listens to submit form */
		document
			.getElementById('form')
			.addEventListener('submit', this.submitHandler);

		/* Event that submits sort and filters form */
		this.sortAndFilters.addEventListener('submit', this.submitFilters);

		/* Window scroll event that calls scrollHandler */
		window.onscroll = this.scrollHandler;
	}

	scrollHandler = () => {
		this.view.scrollToTop();
		this.view.setStickySidebar();
		//Detect if user is at the ottom of the page
		if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && this.view.filteredByDate.length === 0) {
			this.loadMoreResults();
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

	fetchSeries = async () => {
		const input = document.getElementById('name');
		let query = input.value.trim();

		// 	this.view.reset();
		// 	this.view.showLoadingIndicator();

		await fetch(
			`http://www.omdbapi.com/?apikey=ad082f40&type=series&s=${query}`
		)
			.then(res => res.json())
			.then(res => {
				let totalPages = Math.ceil(res.totalResults / 10);
				this.getSeriesIds(totalPages, query);
			})
			.catch(err => console.log(err));
	};

	getSeriesIds = async (pages, query) => {
		let ids = [];
		for (let i = 1; i < pages + 1; i++) {
			await fetch(
				`http://www.omdbapi.com/?apikey=ad082f40&type=series&page=${i}&s=${query}`
			)
				.then(res => res.json())
				.then(res => {
					for (let j = 0; j < res['Search'].length; j++) {
						ids = [...ids, res['Search'][j].imdbID];
					}
				});
		}
		Promise.all([this.fetchSeries, this.getSeriesIds]).then(() => {
			if (ids.length === 0) {
				this.view.noResultsHandler();
			} else {
				this.view.showFilterContainer();
				this.fetchSeriesDetails(ids);
				// this.view.changeFooterPosition();
			}
		});
	};

	// Display series from results array
	fetchSeriesDetails = ids => {
		for (let i = 0; i < ids.length; i++) {
			fetch(`http://www.omdbapi.com/?apikey=ad082f40&i=${ids[i]}&plot=short`)
				.then(res => res.json())
				.then(res => {
					return this.createModels(res);
				});
		}
	};

	createModels = res => {
		this.view.results = [
			...this.view.results,
			new Model(
				res.Title,
				res.Poster,
				res.Released,
				res.Runtime,
				res.imdbRating,
				res.Plot,
				res.Awards
			)
		];
		this.view.showResults();
	};

	loadMoreResults = () => {
		let startFrom = this.view.shown;
		let max = startFrom + 12;

		// Check if there are more results to show after scrolling at the bottom of the page
		if (startFrom < this.view.results.length) {
			for (let i = startFrom; i < max; i++) {
				if (startFrom < this.view.results.length) {
					this.view.render(this.view.results[i]);
					this.view.shown += 12;
				} else {
					this.view.noMoreToShow();
				}
			}
		}
	};

	submitFilters = e => {
		e.preventDefault();
		this.view.filterByRating(this.filterRating.value);
		this.view.filterByDate(this.filterDate.value);
		this.sortChangeHandler(this.sort.value);
		this.view.showFiltered();
	};

	/* This method handles changing sort types depending on event target value and calls proper method to sort search results */
	sortChangeHandler = value => {
		if (value === '') {
			return;
		}
		switch (value) {
			case 'za':
				this.view.sortByName();
				this.view.filteredByDate.reverse();
				break;

			case 'highestRating':
				this.view.sortByRating();
				break;

			case 'lowestRating':
				this.view.sortByRating();
				this.view.filteredByDate.reverse();
				break;

			case 'newest':
				this.view.sortByReleaseDate();
				break;

			case 'oldest':
				this.view.sortByReleaseDate();
				this.view.filteredByDate.reverse();
				break;

			default:
				this.view.sortByName();
		}
	};

	init = () => {
		this.view.displayYear();
		this.view.changeFooterPosition();
	};
}

export default Controller;
