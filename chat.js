var conversationHistory = [];

function sendMessage() {
  var inputBox = document.getElementById('username');
  var message = inputBox.value;
  inputBox.value = '';

  // Add the user's message to the chat box and the history
  var chatbox = document.getElementById('chatbox');
  chatbox.innerHTML += '<p><b>You:</b> ' + message + '</p>';
  conversationHistory.push({role: 'user', content: message});

  // Send the message to the server
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: conversationHistory
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Add the assistant's message to the chat box and the history
    var assistantMessage = data['choices'][0]['message']['content'];
    chatbox.innerHTML += '<p><b>Assistant:</b> ' + assistantMessage + '</p>';
    chatbox.scrollTop = chatbox.scrollHeight;
    conversationHistory.push({role: 'assistant', content: assistantMessage});
  })
  .catch(error => {
    console.error('Error:', error);
    chatbox.innerHTML += '<p><b>System:</b> An error occurred. Please try again later.</p>';
  });
}

document.getElementById('inputBox').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission
    sendMessage();
  }
});
