class View {
	constructor(model, value) {
		this.model = model;
		this.value = value;
		this.results = [];
		this.container = document.getElementById('results');
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

		/* Display release date; if no available, display 'Unknown release date' */
		const date = document.createElement('p');
		date.classList.add('card_date');
		more.appendChild(date);
		date.innerHTML = result.releaseDate
			? result.releaseDate
			: 'Unknown release date';

		// Display status; if no available, display 'Unknown status'
		const status = document.createElement('p');
		status.classList.add('card_status');
		more.appendChild(status);
		status.innerHTML = result.status ? result.status : 'Unknown status';

		// Display rating; if no available, display 'No rating yet'
		const rating = document.createElement('p');
		rating.classList.add('card_rating');
		more.appendChild(rating);
		rating.innerHTML = result.rating ? result.rating : 'No rating yet';
	};

	// Display all series from results array
	showResults = () => {
		// Clear all results children if exist
		this.clearResults();

		// And re-render all results
		this.results.map(result => this.render(result));
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

	sortByName = () => {
		this.results.sort((a, b) => {
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

	// Method that update input value
	updateValue = e => {
		this.value = e.target.value;
	};

	// Display year in the footer
	displayYear = () => {
		const d = new Date();
		return (document.getElementById('footer_date').innerHTML = d.getFullYear());
	};
}

export default View;
