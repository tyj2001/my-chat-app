<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Application</title>
  <style>
    .form-item {
      width: 200px;
      position: relative;
      left: 30%;
      top: 100px;
    }

    .username-txt {
      box-sizing: border-box;
      outline: none;
      padding: 0;
      width: 200px;
      height: 50px;
      border: 0;
      border-bottom: 2px solid #ccc;
      font-size: 16px;
    }

    .line {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      display: inline-block;
      width: 0;
      border-bottom: 2px solid #5264ae;
      transition: 0.4s ease;
    }

    label {
      position: absolute;
      left: 0;
      line-height: 50px;
      color: #ccc;
      transition: 0.4s ease;
    }

    .username-txt:focus~label,
    .username-txt:valid~label {
      transform: translateY(-30px);
      font-size: 14px;
    }

    .username-txt:focus~.line,
    .username-txt:valid~.line {
      width: 200px;
    }

    #chatbox {
      height: 300px;
      width: 300px;
      overflow-y: scroll;
      border: 1px solid black;
      margin-bottom: 10px;
    }
  </style>
</head>

<body>
  <div id="chatbox">
    <!-- Messages will be appended here -->
  </div>

  <div class="form-item">
    <input required autocomplete="off" type="text" id="inputBox" class="username-txt">
    <span class="line"></span>
    <label for="inputBox">Type your message...</label>
  </div>

  <script>
    var conversationHistory = [];

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
  </script>
</body>

</html>
