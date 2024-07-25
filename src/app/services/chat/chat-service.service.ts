import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { }

  getMessages() {
    return [
      { sender: 'Alice', content: 'Hi, how are you?', timestamp: new Date() },
      { sender: 'Bob', content: 'I am good, thanks! How about you?', timestamp: new Date() },
      { sender: 'Alice', content: 'I am great, thanks for asking!', timestamp: new Date() }
      // Add more messages as needed
    ];
  }

  sendMessage(message: { sender: string, content: string, timestamp: Date }) {
    // Mock sending a message. In a real application, you'd send this to your server.
    console.log('Message sent:', message);
  }
}
