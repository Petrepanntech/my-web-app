

"use client"
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search, Send, User } from "lucide-react"

const conversationData = {
    "samuel-adebayo": {
        id: "samuel-adebayo",
        name: "Samuel Adebayo",
        lastMessage: "Yes, I can help with that. What's the deadline?",
        time: "2m",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
        messages: [
            { sender: "other", text: "Hey! I'm your assigned mentor, Samuel. I saw you just started the React course. How's it going so far?", time: "10:00 AM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" },
            { sender: "me", text: "Hi Samuel! Thanks for reaching out. It's going well, but I'm a bit confused about the `useEffect` hook.", time: "10:01 AM", avatar: "" },
            { sender: "other", text: "That's a common sticking point. Think of it as a way to handle side effects, like fetching data or subscribing to events, after the component renders. Have you seen the curated video on it in Module 2?", time: "10:01 AM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" },
            { sender: "me", text: "Oh, I haven't watched that yet. I'll check it out now. Thanks for the tip!", time: "10:02 AM", avatar: "" },
        ]
    },
    "community-chat": {
        id: "community-chat",
        name: "Community Chat",
        lastMessage: "The new CBT practice section is amazing!",
        time: "5m",
        avatar: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=50&h=50&fit=crop",
        messages: [
            { sender: "other", name: "Chinedu Okoro", text: "Just finished the advanced React module. It was challenging but so rewarding! Anyone else working on their final project?", time: "10:30 AM", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop" },
            { sender: "other", name: "Adeola Peters", text: "Looking for a collaborator on a freelance UI/UX project. It involves creating a mobile app for a local startup. DM me if interested!", time: "10:32 AM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
            { sender: "me", name: "You", text: "I'm interested in the UI/UX project! What's the scope?", time: "10:33 AM", avatar: "" },
            { sender: "other", name: "Samuel Adebayo", text: "The new CBT practice section is amazing for JAMB prep. Highly recommend checking it out if you have exams coming up.", time: "10:35 AM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" },
        ]
    },
    "innovate-inc": {
        id: "innovate-inc",
        name: "Innovate Inc.",
        lastMessage: "The signed MOU has been uploaded.",
        time: "1h",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
        messages: [
            { sender: "other", text: "The signed MOU has been uploaded.", time: "9:15 AM", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" }
        ]
    },
    "aisha-nwosu": {
        id: "aisha-nwosu",
        name: "Aisha Nwosu",
        lastMessage: "Great work on the last milestone!",
        time: "5h",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=50&h=50&fit=crop",
        messages: [
             { sender: "other", text: "Great work on the last milestone!", time: "5:30 AM", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=50&h=50&fit=crop" }
        ]
    },
};

const conversationList = Object.values(conversationData);

export function ChatInterface({ isCommunity = false }: { isCommunity?: boolean }) {
    const [chats, setChats] = useState(conversationData);
    const [activeChatId, setActiveChatId] = useState(isCommunity ? "community-chat" : "samuel-adebayo");
    const [newMessage, setNewMessage] = useState("");

    const activeChat = chats[activeChatId];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageToSend = {
            sender: "me",
            name: "You",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: "" // Current user avatar can be added here
        };

        const updatedChat = {
            ...activeChat,
            messages: [...activeChat.messages, messageToSend]
        };
        
        const updatedChats = {
            ...chats,
            [activeChatId]: updatedChat,
        };

        setChats(updatedChats);
        setNewMessage("");
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex">
            <div className="hidden md:flex flex-col w-1/4 border-r">
                <div className="p-4 border-b">
                     <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search chats..." className="pl-8" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    {conversationList.map(convo => (
                         <div 
                            key={convo.id} 
                            className={cn("flex items-center gap-4 p-4 hover:bg-muted cursor-pointer", activeChatId === convo.id && "bg-muted")}
                            onClick={() => setActiveChatId(convo.id)}
                        >
                            <Avatar>
                                <AvatarImage src={convo.avatar} alt={convo.name} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="font-semibold">{convo.name}</p>
                                    <p className="text-xs text-muted-foreground">{convo.time}</p>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
                        <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{activeChat.name}</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        {activeChat.messages.map((msg, index) => (
                             <div key={index} className={cn("flex items-end gap-2", msg.sender === 'me' ? 'justify-end' : '')}>
                                {msg.sender === 'other' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={msg.avatar} />
                                        <AvatarFallback>{(msg as any).name?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                )}
                                 <div className={cn("rounded-lg p-3 max-w-xs lg:max-w-md", msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    {isCommunity && msg.sender === 'other' && <p className="text-xs font-bold mb-1">{(msg as any).name}</p>}
                                    <p className="text-sm">{msg.text}</p>
                                    <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="relative">
                        <Input 
                            placeholder="Type a message..." 
                            className="pr-12"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
