// form submit listener
document.getElementById('customForm').addEventListener('submit', addWebsite);

function addWebsite(e) {
	console.log('this is bobz');
	// get values from inputs
	var websiteName = document.getElementById('siteName').value;
	var websiteURL = document.getElementById('siteURL').value;

	if(!websiteName || !websiteURL) {
		alert("Please fill in the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!websiteURL.match(regex)) {
		alert("Please insert a valid URL");
		return false;
	}

	var website = {
		name: websiteName,
		url: websiteURL
	}

	if(localStorage.getItem('websites') === null) {
		var websites = [];
		websites.push(website);
		localStorage.setItem('websites', JSON.stringify(websites));
	} else {
		var websites = JSON.parse(localStorage.getItem('websites'));
		websites.push(website);
		localStorage.setItem('websites', JSON.stringify(websites));
	}
	document.getElementById('siteName').value = "";
	document.getElementById('siteURL').value = "";
	fetchWebsites();
	// prevent the default submitting of the form
	e.preventDefault();
}

function removeWebsite(url) {
	var websites = JSON.parse(localStorage.getItem('websites'));
	for (var i=0; i<websites.length; i++) {
		if(websites[i].url == url) {
			websites.splice(i, 1);
		}
	}
	localStorage.setItem('websites', JSON.stringify(websites));
	fetchWebsites();
}

function fetchWebsites() {
	var websites = JSON.parse(localStorage.getItem('websites'));
	var results = document.getElementById('results');
	results.innerHTML = "";
	for(var i = 0; i < websites.length; i++) {
		var name = websites[i].name;
		var url = websites[i].url;
		results.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary" target="_blank" href="'+url+'">Open</a> ' +
                                  ' <a onclick="removeWebsite(\''+url+'\')" class="btn btn-danger" href="#">Remove</a> ' +
                                  '</h3>'+
                                  '</div>';

	}
}