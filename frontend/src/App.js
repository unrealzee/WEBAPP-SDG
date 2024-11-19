// frontend/src/components/ChatInterface.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to chat
        const newMessages = [...messages, { 
            text: message, 
            sender: 'user' 
        }];
        setMessages(newMessages);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/chat', { 
                message 
            });

            // Add AI response to chat
            setMessages(prevMessages => [...prevMessages, { 
                text: response.data.response, 
                sender: 'ai' 
            }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prevMessages => [...prevMessages, { 
                text: 'Error generating response', 
                sender: 'system' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-interface">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && <div className="loading">Generating response...</div>}
            </div>
            <div className="message-input">
                <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatInterface;