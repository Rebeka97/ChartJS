window.addEventListener('load', makeCharts);

const config = {
  legend: {
    fontColor: "white",
    labels: {
      fontColor: 'white'
    }
  },
  scales: {
    xAxes: [{
      ticks: {
        fontColor: "white",
      }
    }],
    yAxes: [{
      ticks: {
        fontColor: "white",
        beginAtZero: true,
        suggestedMax: 275,
        stepSize: 25
      }
    }]
  }
};

async function makeCharts() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const ctxFest = document.getElementById('myChartFest').getContext('2d');
  const ctxElection = document.getElementById('myChartElection').getContext('2d');
  const data = await getData();
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: /*data.yearsUnique*/ Object.keys(data.octoberFest),
      datasets: [
        {
          label: 'OctoberFest',
          data: Object.values(data.octoberFest),
          fill: false,
          borderColor: 'rgba(156, 245, 66, 1)',
          backgroundColor: 'rgba(156, 245, 66, 0.5)',
          fontColor: 'white',
          borderWidth: 2
        },
        {
          label: 'Federal Election',
          data: Object.values(data.federalElection),
          fill: false,
          borderColor: 'rgba(66, 218, 245, 1)',
          backgroundColor: 'rgba(66, 218, 245, 0.5)',
          borderWidth: 2
        }
      ]
    },
    options: config
  });
  const myChartFest = new Chart(ctxFest, {
    type: 'bar',
    data: {
      labels: Object.keys(data.octoberFest),
      datasets: [
        {
          label: 'OctoberFest',
          data: Object.values(data.octoberFest),
          fill: false,
          borderColor: 'rgba(156, 245, 66, 1)',
          backgroundColor: 'rgba(156, 245, 66, 0.5)',
          fontColor: 'white',
          borderWidth: 2
        }
      ]
    },
    options: config
  });
  const myChartElection = new Chart(ctxElection, {
    type: 'bar',
    data: {
      labels: Object.keys(data.federalElection),
      datasets: [
        {
          label: 'Federal Election',
          data: Object.values(data.federalElection),
          fill: false,
          borderColor: 'rgba(66, 218, 245, 1)',
          backgroundColor: 'rgba(66, 218, 245, 0.5)',
          borderWidth: 2
        }
      ]
    },
    options: config
  });
}

async function getData() {
  const response = await fetch('./OctoberFest.csv');
  const data = (await response.text()).trim();
  //const years = [];
  const octoberFest = {}, federalElection = {};
  const rows = data.split('\n').slice(1);
  rows.forEach(row => {
    const cols = row.split(';');
    const year = cols[0], festNum = cols[3], electionNum = cols[4];
    //years.push(year);
    octoberFest[year] = (octoberFest[year] || 0) + Number(festNum); //A '|| 0' a legelső érték miatt kell különben undefined + number = NaN
    federalElection[year] = (federalElection[year] || 0) + Number(electionNum);
  });
  //yearsUnique = Array.from(new Set(years))
  return { /*yearsUnique,*/ octoberFest, federalElection };
}
