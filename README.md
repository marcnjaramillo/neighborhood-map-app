## Neighborhood Map Project

This is the Neighborhood Map project. This project consists of several parts:
* Use Google Maps API and create markers and infowindows for various locations
* Use third-party API(s) to add functionality
* Use `Knockout` to handle lists, filters, and other changeable information

___

####Use Google Maps API

The basic purpose of this project is to create a single page application using
Google Maps API. The steps needed for this are outlined below:

1. Create a Google Project and obtain an API key for Google Maps
1. Load the Google Maps API asynchronously
1. Create the function in `SD-Map.js` that would load the map on the page
1. Create an array of markers that would load when the application is launched
1. Create infowindows that will appear when a marker or its corresponding list
   item is clicked

---

_Personalizations made:_

For this project I made several personalizations. I used `BOUNCE` to indicate
when a marker or list item was clicked. I also adjusted the color of markers
when a user drags the cursor over the markers on the map. When a user clicks
either a marker or a list item, an infowindow appears over the marker and
displays a brief snippet of information and links to the corresponding website
so that users could access information about hours, pricing, etc.

___

####Use Third-Party API(s)

This project uses the Wikipedia API to pull information about each of the places
on the map. The information that is taken using the Wikipedia API is pulled
using an AJAX request and is loaded in the infowindow along with the location
website.

_Personalizations made:_

I chose to create a link to the full Wikipedia article about the locations so
that users could easily access more information.

___

####Use Knockout

This project required the use of `Knockout`. This is a JavaScript library that
allows for information management to be handled more easily. For example,
this project creates an array of locations (the __Model__) and these locations are
tracked using `ko-observables` within the __View Model__. The View Model is the
bridge between the information that is contained within the Model and the View -
which is what users interact with - and prevents the Model from being directly
accessed by the user. As the users interact with the __View__, the View Model
updates as necessary while the information in the Model remains intact.

###Running the application

A working internet connection is required to run the application. When
`neighborhood-map.html` is launched, the map will load with all markers visible.
The user can zoom and scroll on the map. Markers will change color when the user
mouses over them. When the user clicks a marker, this will display a window with
information about the location. The user can also navigate to Wikipedia and
the location's website from the infowindow. In the top left corner of the
application is a menu icon. Clicking it will open a side panel with a list of
locations. Users can display infowindows by clicking on the list items.
Users can filter locations by using the search box. As the user types, only
matching locations will display in the list.

___

###Gulp

In order to make work simpler, I used gulp to perform a number of tasks.

Gulp is run from the the command line by switching to the directory holding
`gulpfile.js` and the `node_modules` directory

```
marcjaramillo (master) ~ $ cd ~/Neighborhood-Map
marcjaramillo (master *) Neighborhood-Map $

```

####Installing plugins

Plugins are added to `node_modules` via the command line

```
marcjaramillo (master *) Neighborhood-Map $ npm install gulp-plugin --save-dev

```
The plugins used can be found in `gulpfile.js`. They are described below:

* __gulp__ - required to use gulp
* __gulp-jshint__ - checks for any errors in the JS file
* __gulp-clean-css__ - minifies by removing whitespace in CSS file
* __gulp-uglify__ - minifies by removing whitespace and comments in JS file
* __pump__ - needed for *gulp-uglify* to work
* __htmlmin__ - minifies HTML by removing whitespace

These plugins operate by defining a task and then calling a function that will
carry out the necessary steps to accomplish the goals stated above.

####Running gulp

Once changes have been completed in the source file, use the command line to
perform the desired tasks

```
marcjaramillo (master *) Neighborhood-Map $ gulp task

```
