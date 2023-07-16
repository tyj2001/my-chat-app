// Initialize the conversation history
var conversationHistory = [
    {role: 'system', content: 'You are a helpful assistant.'}
];

function sendMessage() {
    var inputBox = document.getElementById('inputBox');
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
    .then(response => response.json())
    .then(data => {
        // Add the assistant's message to the chat box and the history
        var assistantMessage = data['choices'][0]['message']['content'];
        chatbox.innerHTML += '<p><b>Assistant:</b> ' + assistantMessage + '</p>';
        chatbox.scrollTop = chatbox.scrollHeight;
        conversationHistory.push({role: 'assistant', content: assistantMessage});
    });
}

document.getElementById('inputBox').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

