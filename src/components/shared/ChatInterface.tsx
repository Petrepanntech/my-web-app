
"use client"
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search, Send, User, Bot, Users, LifeBuoy, Sparkles } from "lucide-react"
import { useAuth } from "@/context/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const conversationData = {
    "ai-buddy": {
        id: "ai-buddy",
        name: "Leo (AI Buddy)",
        type: "AI Buddy",
        icon: Bot,
        lastMessage: "Hi! I'm Leo, your AI learning buddy.",
        time: "Now",
        avatar: "https://placehold.co/50x50.png",
        messages: [
            { sender: "other", text: "Hi! I'm Leo, your AI learning buddy. How can I help you conquer your goals today?", time: "10:00 AM", avatar: "https://placehold.co/50x50.png" },
        ]
    },
    "community-chat": {
        id: "community-chat",
        name: "Community Chat",
        type: "Community",
        icon: Users,
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
    "samuel-adebayo": {
        id: "samuel-adebayo",
        name: "Samuel Adebayo",
        type: "Mentors",
        icon: Sparkles,
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
    "support": {
        id: "support",
        name: "Customer Support",
        type: "Support",
        icon: LifeBuoy,
        lastMessage: "Hello! How can we help you today?",
        time: "1h",
        avatar: "https://placehold.co/50x50.png",
        messages: [
            { sender: "other", text: "Hello! How can we help you today? Our team typically replies within 2 hours.", time: "9:15 AM", avatar: "https://placehold.co/50x50.png" }
        ]
    },
};


const conversationList = Object.values(conversationData);
const channelTypes = ["AI Buddy", "Community", "Mentors", "Support"];
const icons: { [key: string]: React.ElementType } = {
    "AI Buddy": Bot,
    "Community": Users,
    "Mentors": Sparkles,
    "Support": LifeBuoy,
}

export function ChatInterface({ initialActiveChatId }: { initialActiveChatId?: string }) {
    const { user } = useAuth();
    const [chats, setChats] = useState(conversationData);
    const [activeChatId, setActiveChatId] = useState(initialActiveChatId || "ai-buddy");
    const [newMessage, setNewMessage] = useState("");
    const [activeTab, setActiveTab] = useState(conversationData[activeChatId]?.type || "AI Buddy");

    const activeChat = chats[activeChatId];
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageToSend = {
            sender: "me",
            name: user?.name || "You",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: user?.avatar || ""
        };

        const updatedChat = {
            ...activeChat,
            messages: [...activeChat.messages, messageToSend],
            lastMessage: newMessage,
            time: "Now",
        };
        
        const updatedChats = {
            ...chats,
            [activeChatId]: updatedChat,
        };

        setChats(updatedChats);
        setNewMessage("");
    }

    const filteredConversations = conversationList.filter(c => c.type === activeTab);

    return (
        <div className="h-full flex bg-background">
             <div className="h-full flex flex-col w-full">
                <div className="p-2 border-b">
                    <div className="flex justify-around">
                        {channelTypes.map(tab => {
                            const Icon = icons[tab];
                            return (
                                <TooltipProvider key={tab}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                             <Button 
                                                variant={activeTab === tab ? "secondary" : "ghost"} 
                                                size="icon" 
                                                onClick={() => setActiveTab(tab)}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{tab}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </div>
                </div>
                <div className="flex-1 flex overflow-hidden">
                    <div className="w-1/3 border-r flex flex-col">
                         <ScrollArea className="flex-1">
                            {filteredConversations.map(convo => (
                                <div 
                                    key={convo.id} 
                                    className={cn("flex items-center gap-4 p-4 hover:bg-muted cursor-pointer", activeChatId === convo.id && "bg-muted")}
                                    onClick={() => setActiveChatId(convo.id)}
                                >
                                    <Avatar>
                                        <AvatarImage src={convo.avatar} alt={convo.name} />
                                        <AvatarFallback>{convo.name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-sm truncate">{convo.name}</p>
                                            <p className="text-xs text-muted-foreground shrink-0">{convo.time}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                    <div className="w-2/3 flex flex-col">
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
                                            {activeChat.type === 'Community' && msg.sender === 'other' && <p className="text-xs font-bold mb-1">{(msg as any).name}</p>}
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
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
            </div>
        </div>
    )
}
