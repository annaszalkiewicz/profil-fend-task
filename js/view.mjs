class View {
	constructor(model, value) {
		this.model = model;
		this.value = value;
		this.results = [];
		this.shown = [];
		this.filtered = [];
		this.filteredByDate = [];
		this.container = document.getElementById('results');
		this.filterContainer = document.getElementById('filters');
		this.scrollTopButton = document.getElementById('scrollToTop');
	}

	// Method that renders search results
	render = result => {
		/* Creates card container with link to page with full details */
		const url = document.createElement('a');
		url.setAttribute('href', `${result.url}`);
		url.classList.add('card_container');
		this.container.appendChild(url);

		// Creates image container
		const imageContainer = document.createElement('div');
		imageContainer.classList.add('image_container');
		url.appendChild(imageContainer);

		/* Creates image inside image container; if no image available, display image placeholder */
		const image = document.createElement('img');
		image.setAttribute(
			'src',
			result.image === null
				? '../img/placeholder.jpg'
				: `${result.image.medium}`
		);
		imageContainer.appendChild(image);

		/* Creates details container that is sibling to image container */
		const details = document.createElement('div');
		details.classList.add('card_details');
		url.appendChild(details);

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

		// Creates status container

		const statusContainer = document.createElement('div');
		statusContainer.classList.add('status_container');
		more.appendChild(statusContainer);

		// Creates status label
		const statusLabel = document.createElement('p');
		statusLabel.classList.add('status_label');
		statusContainer.appendChild(statusLabel);
		statusLabel.innerHTML = 'Status:';

		// Display status; if no available, display 'Unknown status'
		const status = document.createElement('p');
		status.classList.add('card_status');
		statusContainer.appendChild(status);
		status.innerHTML = result.status ? result.status : 'TBD';

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
			? result.rating.toFixed(1)
			: 'No rating yet';
	};

	// Display series from results array
	showResults = () => {
		// Clear all results children if exist
		this.clearResults();

		if (this.filtered.length > 0) {
			this.filtered.map(result => this.render(result));
		} else {
			// Display 4 results initially
			for (let i = 0; i < 4; i++) {
				let result = this.results[i];
				this.render(result);
				this.shown = [...this.shown, result];
			}
		}
	};

	loadMoreResults = () => {
		// Check if there are more results to show after scrolling at the bottom of the page

		let startFrom = this.shown.length;
		let max = startFrom + 4;

		if (this.shown.length < this.results.length) {
			for (let i = startFrom; i < max; i++) {
				if (this.shown.length < this.results.length) {
					this.render(this.results[i]);
					this.shown = [...this.shown, this.results[i]];
				} else {
					this.noMoreToShow();
				}
			}
		}
	};

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

	clearResults = () => {
		this.container.innerHTML = '';
	};

	
	filterByStatus = value => {			
		this.filtered = [];
		if (value === '') {
			this.filtered = this.results;
		}
		else {
			this.results.filter(result => {
				if (result.status === value) {

					return (this.filtered = [...this.filtered, result]);
				}
			});
		}
	};

	/* This method filters results by release date.
	1) It clears filtered array and show all results
	2) Get release date shortened to year from results array and convert it to string
	3) Compare result release date with value from input
	4) Add items to filtered array if it matches condition
	5) It displays filtered results.
	*/
	filterByDate = value => {
		this.filtered.filter(result => {
			if (value === '') {
				this.filteredByDate = this.filtered;
			}
			if (
				new Date(result.releaseDate).getFullYear().toString() === value
			) {
				return (this.filteredByDate = [...this.filteredByDate, result]);
			}
		});
		console.log(this.filteredByDate);
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
			}
			else {
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
