
"use client"
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { moderateText } from '@/lib/actions';
import { useAuth } from '@/context/AuthContext';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const initialPosts: Post[] = [
    { id: 1, author: 'Chinedu Okoro', avatar: 'https://i.pravatar.cc/150?u=chinedu', content: 'Just finished the advanced React module. It was challenging but so rewarding! Anyone else working on their final project?', timestamp: '2h ago' },
    { id: 2, author: 'Adeola Peters', avatar: 'https://i.pravatar.cc/150?u=adeola', content: 'Looking for a collaborator on a freelance UI/UX project. It involves creating a mobile app for a local startup. DM me if interested!', timestamp: '5h ago' },
    { id: 3, author: 'Samuel Adebayo', avatar: 'https://i.pravatar.cc/150?u=samuel', content: 'The new CBT practice section is amazing for JAMB prep. Highly recommend checking it out if you have exams coming up.', timestamp: '1d ago' },
    { id: 4, author: 'Aisha Nwosu', avatar: 'https://i.pravatar.cc/150?u=aisha', content: 'Quick question for the design experts: What are your go-to resources for high-quality, free-to-use illustrations?', timestamp: '2d ago' },
    { id: 5, author: 'Tunde Oladipo', avatar: 'https://i.pravatar.cc/150?u=tunde', content: 'The digital marketing course gave me the confidence to start my own agency. To anyone on the fence, just go for it!', timestamp: '3d ago' },
    { id: 6, author: 'Fatima Bello', avatar: 'https://i.pravatar.cc/150?u=fatima', content: 'Does anyone have experience with payment gateway integration in Nigeria? Specifically Paystack vs Flutterwave for a small e-commerce site.', timestamp: '4d ago' },
    { id: 7, author: 'Student User', avatar: 'https://i.pravatar.cc/150?u=student', content: 'My AI-generated learning path suggested I learn Python for data analysis. It feels perfectly tailored to my goal of becoming a data scientist.', timestamp: '5d ago' },
];


export default function CommunityHubPage() {
    const { isAuthenticated, user, setShowAuthModal } = useAuth();
    const [posts, setPosts] = useState(initialPosts);
    const [newPost, setNewPost] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!newPost.trim()) return;
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const moderationResult = await moderateText({ text: newPost });
            
            if (moderationResult.isSafe) {
                const postToAdd: Post = {
                    id: Date.now(),
                    author: user?.name || "Anonymous",
                    avatar: user?.avatar || "",
                    content: newPost,
                    timestamp: 'Just now'
                };
                setPosts(prev => [postToAdd, ...prev]);
                setNewPost('');
                toast({ title: 'Success', description: 'Your post has been published.' });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Post Moderated',
                    description: `Your post could not be published. Reason: ${moderationResult.reason || 'Content violates community guidelines.'}`
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not submit post. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <Textarea 
                            placeholder="Share what's on your mind..." 
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            disabled={!isAuthenticated || isSubmitting}
                        />
                        <Button onClick={handleSubmit} disabled={isSubmitting || !newPost.trim()}>
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </Button>
                        {!isAuthenticated && <p className="text-sm text-muted-foreground">Please <Button variant="link" className="p-0 h-auto" onClick={() => setShowAuthModal(true)}>login</Button> to post.</p>}
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {posts.map(post => (
                        <Card key={post.id}>
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
