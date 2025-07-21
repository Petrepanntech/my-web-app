
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { allQuestions, type Question } from "@/lib/cbt-questions";
import { useToast } from "@/hooks/use-toast";
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { AlertTriangle, CheckCircle, Timer } from "lucide-react";

const TEST_DURATION_MINUTES = 30;

export default function CbtTestPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const testType = Array.isArray(params.test) ? params.test[0] : params.test;
  const questions = allQuestions.slice(0, 20); // Using first 20 questions for this demo

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_MINUTES * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (autoSubmitted = false) => {
    // Store results in localStorage to pass to the results page
    localStorage.setItem("cbtResults", JSON.stringify({
        answers: selectedAnswers,
        questions: questions,
        testType: testType
    }));
    if (autoSubmitted) {
        toast({
            title: "Time's Up!",
            description: "Your test has been automatically submitted.",
            variant: "destructive"
        })
    }
    router.push(`/student/cbt-practice/results`);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion: Question = questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <DashboardAuthWrapper requiredRole="student">
      <div className="container mx-auto max-w-4xl py-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h1 className="text-2xl font-bold capitalize">{testType} Practice Test</h1>
              <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <Timer className="h-6 w-6" />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            <Progress value={progress} className="mb-6" />

            <div className="mb-8">
              <p className="font-semibold text-lg mb-2">Question {currentQuestionIndex + 1}/{questions.length}</p>
              <p className="text-xl">{currentQuestion.question}</p>
            </div>

            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <Label key={index} className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-muted has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <span>{option}</span>
                </Label>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8">
              <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={() => handleSubmit()} className="bg-green-600 hover:bg-green-700">
                  Submit Test
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>

             <div className="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2">
                {questions.map((_, index) => (
                    <Button 
                        key={index}
                        variant={currentQuestionIndex === index ? 'default' : (selectedAnswers[index] ? 'secondary' : 'outline')}
                        size="icon"
                        onClick={() => setCurrentQuestionIndex(index)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>

          </CardContent>
        </Card>
      </div>
    </DashboardAuthWrapper>
  );
}
