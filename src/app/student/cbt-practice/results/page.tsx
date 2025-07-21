
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Question } from "@/lib/cbt-questions";
import { CheckCircle, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";

interface Results {
  answers: Record<number, string>;
  questions: Question[];
  testType: string;
}

const COLORS = {
    correct: 'hsl(var(--chart-2))',
    incorrect: 'hsl(var(--destructive))',
    unanswered: 'hsl(var(--muted))'
};


export default function CbtResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Results | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedResults = localStorage.getItem("cbtResults");
    if (savedResults) {
      const parsedResults: Results = JSON.parse(savedResults);
      setResults(parsedResults);

      let correctAnswers = 0;
      parsedResults.questions.forEach((q, index) => {
        if (parsedResults.answers[index] === q.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
    } else {
      router.push("/student/cbt-practice");
    }
    // Cleanup localStorage
    return () => localStorage.removeItem("cbtResults");
  }, [router]);

  if (!results) {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-4xl py-12">Loading results...</div>
        </DashboardAuthWrapper>
    );
  }

  const correctCount = score;
  const incorrectCount = Object.keys(results.answers).length - score;
  const unansweredCount = results.questions.length - Object.keys(results.answers).length;

  const chartData = [
    { name: 'Correct', value: correctCount, color: COLORS.correct },
    { name: 'Incorrect', value: incorrectCount, color: COLORS.incorrect },
    { name: 'Unanswered', value: unansweredCount, color: COLORS.unanswered },
  ];

  return (
    <DashboardAuthWrapper requiredRole="student">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl capitalize">
                {results.testType} Test Results
            </h1>
        </div>

        <Card className="mb-8">
            <CardHeader><CardTitle>Performance Summary</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center space-y-4">
                    <p className="text-lg text-muted-foreground">You Scored</p>
                    <p className="text-7xl font-bold text-primary">
                        {score}
                        <span className="text-3xl text-muted-foreground">/{results.questions.length}</span>
                    </p>
                    <p className="text-2xl font-semibold">
                       That's {((score / results.questions.length) * 100).toFixed(0)}%!
                    </p>
                </div>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Review Your Answers</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {results.questions.map((q, index) => {
              const userAnswer = results.answers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={index} className="p-4 border rounded-md">
                  <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map(option => {
                        const isSelectedAnswer = userAnswer === option;
                        const isTheCorrectAnswer = q.correctAnswer === option;

                        let indicator = null;
                        if(isTheCorrectAnswer) {
                            indicator = <CheckCircle className="h-5 w-5 text-green-600" />;
                        } else if(isSelectedAnswer && !isCorrect) {
                            indicator = <XCircle className="h-5 w-5 text-red-600" />;
                        }

                        return (
                             <div 
                                key={option} 
                                className={`flex items-center gap-3 p-2 rounded-md
                                    ${isTheCorrectAnswer ? 'bg-green-100 dark:bg-green-900/30' : ''}
                                    ${(isSelectedAnswer && !isCorrect) ? 'bg-red-100 dark:bg-red-900/30' : ''}
                                `}
                            >
                               {indicator}
                               <span>{option}</span>
                             </div>
                        )
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
            <Button onClick={() => router.push("/student/cbt-practice")}>
                Take Another Test
            </Button>
        </div>
      </div>
    </DashboardAuthWrapper>
  );
}
