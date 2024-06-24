## TL;DR

Udacity Front End Nanodegree - Travel App Project
Project Summary
This project integrates various skills to build a custom travel app. It focuses on JavaScript, clean HTML/CSS, DOM manipulation, working with objects, and fetching data from three APIs, with one API dependent on another. The project is developed in a Webpack environment, using an Express server.

Extra Features
Display trip length by adding an end date.
Fetch an image from the Pixabay API if the entered location has no results.
Retrieve a multi-day forecast instead of a single-day forecast.
Include icons in the forecast.
Allow users to add travel remarks.
Enable trip printing or PDF export.
Implement field validation (required fields, minimum date, location).
Show a processing message after basic validation.
Customize the date format.
Add a close button for the output pop-up screen.
API Credentials
Create accounts at Geonames, WeatherBit, and Pixabay to get API keys.
Create a .env file with your API credentials:
makefile

- GEONAMES_USER=your Geonames username
- WEATHERBIT_KEY=your WeatherBit API key
- PIXABAY_KEY=your Pixabay API key

To get started developing right away:
- Installation Guide Download the app zip file Unzip it from the desktop 
- Install all project dependencies with `npm install`
- Install jest project dependencies with `npm jest`
- Update new code of project dependencies with `npm run build`
- Start test of project dependencies with `npm run build`
- Start the development server with `npm run serve`
