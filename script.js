document.getElementById('incident-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('subject', document.getElementById('subject').value);
  formData.append('site_name', document.getElementById('site-name').value);
  formData.append('contact_person', document.getElementById('contact-person').value);
  formData.append('site_manager', document.getElementById('site-manager').value);
  formData.append('reported_by', document.getElementById('reported-by').value);
  formData.append('date', document.getElementById('date').value);
  formData.append('time', document.getElementById('time').value);
  formData.append('incident_type', document.getElementById('incident-type').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('action_taken', document.getElementById('action-taken').value);
  
  // Check if file is selected
  const fileInput = document.getElementById('incident-file');
  if (fileInput.files.length > 0) {
    formData.append('incident_file', fileInput.files[0]);
  } else {
    console.error('No file selected.');
    alert('Please select a file to upload.');
    return; // Stop form submission if no file is selected
  }

  // Log FormData to verify content
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  fetch('http://localhost:5000/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.blob(); // Get the response as a blob
    } else {
      throw new Error('Error generating report');
    }
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob); // Create a temporary URL for the blob
    const link = document.createElement('a'); // Create a download link
    link.href = url;
    link.setAttribute('download', 'incident_report.pdf'); // Set the file name for download
    document.body.appendChild(link);
    link.click(); // Programmatically click the link to start download
    link.parentNode.removeChild(link); // Clean up the link
    console.log('PDF downloaded successfully'); // Debugging statement
  })
  .catch(error => {
    console.error('Error:', error); // Error logging
    alert('Error generating report. Please try again.');
  });
});
