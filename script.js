window.addEventListener('load', makeChart);

async function makeChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
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
    options: {
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
          }
        }]
      }
    }
  });
}

async function getData() {
  const response = await fetch('./OctoberFest.csv');
  const data = (await response.text()).trim();
  //const years = [];
  const octoberFest = {}, federalElection = {};
  const rows = data.split('\n').slice(1);
  rows.forEach(row => {
    const fields = row.split(';');
    let year = fields[0];
    let festNum = fields[3];
    let electionNum = fields[4];
    //years.push(year);
    octoberFest[year] = (octoberFest[year] || 0) + Number(festNum); //A '|| 0' a legelső érték miatt kell mert undefined + number = NaN
    federalElection[year] = (federalElection[year] || 0) + Number(electionNum);
  });
  //yearsUnique = Array.from(new Set(years))
  return { /*yearsUnique,*/ octoberFest, federalElection };
}
