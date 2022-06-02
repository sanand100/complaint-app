//constants and query selectors
// let baseUrl =
// 	'https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=BRONX&agency=NYPD&$limit=10';
let baseUrl = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json';
// let brooklynBtn = document.querySelector('#BROOKLYN');
// let manhattanBtn = document.querySelector('#manhattan');
// let queensBtn = document.querySelector('#queens');
// let bronxBtn = document.querySelector('#bronx');
// let statenIslandBtn = document.querySelector('#staten-island');
const formEl = document.querySelector('.main-form');
let inputEl = document.querySelector('#numberOfComplaints');
let resultsEl = document.querySelector('.results');
let ulEl = document.querySelector('.results-list');

//click handler function
function getData(event) {
	event.preventDefault();
	if (event.target.tagName == 'BUTTON') {
		const borough = event.target.id;
		console.log(borough);
		let inputVal = inputEl.value;
		fetch(`${baseUrl}?borough=${borough}&agency=NYPD&$limit=${inputVal}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log('success', res);
				ulEl.innerHTML = '';
				res.forEach((crime) => {
					const newLi = document.createElement('li');
					newLi.setAttribute('class', 'policeActionLi');
					const newBtn = document.createElement('button');
					newBtn.setAttribute('class', 'policeActionBtn');
					newBtn.setAttribute('id', crime.unique_key);
					const newSpan = document.createElement('span');
					const newDiv = document.createElement('div');
					newSpan.innerText = crime.descriptor;
					newDiv.innerText = crime.resolution_description;
					newDiv.setAttribute('class', 'displayResolution hide');
					newLi.appendChild(newSpan);
					newBtn.innerText = 'What did the police do?';
					newLi.appendChild(newBtn);
					ulEl.appendChild(newLi);
					newLi.appendChild(newDiv);
				});
			});
	}
}

function displayResponse(event) {
	event.preventDefault;
	if (event.target.tagName == 'BUTTON') {
		const crimeGrp = event.target.closest('.policeActionLi');
		const resolutionDisplayDiv = crimeGrp.lastChild;
		if (resolutionDisplayDiv.classList.contains('hide')) {
			resolutionDisplayDiv.classList.remove('hide');
		} else {
			resolutionDisplayDiv.classList.add('hide');
		}
	}
}
//add event listener
formEl.addEventListener('click', getData);
resultsEl.addEventListener('click', displayResponse);
