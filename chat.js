let username = localStorage.getItem("username");

if (!username) {
  username = prompt("Ingresa tu nombre de usuario:");
  localStorage.setItem("username", username);
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (message !== "") {
    const chat = JSON.parse(localStorage.getItem("chat")) || {};
    if (!chat[username]) chat[username] = [];
    chat[username].push({ from: username, message });
    localStorage.setItem("chat", JSON.stringify(chat));
    messageInput.value = "";
    loadMessages();
  }
}

function loadMessages() {
  const chat = JSON.parse(localStorage.getItem("chat")) || {};
  const messages = chat[username] || [];
  const chatBox = document.getElementById("chat");
  chatBox.innerHTML = "";

  messages.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = msg.from === username ? "outgoing_msg" : "incoming_msg";
    msgDiv.innerHTML = `
      <div class="${msg.from === username ? "sent_msg" : "received_msg"}">
        <p>${msg.message}</p>
      </div>
    `;
    chatBox.appendChild(msgDiv);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

loadMessages();
setInterval(loadMessages, 1000);
