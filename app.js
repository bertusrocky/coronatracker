// DEFAULT COUNTRY
let country = 'United Kingdom';

// GLOBAL CHART STYLES
Chart.defaults.global.defaultFontSize	= 16;
Chart.defaults.global.defaultFontFamily	= "'Roboto', 'sans-serif'";

// GET GLOBAL DATA
async function getGlobal() {
  const response = await fetch('https://covid19.mathdro.id/api');
  const responseData = await response.json();

  let confirmed = responseData.confirmed.value;
  let deaths = responseData.deaths.value;
  let recovered = responseData.recovered.value;

  //PIE CHART
  let myChart = document.getElementById("globalChart").getContext("2d");
  let globalChart = new Chart(myChart, {
    type:'doughnut',
    data:{
      labels:['COVID-19 Cases', 'Deaths', 'Recovered'],
      datasets:[{
        label: 'Global', 
        backgroundColor: [
          'rgba(255,165,0, 0.7)', 
          'rgb(255,0,0, 0.7)',
          'rgba(0,128,0, 0.7)'
        ],
        data: [confirmed, deaths, recovered]
      }]
    },
    options:{
      title:{
        display: false,
        text: 'Global Cases',
        fontSize: 26
      },
      legend:{
        display: true,
        position: 'left',
        align: 'center',
        labels:{
          fontSize: 16,
          fontColor: '#333333',
          fontStyle: '600'
        }
      }
    }
  });
  
  // COUNTING NUMBERS
  let options = {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: '.',
    };
    
    let confirmedCountUp = new CountUp('globalConfirmed', 0, confirmed, 0, 3, options);
    let deathsCountUp= new CountUp('globalDeaths', 0, deaths, 0, 3, options);
    let recoveredCountUp = new CountUp('globalRecovered', 0, recovered, 0, 3, options);
    
    confirmedCountUp.start();
    deathsCountUp.start();
    recoveredCountUp.start();
}


// GET COUNTRY STATS
async function getStats() {
const response = await fetch(`https://covid19.mathdro.id/api/countries/${country}`);
const responseData = await response.json();

let confirmed = responseData.confirmed.value;
let deaths = responseData.deaths.value;
let recovered = responseData.recovered.value;
let lastUpdate = "Last updated: " + new Date(responseData.lastUpdate).toGMTString();

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

// BAR CHART
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
          'rgba(255,165,0, 0.7)', 
          'rgb(255,0,0, 0.7)',
          'rgba(0,128,0, 0.7)'
        ],
        data: [confirmed, deaths, recovered]
      }]
    },
    options:{
      title:{
        display: true,
        text: `${country}`,
        fontSize: 23,
        fontFamily: "'Roboto', sans-serif",
        fontColor: '#333333'
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
    .then(function(data) {
        let countryList = data.countries.map((country) => country.name);

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

// RUN FUNCTIONS WHEN CONTENT IS LOADED
document.addEventListener('DOMContentLoaded', getGlobal);
document.addEventListener('DOMContentLoaded', getCountries);
document.addEventListener('DOMContentLoaded', getStats);
