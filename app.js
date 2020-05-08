let country = 'United Kingdom';

// GET STATISTICS
async function getStats() {
const response = await fetch(`https://covid19.mathdro.id/api/countries/${country}`);
const responseData = await response.json();

let confirmed = responseData.confirmed.value;
let deaths = responseData.deaths.value;
let recovered = responseData.recovered.value;
let lastUpdate = new Date(responseData.lastUpdate).toDateString();

// DATE
document.getElementById('lastUpdate').innerHTML = lastUpdate;

// COUNTING NUMBERS - countup.js
let options = {
useEasing: true,
useGrouping: true,
separator: ",",
decimal: '.',
};

let confirmedCountUp = new CountUp('confirmed', 0, confirmed, 0, 3, options);
let deathsCountUp= new CountUp('deaths', 0, deaths, 0, 3, options);
let recoveredCountUp = new CountUp('recovered', 0, recovered, 0, 3, options);

confirmedCountUp.start();
deathsCountUp.start();
recoveredCountUp.start();

// CHART
let myChart = document.getElementById("myChart").getContext("2d");
  if(window.bar != undefined) 
  window.bar.destroy(); 
    window.bar = new Chart(myChart, {
    type:'bar',
    data:{
      labels:['Infected', 'Deaths', 'Recovered'],
      datasets:[{
        label: `Currently in ${country}`, 
        backgroundColor: [
          'rgba(8,81,245, 0.6)', 
          'rgba(241,79,96, 0.6)',
          'rgba(34,169,113, 0.6)'
        ],
        data: [confirmed, deaths, recovered]
      }]
    },
    options:{
      title:{
        display: true,
        text: `Active cases, deaths and recoveries in ${country}`,
        fontSize: 22
      },
      legend:{
        display: false
      }
    }
  });
}

// GET THE COUNTRIES FUNCTION
function getCountries() {
  fetch('https://covid19.mathdro.id/api/countries/')
    .then(function(resp) {
        return resp.json();
    })

  // Map through countries object and get the country names
    .then(function(data) {
        let countryList = data.countries.map((country) => country.name);

  // Create options for select element
        for( let i = 0; i < countryList.length; i++) {
          let option = countryList[i];
          let element = document.createElement('option');
          element.textContent = option;
          element.value = option;
          countries.appendChild(element);
        }
    })
    .catch(err => console.log(err));
  }

// CHANGE LOCATION
document.getElementById('countries').addEventListener('change', (e) => {
  
  const countryOption = document.getElementById('countries').value;
  country = countryOption;

  getStats();

});

document.addEventListener('DOMContentLoaded', getCountries);
document.addEventListener('DOMContentLoaded', getStats);
