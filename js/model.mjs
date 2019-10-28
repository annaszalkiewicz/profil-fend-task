class Model {
	constructor(title, url, image, status, releaseDate, rating, description, results) {
		this.title = title;
		this.url = url;
		this.image = image;
		this.status = status;
		this.releaseDate = releaseDate;
		this.rating = rating;
		this.description = description;
		this.results = results;
	}

	fetchSeries = () => {
		const input = document.getElementById('name');
		let query = input.value.trim();

		fetch(`https://api.tvmaze.com/search/shows?q=${query}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				this.results = res;
			})
			.catch(err => console.log(err));
	};
}

export default Model;
