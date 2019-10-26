class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	init() {
		this.view.displayYear();
	}
}

export default Controller;
