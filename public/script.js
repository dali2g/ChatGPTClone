const inputBox = document.querySelector('.inputbox input');
const chatArea = document.querySelector('.chat-area');

inputBox.addEventListener('keyup', function(e){
    if(e.key === 'Enter' && inputBox.value !== ''){
        sendMessage(inputBox.value);
    }
});

function sendMessage(message){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/message', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            inputBox.value = '';
            let chatBubble = document.createElement('div');
            chatBubble.classList.add('chat-bubble', 'user');
            chatBubble.innerHTML = `
                <p>${message}</p>
            `;
            chatArea.appendChild(chatBubble);
            let response = JSON.parse(this.responseText);
            let chatBubble2 = document.createElement('div');
            chatBubble2.classList.add('chat-bubble', 'bot');
            chatBubble2.innerHTML = `
                <p>${response.message}</p>
            `;
            chatArea.appendChild(chatBubble2);
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    };
    let data = JSON.stringify({"message": message});
    xhr.send(data);
}
