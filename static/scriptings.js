document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit");
  const valueInput = document.getElementById("value-input");
  const dataSelect = document.getElementById("data-select");

  const BASE_URL = window.location.origin;

  const apiMap = {
    Temperature: `${BASE_URL}/api/temperatures/`,
    Humidity: `${BASE_URL}/api/humidities/`,
    Voltage: `${BASE_URL}/api/voltages/`,
    Current: `${BASE_URL}/api/currents/`
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

      const updatePayload = {
        card_id: cardId,
        name: newLabel,
        value: latestValue,
        prop_type: unitMap[newLabel]
      };

      await fetch(`${BASE_URL}/api/cards/${labelId}/`, {
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
