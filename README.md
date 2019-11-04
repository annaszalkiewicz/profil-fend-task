# What would you like to watch?
---
## Project Overview

The purpose of this project is to create web app that allows user to search series by its title. This project is part of job interview for Front-end Developer Intern at [Profil Software](https://profil-software.com/).

## Project Requirements

Based on free API: http://www.tvmaze.com/api create web application which allows searching series by name.

### Functionalities:

* Search input should allow typing title and submit request
* After submit there should be displayed 12 results on page
* If there are no results that match the search, the message should be displayed
* Each scrolling to the bottom of the page should cause loading the next 12 results (if exist)
* If there are no more results, the message should be displayed
* Every result should contain: cover image, title, status (if the show is running), relase date, rating and description shortened to max 100 characters
* If there is no cover image, the default cover image should be displayed
* If any data is missing there should be displayed an information
* There should be possibility to sort results by name, rating and relase date
* There should be possibility to filter result by status and relase year

* Recruitment task should be written in pure JS (no framework is not allowed). Do not use libraries (e.g. Boostrap) for styling.

## How to run project?

### Run on local machine

1. Clone repository to local machine using
```
$ git clone https://github.com/annaszalkiewicz/profil-fend-task
```
2. Install all dependencies
```
npm install
```
3. Run this command in terminal
```
npm start
```
4. With your server running, visit the site: `http://localhost:8000`


## Dependencies

* [TVMaze API](https://www.tvmaze.com/api)
* [Font Montserrat on Google](https://fonts.google.com/specimen/Montserrat)
* [Material Icons](https://material.io/tools/icons)
* [Normalize.css](https://necolas.github.io/normalize.css/)
* [Gulp](https://gulpjs.com/)
* [Gulp Autoprefixer Plugin](https://www.npmjs.com/package/gulp-autoprefixer)
* [Gulp Browsersync](https://browsersync.io/)
* [Gulp Babel](https://www.npmjs.com/package/gulp-babel/)
* [Gulp Sass](https://github.com/dlmanning/gulp-sass#readme)
* [Gulp Concat](https://github.com/gulp-community/gulp-concat#readme)

## Contributions

As this project is part of job interview no contribution will be accepted.



