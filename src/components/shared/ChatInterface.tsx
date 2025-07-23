
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search, Send, User } from "lucide-react"

const conversations = [
    { name: "Samuel Adebayo", lastMessage: "Yes, I can help with that. What's the deadline?", time: "2m", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" },
    { name: "Innovate Inc.", lastMessage: "The signed MOU has been uploaded.", time: "1h", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" },
    { name: "Aisha Nwosu", lastMessage: "Great work on the last milestone!", time: "5h", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=50&h=50&fit=crop" },
    { name: "Support Team", lastMessage: "Your payout has been processed.", time: "1d", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop" },
    { name: "Chinedu Okoro", lastMessage: "I have a question about the React course.", time: "2d", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop" },
]

const messages = [
    { sender: "other", text: "Hey! I saw your bid for the landing page project. Your portfolio looks great.", time: "10:00 AM" },
    { sender: "me", text: "Thanks! I'm really excited about the project. I have extensive experience with Next.js and conversion-focused design.", time: "10:01 AM" },
    { sender: "other", text: "Perfect. We need someone who can start immediately. Are you available?", time: "10:01 AM" },
    { sender: "me", text: "Yes, I can start as soon as we finalize the details. I've already reviewed the Figma file.", time: "10:02 AM" },
]

export function ChatInterface() {
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
                    {conversations.map(convo => (
                         <div key={convo.name} className="flex items-center gap-4 p-4 hover:bg-muted cursor-pointer">
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
                        <AvatarImage src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"} alt="Samuel Adebayo" />
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">Samuel Adebayo</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                             <div key={index} className={cn("flex items-end gap-2", msg.sender === 'me' ? 'justify-end' : '')}>
                                {msg.sender === 'other' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"} />
                                        <AvatarFallback>SA</AvatarFallback>
                                    </Avatar>
                                )}
                                 <div className={cn("rounded-lg p-3 max-w-xs lg:max-w-md", msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-12" />
                        <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
