import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  lastMessage: string;
}

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule],
})
export class ChatComponent {
  users: User[] = [
    { name: 'Alice', lastMessage: 'Hello!' },
    { name: 'Bob', lastMessage: 'Hey!' },
    { name: 'Charlie', lastMessage: 'How are you?' }
  ];

  messages: Message[] = [
    { sender: 'Alice', content: 'Hello!', timestamp: new Date() },
    { sender: 'me', content: 'Hi Alice!', timestamp: new Date() },
    { sender: 'Bob', content: 'Hey everyone!', timestamp: new Date() },
    { sender: 'me', content: 'Hi Bob!', timestamp: new Date() }
  ];

  selectedUser: User | null = null;
  newMessage: string = '';

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'me', content: this.newMessage, timestamp: new Date() });
      this.newMessage = '';
    }
  }
}
