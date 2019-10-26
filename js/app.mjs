import Model from './model.mjs';
import View from './view.mjs';
import Controller from './controller.mjs';

const view = new View();
const model = new Model();
const controller = new Controller(view, model);

controller.init();