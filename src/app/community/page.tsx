
"use client"
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const posts = [
    { author: 'Chinedu Okoro', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop', content: 'Just finished the advanced React module. It was challenging but so rewarding! Anyone else working on their final project?', timestamp: '2h ago' },
    { author: 'Adeola Peters', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop', content: 'Looking for a collaborator on a freelance UI/UX project. It involves creating a mobile app for a local startup. DM me if interested!', timestamp: '5h ago' },
    { author: 'Samuel Adebayo', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop', content: 'The new CBT practice section is amazing for JAMB prep. Highly recommend checking it out if you have exams coming up.', timestamp: '1d ago' },
];

export default function CommunityHubPage() {
    return (
        <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Community Hub</h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Connect, collaborate, and grow with your peers.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Create a Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea placeholder="Share what's on your mind..." />
                        <Button>Post</Button>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {posts.map(post => (
                        <Card key={post.author}>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={post.avatar} alt={post.author} />
                                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{post.author}</p>
                                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                                        </div>
                                        <p className="mt-2 text-sm text-foreground/90">{post.content}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
