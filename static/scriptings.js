// document.addEventListener("DOMContentLoaded", () => {
//   const submitBtn = document.querySelector(".submit");
//   const valueInput = document.getElementById("value-input");
//   const dataSelect = document.getElementById("data-select");

//   const dashboardUrl = document.body.dataset.dashboardUrl;

//   const apiMap = {
//     Temperature: "http://192.169.5.232:8000/api/temperatures/",
//     Humidity: "http://192.169.5.232:8000/api/humidities/",
//     Voltage: "http://192.169.5.232:8000/api/voltages/",
//     Current: "http://192.169.5.232:8000/api/currents/"
//   };

//   const fieldMap = {
//     Temperature: "temp",
//     Humidity: "humidity",
//     Voltage: "voltage",
//     Current: "current"
//   };

//   const unitMap = {
//     Temperature: "°C",
//     Humidity: "g/m³",
//     Voltage: "V",
//     Current: "A"
//   };

//   submitBtn.addEventListener("click", async () => {
//     const newLabel = dataSelect.value;
//     const userValue = valueInput.value;
//     const cardId = localStorage.getItem("editingCardId");
//     const labelId = localStorage.getItem("editingLabelId");

//     if (!newLabel || !cardId || !labelId) {
//       alert("Missing required data!");
//       return;
//     }

//     const postUrl = apiMap[newLabel];
//     const fieldName = fieldMap[newLabel];
//     let latestValue = null;

//     try {
//       // If value is entered, post it
//       if (userValue) {
//         const postPayload = {
//           [fieldName]: parseFloat(userValue),
//           date: new Date().toISOString()
//         };

//         await fetch(postUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": getCSRFToken()
//           },
//           body: JSON.stringify(postPayload)
//         });

//         latestValue = parseFloat(userValue);
//       } else {
//   let res;
//   let latestValue;

//   if (fieldName === 'temp' || fieldName === 'humidity') {
//     res = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi?unitGroup=metric&include=current&key=3M4M8HLCJ48G4G2MWXUYLR4W3&contentType=json");
//     const data = await res.json();

//     // ✅ FIX: Access currentConditions correctly (it's an object)
//     latestValue = data.currentConditions[fieldName];
//   } else {
//     res = await fetch("postUrl");
//     const data = await res.json();

//     if (!data.length) {
//       alert("No data available in the database!");
//       return;
//     }

//     latestValue = data[data.length - 1][fieldName];
//   }

//   // ✅ Now you can use `latestValue`
//   console.log(`Latest ${fieldName}:`, latestValue);
// }
//       // Now update the card with this value
//       const updatePayload = {
//         card_id: cardId,
//         name: newLabel,
//         value: latestValue,
//         prop_type: unitMap[newLabel]
//       };

//       await fetch(`http://192.169.5.232:8000/api/cards/${labelId}/`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": getCSRFToken()
//         },
//         body: JSON.stringify(updatePayload)
//       });

//       window.location.href = dashboardUrl;
//     } catch (error) {
//       console.error("Error during submission:", error);
//       alert("Something went wrong.");
//     }
//   });
// });

// // Helper to get CSRF token
// function getCSRFToken() {
//   const name = "csrftoken=";
//   const decoded = decodeURIComponent(document.cookie);
//   const parts = decoded.split(";");
//   for (let c of parts) {
//     c = c.trim();
//     if (c.startsWith(name)) return c.slice(name.length);
//   }
//   return "";
// }
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit");
  const valueInput = document.getElementById("value-input");
  const dataSelect = document.getElementById("data-select");

  const dashboardUrl = document.body.dataset.dashboardUrl;

  const apiMap = {
    Temperature: "http://192.169.5.232:8000/api/temperatures/",
    Humidity: "http://192.169.5.232:8000/api/humidities/",
    Voltage: "http://192.169.5.232:8000/api/voltages/",
    Current: "http://192.169.5.232:8000/api/currents/"
  };

  const fieldMap = {
    Temperature: "temp",
    Humidity: "humidity",
    Voltage: "voltage",
    Current: "current"
  };

  const unitMap = {
    Temperature: "°C",
    Humidity: "g/m³",
    Voltage: "V",
    Current: "A"
  };

  submitBtn.addEventListener("click", async () => {
    const newLabel = dataSelect.value;
    const userValue = valueInput.value;
    const cardId = localStorage.getItem("editingCardId");
    const labelId = localStorage.getItem("editingLabelId");

    if (!newLabel || !cardId || !labelId) {
      alert("Missing required data!");
      return;
    }

    const postUrl = apiMap[newLabel];
    const fieldName = fieldMap[newLabel];
    let latestValue = null;

    try {
      if (userValue) {
        // If user manually enters a value
        const postPayload = {
          [fieldName]: parseFloat(userValue),
          date: new Date().toISOString()
        };

        await fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
          },
          body: JSON.stringify(postPayload)
        });

        latestValue = parseFloat(userValue);
      } else {
        // Auto-fetch latest value if none entered manually
        let res;
        if (fieldName === 'temp' || fieldName === 'humidity') {
          res = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi?unitGroup=metric&include=current&key=3M4M8HLCJ48G4G2MWXUYLR4W3&contentType=json");
          const data = await res.json();
          latestValue = data.currentConditions[fieldName];
        } else {
          res = await fetch(postUrl);
          const data = await res.json();

          if (!data.length) {
            alert("No data available in the database!");
            return;
          }

          latestValue = data[data.length - 1][fieldName];
        }
      }

      // Update card with latest value
      const updatePayload = {
        card_id: cardId,
        name: newLabel,
        value: latestValue,
        prop_type: unitMap[newLabel]
      };

      await fetch(`http://192.169.5.232:8000/api/cards/${labelId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify(updatePayload)
      });

      window.location.href = '/dashboard/';
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Something went wrong.");
    }
  });
});

// Helper to get CSRF token
function getCSRFToken() {
  const name = "csrftoken=";
  const decoded = decodeURIComponent(document.cookie);
  const parts = decoded.split(";");
  for (let c of parts) {
    c = c.trim();
    if (c.startsWith(name)) return c.slice(name.length);
  }
  return "";
}
