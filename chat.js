function sendMessage() {
    var inputBox = document.getElementById('inputBox');
    var message = inputBox.value;
    inputBox.value = '';

    // Add the user's message to the chat box
    var chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += '<p><b>You:</b> ' + message + '</p>';

    // Send the message to the server
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: message }]
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Add the assistant's message to the chat box
        chatbox.innerHTML += '<p><b>Assistant:</b> ' + data['choices'][0]['message']['content'] + '</p>';
        chatbox.scrollTop = chatbox.scrollHeight;
    });
}

document.getElementById('inputBox').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
