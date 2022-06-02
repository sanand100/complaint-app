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
				let crimeName = [];
				for (i = 0; i < res.length; i++) {
					crimeName.push(res[i].descriptor);
				}
				ulEl.innerHTML = '';
				crimeName.forEach((crime) => {
					const newLi = document.createElement('li');
					newLi.setAttribute('class', 'policeActionLi');
					const newBtn = document.createElement('button');
					newBtn.setAttribute('class', 'policeActionBtn');
					const newSpan = document.createElement('span');
					newSpan.innerText = crime;
					newLi.appendChild(newSpan);
					newBtn.innerText = 'What did the police do?';
					newLi.appendChild(newBtn);
					ulEl.appendChild(newLi);
				});
			});
	}
}
//add event listener
formEl.addEventListener('click', getData);
