// window.addEventListener("DOMContentLoaded", () => {
//   const xValues = [];
//   const yValues = [];
//   const xMain = [];
//   const yMain = [];

//   Promise.all([
//     fetch('/api/temperatures/').then(res => res.json()),
//     fetch('/api/humidities/').then(res => res.json()),
//     fetch('/api/currents/').then(res => res.json()),
//     fetch('/api/voltages/').then(res => res.json())
//   ]).then(([tempData, humidityData, currentData, voltageData]) => {
//     const length1 = Math.min(tempData.length, humidityData.length);
//     const length2 = Math.min(currentData.length, voltageData.length);

//     for (let i = 0; i < length1; i++) {
//       xValues.push(tempData[i].temp);
//       yValues.push(humidityData[i].humidity);
//     }

//     for (let i = 0; i < length2; i++) {
//       xMain.push(currentData[i].current);
//       yMain.push(voltageData[i].voltage);
//     }

//     // Chart 1: Temperature vs Humidity
//     new Chart("myChart", {
//       type: "line",
//       data: {
//         labels: xValues,
//         datasets: [{
//           label: "Humidity vs Temperature",
//           fill: false,
//           backgroundColor: "balck",
//           borderColor: "darkblue",
//           data: yValues,
//           pointRadius: 4,
//           pointHoverRadius: 6
//         }]
//       },
//       options: {
//         scales: {
//           xAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: "Temperature (°C)",
//               fontColor: "black",
//               fontSize: 18
//             },
//             ticks: {
//               fontColor: "black",
//               fontSize: 16
//             }
//           }],
//           yAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: "Humidity (g/m³)",
//               fontColor: "black",
//               fontSize: 18
//             },
//             ticks: {
//               fontColor: "black",
//               fontSize: 16
//             }
//           }]
//         },
//         legend: {
//           labels: {
//             fontColor: "black",
//             fontSize: 20,
//             fontStyle: "bold"
//           }
//         }
//       }
//     });

//     // ✅ Chart 2: Voltage vs Current (must go here!)
//     new Chart("myCharting", {
//       type: "line",
//       data: {
//         labels: xMain,
//         datasets: [{
//           label: "Voltage vs Current",
//           fill: false,
//           backgroundColor: "black",
//           borderColor: "red",
//           data: yMain,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         }]
//       },
//       options: {
//         scales: {
//           xAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: "Current (A)",
//               fontColor: "black",
//               fontSize: 18
//             },
//             ticks: {
//               fontColor: "black",
//               fontSize: 16
//             }
//           }],
//           yAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: "Voltage (V)",
//               fontColor: "black",
//               fontSize: 18
//             },
//             ticks: {
//               fontClor: "black",
//               fontSize: 16,
//               stepSize:40,
//             }
//           }]
//         },
//         legend: {
//           labels: {
//             fontColor: "black",
//             fontSize: 20,
//             fontStyle: "bold"
//           }
//         }
//       }
//     });
//   });
// });



    //pie
    window.addEventListener("DOMContentLoaded", () => {
  const datesTempHum = [];
  const temperatures = [];
  const humidities = [];

  const datesVoltCurr = [];
  const currents = [];
  const voltages = [];

  Promise.all([
    fetch('/api/temperatures/').then(res => res.json()),
    fetch('/api/humidities/').then(res => res.json()),
    fetch('/api/currents/').then(res => res.json()),
    fetch('/api/voltages/').then(res => res.json())
  ]).then(([tempData, humidityData, currentData, voltageData]) => {
    
    const length1 = Math.min(tempData.length, humidityData.length);
    const length2 = Math.min(currentData.length, voltageData.length);

    // ✅ Prepare data for Temp & Humidity
    for (let i = 0; i < length1; i++) {
      const date = new Date(tempData[i].date).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      });

      datesTempHum.push(date);
      temperatures.push(tempData[i].temp);
      humidities.push(humidityData[i].humidity);
    }

    // ✅ Prepare data for Current & Voltage
    for (let i = 0; i < length2; i++) {
      const date = new Date(currentData[i].date).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      });

      datesVoltCurr.push(date);
      currents.push(currentData[i].current);
      voltages.push(voltageData[i].voltage);
    }

    // ✅ Chart 1: Temp vs Humidity
    new Chart("myChart", {
      type: "line",
      data: {
        labels: datesTempHum,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            borderColor: "rgba(248, 232, 5, 0.69)",
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: "Humidity (g/m³)",
            data: humidities,
            borderColor: "blue",
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: false,
              labelString: "Date",
              fontColor: "black",
              fontSize: 16
            },
            ticks: {
              fontColor: "black",
              fontSize: 14,
              autoSkip: true,
              maxRotation: 45,
              minRotation: 20
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Value",
              fontColor: "black",
              fontSize: 16
            },
            ticks: {
              fontColor: "black",
              fontSize: 14
            }
          }]
        },
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 16,
            fontStyle: "bold"
          }
        }
      }
    });

    // ✅ Chart 2: Current vs Voltage
    new Chart("myCharting", {
      type: "line",
      data: {
        labels: datesVoltCurr,
        datasets: [
          {
            label: "Current (A)",
            data: currents,
            borderColor: "green",
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: "Voltage (V)",
            data: voltages,
            borderColor: "purple",
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: false,
              labelString: "Date",
              fontColor: "black",
              fontSize: 16
            },
            ticks: {
              fontColor: "black",
              fontSize: 14,
              autoSkip: true,
              maxRotation: 45,
              minRotation: 20
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Value",
              fontColor: "black",
              fontSize: 16
            },
            ticks: {
              fontColor: "black",
              fontSize: 14
            }
          }]
        },
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 16,
            fontStyle: "bold"
          }
        }
      }
    });

  }).catch(error => {
    console.error("Error loading chart data:", error);
  });
});

    const xValue = ["Temperatue", "Humidity", "Voltage","Current"];
    const yValue = [55, 49, 44, 24];
      
    const barColors = [
      '#ff4f74', '#ffcd56', '#25a0f2', '#28a745', 'Blue',
    ];

    new Chart("p1", {
      type: "polarArea",
      data: {
      labels: xValue,
      datasets: [{
        backgroundColor: barColors,
        data: yValue
      }]
    },
    options: {
      responsive:true,
      maintainAspectRatio:false,
      title: {
        display: true,
        text: "Daily Report",
        fontColor:"Black"
      },
      legend:{
        display:false,
        labels:{
          fontColor:'white'
        }
      },
      scale: {
      ticks: {
        display: false  }
      }
    }
    });

    new Chart("p2", {
      type: "polarArea",
      data: {
      labels: xValue,
      datasets: [{
        backgroundColor: barColors,
        data: yValue
      }]
    },
    options: { 
      responsive:true,
      maintainAspectRatio:false,
      responsive:true,
      title: {
        display: true,
        text: "Weekly Report",
        fontColor:"Black"
      },
      legend:{
        display:false
      },
      scale: {
      ticks: {
        display: false  }
    }
    }
    });

    new Chart("p3", {
      
      type: "polarArea",
      data: {
      labels: xValue,
      datasets: [{
        backgroundColor: barColors,
        data: yValue
      }]
    },
    options: {
      responsive:true,
      maintainAspectRatio:false,
      title: {
        display: true,
        text: "Monthly Report",
        fontColor:"Black"
      },
      legend:{
        display:false
      },
      scale: {
      ticks: {
        display: false  }
    }
    }
    });

    new Chart("p4", {
      
      type: "polarArea",
      data: {
      labels: xValue,
      datasets: [{
        backgroundColor: barColors,
        data: yValue
      }]
    },
    options: { 
      responsive:true,
      maintainAspectRatio:false,
      title: {
        display: true,
        text: "Yearly Report",
        fontColor:"Black"
      },
      legend: {
          display: true,
          position: 'right', // ✅ Move legend to the right
          labels: {
            fontColor: 'black',
            fontSize: 14,
            boxWidth: 20,
            padding: 15
      },
    fullWidth: false // ✅ Prevents pushing legend to top
  },
      scale: {
      ticks: {
        display: false  }
    }
    }
    });

document.querySelectorAll(".pencil").forEach(pencil => {
  pencil.addEventListener("click", function (e) {
    e.preventDefault(); 

    const card = this.closest(".cards");
    const nameP = card.querySelector(".Name");
    const labelId = nameP.id;                 // like "1"
    const label = nameP.textContent.trim();   // like "Temperature"
    const cardId = card.id;                   // like "Card1"

    // Store info in localStorage
    localStorage.setItem("editingCardId", cardId);
    localStorage.setItem("editingLabelId", labelId);
    localStorage.setItem("editingLabel", label);

    // Redirect manually
    window.location.href = "/dashboard/edit/";
  });
});
// window.addEventListener("DOMContentLoaded", () => {
//   const units = {
//     "Current": "A",
//     "Temperature": "°C",
//     "Voltage": "V",
//     "Humidity": "g/m³"
//   };
//   fetch('/api/cards/')
//     .then(response => response.json())
//     .then(cards => {
//       cards.forEach(card => {
//         const cardDiv = document.getElementById(card.card_id);
//         if (!cardDiv) return;

//         const nameElement = cardDiv.querySelector(`.Name[id="${card.id}"]`);
//         if (nameElement) {
//           nameElement.textContent = card.name;
//         }
//         if(card.name ==='Temperature' || card.name ==='Humidity'){
          
//         }
//         const inputElement = cardDiv.querySelector(".input");
//         if (inputElement) {

//           const unit = units[card.name] || card.prop_type || "";
//           inputElement.textContent = `${card.value} ${unit}`;
//         }
//       });
//     })
//     .catch(error => {
//       console.error("Failed to load cards:", error);
//     });
// });


window.addEventListener("DOMContentLoaded", () => {
  const units = {
    "Current": "A",
    "Temperature": "°C",
    "Voltage": "V",
    "Humidity": "g/m³"
  };

  fetch('/api/cards/')
    .then(response => response.json())
    .then(async cards => {
      for (const card of cards) {
        const cardDiv = document.getElementById(card.card_id);
        if (!cardDiv) continue;

        const nameElement = cardDiv.querySelector(`.Name[id="${card.id}"]`);
        if (nameElement) {
          nameElement.textContent = card.name;
        }

        const inputElement = cardDiv.querySelector(".input");
        if (!inputElement) continue;

        let displayValue = card.value;
        let unit = units[card.name] || card.prop_type || "";

        if (card.name === "Temperature" || card.name === "Humidity") {
          try {
            const res = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi?unitGroup=metric&include=current&key=3M4M8HLCJ48G4G2MWXUYLR4W3&contentType=json");
            const weatherData = await res.json();
            const field = card.name === "Temperature" ? "temp" : "humidity";
            displayValue = weatherData.currentConditions[field];
          } catch (error) {
            console.error(`Failed to fetch live weather data for ${card.name}:`, error);
          }
        }

        inputElement.textContent = `${displayValue} ${unit}`;
      }
    })
    .catch(error => {
      console.error("Failed to load cards:", error);
    });
});



