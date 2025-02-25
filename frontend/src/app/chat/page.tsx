// app/chat/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { Send, LogOut } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { user, logout } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
    setSocket(socketInstance);

    socketInstance.on('receiveMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !socket || !user) return;

    const messageData: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: user._id,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary p-4 border-b border-primary flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Real-time Chat</h1>
          <div className="flex items-center gap-4">
            <span className="text-white/70">Hello, {user?.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-primary text-white hover:bg-primary/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === user?._id ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-lg ${message.sender === user?._id
                    ? 'bg-accent text-white rounded-br-none'
                    : 'bg-secondary text-white rounded-bl-none'
                  }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-primary bg-secondary"
        >
          <div className="flex gap-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-background border-primary focus:border-accent"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}