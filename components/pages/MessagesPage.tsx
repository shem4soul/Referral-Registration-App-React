"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Info,
  MessageCircle,
} from "lucide-react";
import { initialMessages } from "@/lib/helper";

// ✅ Types
type MessageAttributeProps = {
  id: number;
  sender: string;
  text: string;
  time: string;
};

export type MessageTypes = {
  id: number;
  user: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: MessageAttributeProps[];
};

// ✅ Component
export function MessagesPage({
  messages: initialMsgs,
}: {
  messages?: MessageTypes[];
}) {
  const [messages, setMessages] = useState<MessageTypes[]>(initialMessages);
  const [selectedChat, setSelectedChat] = useState<MessageTypes | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Filtered messages (search)
  const filteredMessages = messages.filter(
    (msg) =>
      msg.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Send a new message
  const sendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: MessageAttributeProps = {
      id: selectedChat.messages.length + 1,
      sender: "me",
      text: messageText,
      time: "Just now",
    };

    // Update messages list
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedChat.id
          ? {
              ...msg,
              messages: [...msg.messages, newMessage],
              lastMessage: messageText,
              time: "Just now",
            }
          : msg
      )
    );

    // Update selected chat state
    setSelectedChat((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        : null
    );

    setMessageText("");
  };

  // ✅ Handle pressing Enter to send
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[90vh] -mt-10 fixed">
      <div className="grid lg:grid-cols-3 h-full">
        {/* Conversations List */}
        <Card className="lg:col-span-1 rounded-none border-l border-0 flex flex-col">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search in messages"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <CardContent className="space-y-2">
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedChat(msg)}
                  className={`w-full text-left p-3 transition-all hover:bg-accent ${
                    selectedChat?.id === msg.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{msg.avatar}</AvatarFallback>
                      </Avatar>
                      {msg.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm truncate">
                          {msg.user}
                        </p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {msg.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate">
                          {msg.lastMessage.slice(0, 35)+ "..."}
                        </p>
                        {msg.unread > 0 && (
                          <Badge variant="default" className="flex-shrink-0 bg-blue-600">
                            {msg.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 border-0 border-l rounded-none flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{selectedChat.avatar}</AvatarFallback>
                      </Avatar>
                      {selectedChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedChat.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "me"
                            ? "bg-blue-600 text-primary-foreground"
                            : "bg-accent"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "me"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <CardContent className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button className="bg-blue-600" onClick={sendMessage} disabled={!messageText.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">
                  Choose a message from the list to start chatting
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
