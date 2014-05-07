/**
 * @author Annie Waldman, Harry Stevens, Benedetta Riva, Winni Zhou
 */

/*
 * STORY 1 SCRIPT
 */
function dataLoaded(BIRDSTRIKES) {

	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdstrikesData = BIRDSTRIKES.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdstrikesArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdstrikesArray = ["Date", "John F. Kennedy", "Teterboro", "LaGuardia", "Newark Liberty", "Atlantic City", "Stewart"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdstrikesArray.push(headerBirdstrikesArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdstrikesData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdstrikesData[i];

		//Formatting date with moment js
		var currDate = currObj.date;
		var momentDate = moment(currDate);
		var newDate = momentDate._d;

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [newDate, currObj.JFK_freq, currObj.Teterboro_freq, currObj.LGA_freq, currObj.Newark_freq, currObj.KACY_freq, currObj.Stewart_freq];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdstrikesArray.push(currArray);
	}

	//Now I feed data to visualization library. Whoot almost there!
	var data = google.visualization.arrayToDataTable(myBirdstrikesArray);

	var formatDate = new google.visualization.DateFormat({
		pattern : 'y'
	});
	formatDate.format(data, 0);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions = {
		title : "Select a date range to zoom in. Right click to zoom out.",
		vAxis : {
			ticks : [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
			title : 'Birdstrikes',
			gridlines : {
				color : '#fff'
			}
		},
		hAxis : {
			ticks : [new Date(1990, 1, 1), new Date(1992, 1, 1), new Date(1994, 1, 1), new Date(1996, 1, 1), new Date(1998, 1, 1), new Date(2000, 1, 1), new Date(2002, 1, 1), new Date(2004, 1, 1), new Date(2006, 1, 1), new Date(2008, 1, 1), new Date(2010, 1, 1), new Date(2012, 1, 1)],
			title : 'Year',
			slantedText : true,
			format : 'y',
			gridlines : {
				color : '#fff'
			}
		},
		explorer : {
			actions : ['dragToZoom', 'rightClickToReset'],
			axis : 'horizontal'
		},
		colors : ['#542788', '#af8dc3', '#c51b7d', '#e9a3c9', '#01665e', '#4d4d4d'],
	};

	//Now I tell it to create a line chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdstrikesChart = new google.visualization.LineChart(document.getElementById('ChartDiv1'));
	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdstrikesChart.draw(data, chartOptions);

}

function dataLoaded2(BIRDAIRPORT) {

	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdAirportData = BIRDAIRPORT.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdAirportArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdAirportArray = ["Year", "Birdstrike rate"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdAirportArray.push(headerBirdAirportArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdAirportData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdAirportData[i];

		//Moment js will format the dates
		var momentYear = moment(currObj.Year);
		var currYear = momentYear._d;

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [currYear, currObj.Birdstrikes_Flights];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdAirportArray.push(currArray);
	}

	//Now I feed data to visualization library. Whoot almost there!
	var data2 = google.visualization.arrayToDataTable(myBirdAirportArray);

	//Formats the way data is displayed on the chart
	var formatDate = new google.visualization.DateFormat({
		pattern : 'y'
	});
	formatDate.format(data2, 0);
	var formatVal = new google.visualization.NumberFormat({
		pattern : '##.##'
	});
	formatVal.format(data2, 1);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions2 = {
		title : "Select a date range to zoom in. Right click to zoom out.",
		hAxis : {
			ticks : [new Date(1990, 1, 1), new Date(1992, 1, 1), new Date(1994, 1, 1), new Date(1996, 1, 1), new Date(1998, 1, 1), new Date(2000, 1, 1), new Date(2002, 1, 1), new Date(2004, 1, 1), new Date(2006, 1, 1), new Date(2008, 1, 1), new Date(2010, 1, 1), new Date(2012, 1, 1)],
			slantedText : true,
			format : 'y',
			title : 'Year',
			gridlines : {
				color : '#fff'
			},
		},
		vAxis : {
			title : 'Birdstrikes per 100k movements',
			gridlines : {
				color : '#fff'
			},
		},
		explorer : {
			actions : ['dragToZoom', 'rightClickToReset'],
			axis : 'horizontal'
		},
		colors : ['#ff43f3'],
		legend : {
			position : 'none'
		}
	};

	//Now I tell it to create a line chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdstrikesAirportChart2 = new google.visualization.LineChart(document.getElementById("ChartDiv2"));

	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdstrikesAirportChart2.draw(data2, chartOptions2);

}

//Adding the googleLoaded function. This function will go and get my data and eventually display it on the page! :-)
function googleLoaded() {
	//Time to load data with get function. This will tell my page to go and get this data set and use the function
	//dataLoaded to render it.
	$.getJSON("data/merge_strikes_freq.json", dataLoaded);
	$.getJSON("data/birdstrikes_flights_PA.json", dataLoaded2);
}

//Adding my new function pageLoaded and console logging to make sure that the pageLoaded function activates on
//document ready. This will eventually load my google visualization.
function pageLoaded() {
	//Load the google visualization library with the callback googleLoaded. This will tell the browser to load the function
	//googleLoaded. This is using the google visualization script to work. But now I have to make sure that I have
	//my function googleLoaded working.
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"
	});
	google.load("visualization", "1", {
		packages : ["corechart"],
	});
}

/*
 * STORY 3 SCRIPT
 */

function st3_dataLoaded(BIRDKILLINGS) {
	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdKillingsData = BIRDKILLINGS.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdKillingsArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdKillingsArray = ["Date", "Killings at Newark", "Killings at JFK", "Killings at LGA", "Killings at Stewart", "Killings at Teterboro"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdKillingsArray.push(headerBirdKillingsArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdKillingsData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdKillingsData[i];
		
		//Moment.js to format dates
		var newDate = currObj.Month;
		var momentDate = moment(newDate);
		var currDate = momentDate._d;

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [currDate, currObj.EWR, currObj.JFK, currObj.LGA, currObj.SWF, currObj.TEB];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdKillingsArray.push(currArray);
	}

	//Now I feed data to visualization library. Whoot almost there!
	var data = google.visualization.arrayToDataTable(myBirdKillingsArray);
	
	//Formatting tooltips
	var formatDate = new google.visualization.DateFormat({
		pattern : "MMMM, y"
	});
	formatDate.format(data, 0);
	var formatVal = new google.visualization.NumberFormat({
		pattern : '#,###'
	});
	formatVal.format(data, 2);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions = {
		title : 'Select a date range to zoom in. Right click to zoom out.',
		vAxis : {
			ticks : [500, 1000, 1500, 2000, 2500, 3000, 3500],
			title: "Number of killings",
			format: '#,###',
			gridlines: {
				color: '#fff'
			}
		},
		hAxis : {
			title: "Date",
			slantedText : true,
			format: "MMM, ''yy",
			gridlines: {
				color: '#fff'
			}
		},
		explorer : {
			actions : ['dragToZoom', 'rightClickToReset'],
			axis : 'horizontal'
		},
		colors : ['#542788', '#af8dc3', '#c51b7d', '#e9a3c9', '#01665e', '#4d4d4d']
	};

	//Now I tell it to create a line chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdKillingsChart = new google.visualization.LineChart(document.getElementById('myBirdKillingsChartDiv'));
	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdKillingsChart.draw(data, chartOptions);

}

function st3_dataLoaded2(BIRDTYPES) {

	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdTypesData = BIRDTYPES.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdTypesArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdTypesArray = ["Bird Type", "Birds killed, 2012", "Birds killed, 2013"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdTypesArray.push(headerBirdTypesArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdTypesData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdTypesData[i];

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [currObj.birdType, currObj.year2012, currObj.year2013];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdTypesArray.push(currArray);
	}

	//Now I feed data to visualization library. Whoot almost there!
	var data2 = google.visualization.arrayToDataTable(myBirdTypesArray);
	
	//Formatting numbers as they display on chart
	var formatVal = new google.visualization.NumberFormat({
		pattern : '###,###'
	});
	formatVal.format(data2, 1);
	formatVal.format(data2, 2);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions2 = {
		colors : ['#505050', '#FF00FF'],
		vAxis : {	
			title: "Number of killings",
			gridlines : {
				color: '#fff'
			}
		},
		hAxis : {
			title: "Species"
		}
	};

	//Now I tell it to create a line chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdKillingsChart2 = new google.visualization.ColumnChart(document.getElementById("ChartDiv3"));
	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdKillingsChart2.draw(data2, chartOptions2);

}

//Visualization 3:
function st3_dataLoaded3(BIRDMETHODS) {

	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdMethodsData = BIRDMETHODS.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdMethodsArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdMethodsArray = ["Year", "Firearm", "Euthanasia"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdMethodsArray.push(headerBirdMethodsArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdMethodsData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdMethodsData[i];

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [currObj.Year, currObj.Firearm, currObj.Euthanized];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdMethodsArray.push(currArray);
	}
	//Now I feed data to visualization library. Whoot almost there!
	var data = google.visualization.arrayToDataTable(myBirdMethodsArray);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions = {
		colors : ['#505050', '#FF00FF'],
		vAxis : {	
			title: "Number of killings",
			gridlines : {
				color: '#fff'
			}
		},
		hAxis : {
			title: "Year"
		},
	};

	//Now I tell it to create a bar chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdMethodsChart = new google.visualization.ColumnChart(document.getElementById('myBirdMethodsChartDiv'));
	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdMethodsChart.draw(data, chartOptions);

}

//Adding the st3_googleLoaded function. This function will go and get my data and eventually display it on the page! :-)
function st3_googleLoaded() {
	//Time to load data with get function. This will tell my page to go and get this data set and use the function
	//dataLoaded to render it.
	$.get("data/birdkillings_by_airport.json", st3_dataLoaded, "json");
	$.get("data/birdkillings_method_new.json", st3_dataLoaded3, "json");

}

function st3_googleLoaded2() {
	//Time to load data with get function. This will tell my page to go and get this data set and use the function
	//dataLoaded to render it.
	$.get("data/birdkillings_by_type_year.json", st3_dataLoaded2, "json");

}

//Adding my new function st3_pageLoaded and console logging to make sure that the st3_pageLoaded function activates on
//document ready. This will eventually load my google visualization.
function st3_pageLoaded() {
	//Load the google visualization library with the callback st3_googleLoaded. This will tell the browser to load the function
	//st3_googleLoaded. This is using the google visualization script to work. But now I have to make sure that I have
	//my function st3_googleLoaded working.
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "st3_googleLoaded"
	});
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "st3_googleLoaded2"
	});
}

/*
* STORY 4 SCRIPT
*/
//Global variables
var map;
var layer_0;

//This function is called when map stuff is loaded
function initializeMap() {

	//For case where map is mobile. Taken straight from Google Fusion tables publish tab.
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) || (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}

	//Styles the div map-canvas where the map will display
	var mapDiv = document.getElementById('map-canvas');
	mapDiv.style.height = isMobile ? '100%' : '500px';

	//Updates global var map with info about the div style and additional options for zoom and lat long center
	map = new google.maps.Map(mapDiv, {
		center : new google.maps.LatLng(36.58072594811134, -95.03431384999999),
		zoom : 4,
		streetViewControl : false,
		panControl : false,
		mapTypeControl : false
	});

	//Styles map to reduce saturation and remove unnecessary elements
	var style = [{
		featureType : 'landscape',
		elementType : 'all',
		stylers : [{
			saturation : -90
		}]
	}, {
		featureType : 'landscape.natural',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'water',
		elementType : 'all',
		stylers : [{
			saturation : -30
		}]
	}, {
		featureType : 'road.highway',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'road.arterial',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'road.local',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'administrative.neighborhood',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'administrative.land_parcel',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'poi',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}];
	var styledMapType = new google.maps.StyledMapType(style, {
		map : map,
		name : 'Styled Map'
	});
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');

	//Creates functionality for updating map based on user inputs. The var whereClause will update the query string to pull certain data from the Fusion Tables
	layer_0 = new google.maps.FusionTablesLayer({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu"
		},
		map : map,
		styleId : 3,
		templateId : 4
	});
}

//Updates map based on level selection
function changeMap_level() {
	var whereClause;
	var searchString = $("#search-string_level").val();
	if (searchString != '--Select--') {
		whereClause = "'Birdstrike_Rating' = '" + searchString + "'";
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		},
	});
}

//Updates map based on state selection
function changeMap_state() {
	var whereClause;
	var stateName;
	var stateLocs;
	var stateLat;
	var stateLng;
	var stateZoom;
	var searchString = $("#search-string_state").val();
	if (searchString != '--Select--') {
		whereClause = "'State' = '" + searchString + "'";
		stateName = $("#search-string_state option:selected").text();

		//JSON for state locations
		stateLocs = {
			"Alaska" : {
				"lat" : 62.17267192672637,
				"lng" : -150.22962635,
				"zoom" : 5
			},
			"Arizona" : {
				"lat" : 34.05315398991166,
				"lng" : -112.09058826406249,
				"zoom" : 6
			},
			"California" : {
				"lat" : 35.61313610437187,
				"lng" : -117.60023181874999,
				"zoom" : 5
			},
			"Colorado" : {
				"lat" : 39.040983266931924,
				"lng" : -105.27357166249999,
				"zoom" : 6
			},
			"District of Columbia" : {
				"lat" : 38.78774020556518,
				"lng" : -77.17329090078124,
				"zoom" : 9
			},
			"Florida" : {
				"lat" : 28.08583517704441,
				"lng" : -81.41401355703124,
				"zoom" : 6
			},
			"Georgia" : {
				"lat" : 32.85125125266963,
				"lng" : -82.85322254140624,
				"zoom" : 7
			},
			"Hawaii" : {
				"lat" : 20.5549254702272,
				"lng" : -155.53876941640624,
				"zoom" : 7
			},
			"Illinois" : {
				"lat" : 39.17205679668551,
				"lng" : -87.93989246328124,
				"zoom" : 6
			},
			"Kansas" : {
				"lat" : 38.25051301331366,
				"lng" : -98.43183582265624,
				"zoom" : 7
			},
			"Maryland" : {
				"lat" : 38.650592020360776,
				"lng" : -75.89887683828124,
				"zoom" : 7
			},
			"Massachusetts" : {
				"lat" : 42.34173144078288,
				"lng" : -72.59199207265624,
				"zoom" : 7
			},
			"Michigan" : {
				"lat" : 43.452355299228486,
				"lng" : -83.96284168203124,
				"zoom" : 6
			},
			"Minnesota" : {
				"lat" : 46.118403357943215,
				"lng" : -93.96040027578124,
				"zoom" : 6
			},
			"Missouri" : {
				"lat" : 38.08640214682979,
				"lng" : -91.69721668203124,
				"zoom" : 6
			},
			"Nevada" : {
				"lat" : 37.48296048342987,
				"lng" : -116.49335926015624,
				"zoom" : 6
			},
			"New Jersey" : {
				"lat" : 40.409768023835944,
				"lng" : -74.51136463124999,
				"zoom" : 7
			},
			"New York" : {
				"lat" : 42.004850785754485,
				"lng" : -74.77827136953124,
				"zoom" : 7
			},
			"North Carolina" : {
				"lat" : 35.45276653557984,
				"lng" : -78.84458606679686,
				"zoom" : 7
			},
			"Ohio" : {
				"lat" : 39.952842887936825,
				"lng" : -82.39317005117186,
				"zoom" : 7
			},
			"Oregon" : {
				"lat" : 44.891813597856725,
				"lng" : -121.65830676992186,
				"zoom" : 6
			},
			"Pennsylvania" : {
				"lat" : 39.826398881350656,
				"lng" : -76.18589466054686,
				"zoom" : 7
			},
			"Tennessee" : {
				"lat" : 35.336340313027286,
				"lng" : -87.15025012929686,
				"zoom" : 7
			},
			"Texas" : {
				"lat" : 31.85940404545869,
				"lng" : -99.38489978749999,
				"zoom" : 6
			},
			"Utah" : {
				"lat" : 39.16513624755324,
				"lng" : -112.06724231679686,
				"zoom" : 6
			},
			"Virginia" : {
				"lat" : 38.226243588641914,
				"lng" : -78.37217395742186,
				"zoom" : 7
			},
			"Washington" : {
				"lat" : 46.98862284606915,
				"lng" : -120.71348255117186,
				"zoom" : 7
			},
			"Puerto Rico" : {
				"lat" : 18.05765729533466,
				"lng" : -66.26936023671874,
				"zoom" : 8
			},
			"Indiana" : {
				"lat" : 39.97336800566942,
				"lng" : -84.27595203359374,
				"zoom" : 6
			},
			"New Mexico" : {
				"lat" : 34.09187058036035,
				"lng" : -106.572431240625,
				"zoom" : 6
			},
			"Kentucky" : {
				"lat" : 37.877530991928026,
				"lng" : -82.67716756874998,
				"zoom" : 6
			},
			"Wisconsin" : {
				"lat" : 43.96363233036241,
				"lng" : -449.92265096718745,
				"zoom" : 6
			},
			"Louisiana" : {
				"lat" : 31.290838716080735,
				"lng" : -452.14188924843745,
				"zoom" : 7
			},
			"Oklahoma" : {
				"lat" : 35.364942386676354,
				"lng" : -98.56889120156247,
				"zoom" : 7
			},
			"South Carolina" : {
				"lat" : 33.92794439297983,
				"lng" : -81.11710897499998,
				"zoom" : 7
			},
			"Idaho" : {
				"lat" : 45.33908637180679,
				"lng" : -115.40543905312494,
				"zoom" : 6
			},
			"Arkansas" : {
				"lat" : 34.626959175201485,
				"lng" : -91.77934042031247,
				"zoom" : 7
			},
			"South Dakota" : {
				"lat" : 44.30269212491957,
				"lng" : -99.46427694374997,
				"zoom" : 7
			},
			"North Dakota" : {
				"lat" : 47.363450749792214,
				"lng" : -100,
				"zoom" : 7
			},
			"Montana" : {
				"lat" : 46.930075175878436,
				"lng" : -110.25285116249997,
				"zoom" : 6
			},
			"Wyoming" : {
				"lat" : 43.111480467980975,
				"lng" : -107.18217245156247,
				"zoom" : 6
			},
			"Nebraska" : {
				"lat" : 41.346371258019644,
				"lng" : -99.24455038124997,
				"zoom" : 6
			},
			"Iowa" : {
				"lat" : 42.084434278086945,
				"lng" : -93.31742635781247,
				"zoom" : 7
			},
			"Alabama" : {
				"lat" : 32.900886359248034,
				"lng" : -86.36857381874998,
				"zoom" : 7
			},
			"Mississippi" : {
				"lat" : 31.88043818384802,
				"lng" : -89.31290975624998,
				"zoom" : 7
			},
			"Vermont" : {
				"lat" : 43.76164261693037,
				"lng" : -72.78123251015619,
				"zoom" : 7
			},
			"New Hampshire" : {
				"lat" : 43.27567570696476,
				"lng" : -71.0453926664062,
				"zoom" : 7
			},
			"Maine" : {
				"lat" : 45.242474137822235,
				"lng" : -68.51853719765619,
				"zoom" : 6
			}
		};

		stateLat = stateLocs[stateName].lat;
		stateLng = stateLocs[stateName].lng;
		stateZoom = stateLocs[stateName].zoom;

	} else {
		stateLat = 36.58072594811134;
		stateLng = -95.03431384999999;
		stateZoom = 4;
	}

	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
	layer_0.map.setCenter(new google.maps.LatLng(stateLat, stateLng));
	layer_0.map.setZoom(stateZoom);
}

//Updates map based on service area selection
function changeMap_area() {
	var whereClause;
	var areaName;
	var areaLocs;
	var areaLat;
	var areaLng;
	var areaZoom;
	var searchString = $("#search-string_area").val();
	if (searchString != '--Select--') {
		whereClause = "'Service Area' = '" + searchString + "'";
		areaName = $("#search-string_area option:selected").text();

		//JSON for area locations
		areaLocs = {
			"Eastern" : {
				"lat" : 37.90187792229758,
				"lng" : -70.65977161367186,
				"zoom" : 5
			},
			"Central" : {
				"lat" : 39.00310778756596,
				"lng" : -92.19297473867186,
				"zoom" : 5
			},
			"Western" : {
				"lat" : 40.77319393665586,
				"lng" : -116.36289661367186,
				"zoom" : 5
			}
		};
		areaLat = areaLocs[areaName].lat;
		areaLng = areaLocs[areaName].lng;
		areaZoom = areaLocs[areaName].zoom;
	} else {
		areaLat = 36.58072594811134;
		areaLng = -95.03431384999999;
		areaZoom = 4;
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
	layer_0.map.setCenter(new google.maps.LatLng(areaLat, areaLng));
	layer_0.map.setZoom(areaZoom);
}

/*
//Updates map based on region selection
function changeMap_region() {
var whereClause;
var searchString = document.getElementById('search-string_region').value.replace(/'/g, "\\'");
if (searchString != '--Select--') {
whereClause = "'Region' = '" + searchString + "'";
}
layer_0.setOptions({
query : {
select : "col10",
from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
where : whereClause
}
});
}
*/

/*
//Updates map based on city selection
function changeMap_city() {
var whereClause;
var searchString = document.getElementById('search-string_city').value.replace(/'/g, "\\'");
if (searchString != '--Select--') {
whereClause = "'City' = '" + searchString + "'";
}
layer_0.setOptions({
query : {
select : "col10",
from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
where : whereClause
}
});
}
*/

//This is similar to document ready (though not identical) and does not use jQuery
google.maps.event.addDomListener(window, 'load', initializeMap);

//Script for selecting share box
function SelectAll(id)
{
	$("#share-1").on("click", function(){
    	$("#share-1.share-input").focus();
    	$("#share-1.share-input").select();		
	});
	$("#share-2").on("click", function(){
    	$("#share-2.share-input").focus();
    	$("#share-2.share-input").select();		
	});
	$("#share-3").on("click", function(){
    	$("#share-3.share-input").focus();
    	$("#share-3.share-input").select();		
	});
	$("#share-4").on("click", function(){
    	$("#share-4.share-input").focus();
    	$("#share-4.share-input").select();		
	});
}

/*
 * DOCUMENT READY CALLS ALL NEEDED FUNCTIONS
 */
$(document).ready(function() {
	//Fires first story
	pageLoaded();
	st3_pageLoaded();
	SelectAll();
});
