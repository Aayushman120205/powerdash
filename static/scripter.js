window.onload = function () {
document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const from = document.getElementById('from').value;
    const file = document.getElementById('file').files[0];
    const status = document.getElementById('status');

    if (!file) {
        status.textContent = 'Please select a photo';
        status.style.color = 'red';
        return;
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        status.textContent = 'Only image files (PNG, JPG, JPEG, GIF) are allowed';
        status.style.color = 'red';
        return;
    }

    if (file.size > 20 * 1024 * 1024) {
        status.textContent = 'Image too large (max 20MB)';
        status.style.color = 'red';
        return;
    }

    status.textContent = 'Sending...';
    status.style.color = 'black';

    const formData = new FormData();
    formData.append('from', from);
    formData.append('file', file);

    try {
        const response = await fetch('/api/send-email/', {
            method: 'POST',
            headers: {
        'X-CSRFToken': getCSRFToken(),
    },
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            status.textContent = 'Email sent successfully!';
            status.style.color = 'green';
            document.getElementById('emailForm').reset();
        } else {
            status.textContent = `Error: ${result.error}`;
            status.style.color = 'red';
        }
    } catch (error) {
        status.textContent = 'Error: Failed to send email';
        status.style.color = 'red';
    }
});
}

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