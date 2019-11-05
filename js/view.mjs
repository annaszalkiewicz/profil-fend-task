class View {
	constructor(model, value) {
		this.model = model;
		this.value = value;
		this.results = [];
		this.shown = 0;
		this.filtered = [];
		this.filteredByDate = [];
		this.container = document.getElementById('results');
		this.filterContainer = document.getElementById('filters');
		this.scrollTopButton = document.getElementById('scrollToTop');
	}

	// Method that renders search results
	render = result => {
		/* Creates card container with link to page with full details */
		const div = document.createElement('div');
		div.classList.add('card_container');
		this.container.appendChild(div);

		// Creates image container
		const imageContainer = document.createElement('div');
		imageContainer.classList.add('image_container');
		div.appendChild(imageContainer);

		/* Creates image inside image container; if no image available, display image placeholder */
		const image = document.createElement('img');
		image.setAttribute(
			'src',
			result.image !== 'N/A' ? result.image : '../img/placeholder.jpg'
		);
		imageContainer.appendChild(image);

		/* Creates details container that is sibling to image container */
		const details = document.createElement('div');
		details.classList.add('card_details');
		div.appendChild(details);

		/* Creates series title; if no title available display 'No title' instead */
		const title = document.createElement('h2');
		title.classList.add('card_title');
		title.innerHTML = result.title ? `${result.title}` : 'No title';
		details.appendChild(title);

		/* Create series description; if no description available, display 'No description' */
		const description = document.createElement('div');

		description.classList.add('card_description');
		details.appendChild(description);
		description.innerHTML = result.description
			? result.description.substring(0, 99) + '...'
			: 'No description available';

		// Creates more container
		const more = document.createElement('div');
		more.classList.add('card_more');
		details.appendChild(more);

		// Creates date container

		const dateContainer = document.createElement('div');
		dateContainer.classList.add('date_container');
		more.appendChild(dateContainer);

		// Creates date label
		const dateLabel = document.createElement('p');
		dateLabel.classList.add('date_label');
		dateContainer.appendChild(dateLabel);
		dateLabel.innerHTML = 'Release date:';

		/* Display release date; if no available, display 'Unknown release date' */
		const date = document.createElement('p');
		date.classList.add('card_date');
		dateContainer.appendChild(date);
		date.innerHTML = result.releaseDate ? result.releaseDate : 'TBD';

		// Creates rating container

		const ratingContainer = document.createElement('div');
		ratingContainer.classList.add('rating_container');
		more.appendChild(ratingContainer);

		// Creates rating label
		const ratingLabel = document.createElement('p');
		ratingLabel.classList.add('rating_label');
		ratingContainer.appendChild(ratingLabel);
		ratingLabel.innerHTML = 'Rating:';

		// Display rating; if no available, display 'No rating yet'
		const rating = document.createElement('p');
		rating.classList.add('card_rating');
		ratingContainer.appendChild(rating);
		rating.innerHTML = result.rating
			? Number(result.rating).toFixed(1)
			: 'No rating yet';

		// Creates runtime container
		const runtimeContainer = document.createElement('div');
		runtimeContainer.classList.add('runtime_container');
		more.appendChild(runtimeContainer);

		// Creates runtime label
		const runtimeLabel = document.createElement('p');
		runtimeLabel.classList.add('runtime_label');
		runtimeContainer.appendChild(runtimeLabel);
		runtimeLabel.innerHTML = 'Runtime:';

		// Display runtime; if no available, display 'No rating yet'
		const runtime = document.createElement('p');
		runtime.classList.add('card_runtime');
		runtimeContainer.appendChild(runtime);
		runtime.innerHTML = result.runtime ? result.runtime : 'Unknown runtime';

		// Creates awards container
		const awardsContainer = document.createElement('div');
		awardsContainer.classList.add('awards_container');
		more.appendChild(awardsContainer);

		// Creates awards label
		const awardsLabel = document.createElement('p');
		awardsLabel.classList.add('runtime_label');
		awardsContainer.appendChild(awardsLabel);
		awardsLabel.innerHTML = 'Awards:';

		// Display awards; if no available, display 'No rating yet'
		const awards = document.createElement('p');
		awards.classList.add('card_awards');
		awardsContainer.appendChild(awards);
		awards.innerHTML = result.awards ? result.awards : 'Unknown runtime';
	};

	// Display series from results array
	showResults = () => {
		// Clear all results children if exist
		this.clearResults();

		// Display 12 results initially
		for (let i = 0; i < 12; i++) {
			let result = this.results[i];
			this.render(result);
		}
		this.shown = 12;

		this.changeFooterPosition();
	};
	// showResults = () => {

	// if (this.filtered.length > 0) {
	// 	this.filtered.map(result => this.render(result));
	// } else {

	// };

	noMoreToShow = () => {
		const nomore = document.getElementById('results_nomore');
		nomore.style.display = 'block';
	};

	// Display warning message if no series found
	noResultsHandler = () => {
		const message = document.createElement('p');
		message.classList.add('results_warning');
		this.container.appendChild(message);
		message.innerHTML =
			'Sorry, no series found. Please, try to search for another one.';
	};

	showLoadingIndicator = () => {
		const icon = '<i class="material-icons loading">refresh</i>';
		const div = document.createElement('div');
		// div.classList.add('loading');
		div.innerHTML = `${icon}`;
		this.container.appendChild(div);
	};

	// Error handling if fetch request fails
	errorMessage = () => {
		this.clearResults();
		this.container.innerHTML =
			'Sorry, there was a problem with your request. Please try again :(';
	};

	reset = () => {
		this.results = [];
		this.shown = [];
		this.filtered = [];
		this.filteredByDate = [];
	};

	clearResults = () => {
		this.container.innerHTML = '';
	};

	// Filter by rating
	filterByRating = value => {
		// Reset all filters
		this.filtered = [];
		this.filteredByDate = [];

		// If result match filter criteria, add it to filtered array
		this.results.filter(result => {
			if (parseFloat(result.rating) >= parseFloat(value)) {
				return (this.filtered = [...this.filtered, result]);
			}
			// If value is empty, add all results to filtered
			else if (value === '') {
				return (this.filtered = this.results);
			}
		});

	};

	// Filter by release date
	filterByDate = value => {
		this.filtered.filter(result => {
			const d = new Date(result.releaseDate);
			
			if (d.getFullYear().toString() === value) {
				this.filteredByDate = [...this.filteredByDate, result];
			}
			else if (value === '') {
				this.filteredByDate = this.filtered;
			}
		});
	};

	sortByName = () => {
		this.filteredByDate.sort((a, b) => {
			const nameA = a.title.toLowerCase();
			const nameB = b.title.toLowerCase();

			if (nameA < nameB) {
				return -1;
			} else if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	};

	/* Method that sorts series by rating from highest to lowest. Rating is number or null, so this method convert rating to number. If rating is null, then it gets rating 0 */
	sortByRating = () => {
		this.filteredByDate.sort((a, b) => Number(b.rating) - Number(a.rating));
	};

	/* Method that sorts series by release from newest to oldest. First it converts release date to Date, parse date to miliseconds and compare numbers */

	sortByReleaseDate = () => {
		this.filteredByDate.sort((a, b) => {
			const dateA = new Date(a.releaseDate);
			const dateB = new Date(b.releaseDate);

			return Date.parse(dateB) - Date.parse(dateA);
		});
	};

	showFiltered = () => {
		console.log(this.filteredByDate);
		this.clearResults();

		if (this.filteredByDate.length === 0) {
			this.noResultsHandler();
		} else {
			this.filteredByDate.map(result => this.render(result));
		}
	};

	showFilterContainer = () => {
		this.filterContainer.classList.add('show');
	};

	scrollToTop = () => {
		if (window.pageYOffset > window.innerHeight / 2) {
			return (this.scrollTopButton.style.display = 'block');
		} else {
			return (this.scrollTopButton.style.display = 'none');
		}
	};

	setStickySidebar = () => {
		if (window.innerWidth >= 640) {
			if (window.pageYOffset > 250) {
				this.filterContainer.classList.add('sticky');
			} else {
				this.filterContainer.classList.remove('sticky');
			}
		}
	};

	// Method that update input value
	updateValue = e => {
		this.value = e.target.value;
	};

	// Display year in the footer
	displayYear = () => {
		const d = new Date();
		return (document.getElementById('footer_date').innerHTML = d.getFullYear());
	};

	/* Show footer at the bottom initially, but when results are displayed, show it under results at the end of document */
	changeFooterPosition = () => {
		const footer = document.getElementById('footer');
		if (this.results.length === 0) {
			footer.style.position = 'absolute';
		} else {
			footer.style.position = 'relative';
		}
	};
}

export default View;
