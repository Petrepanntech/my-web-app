
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allQuestions } from "@/lib/cbt-questions";
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { BackButton } from "@/components/shared/BackButton";

const availableSubjects = [...new Set(allQuestions.map(q => q.subject))];

export default function CbtSetupPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const testType = Array.isArray(params.test) ? params.test[0] : params.test;
  const isJamb = testType === 'jamb';

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(isJamb ? ["English"] : []);
  const [numQuestions, setNumQuestions] = useState("20");

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setSelectedSubjects(prev => {
      if (isJamb && subject === "English") return prev; // English is mandatory for JAMB

      const newSubjects = checked ? [...prev, subject] : prev.filter(s => s !== subject);
      
      if (isJamb && newSubjects.length > 4) {
        toast({
            variant: "destructive",
            title: "Subject Limit Reached",
            description: "You can select a maximum of 4 subjects for JAMB (including English)."
        })
        return prev;
      }
      
      return newSubjects;
    });
  };

  const handleStartTest = () => {
    if (selectedSubjects.length === 0) {
        toast({
            variant: "destructive",
            title: "No Subjects Selected",
            description: "Please select at least one subject to start the test."
        })
        return;
    }

    if (isJamb && selectedSubjects.length !== 4) {
         toast({
            variant: "destructive",
            title: "Invalid JAMB Selection",
            description: "Please select exactly 4 subjects for a JAMB test (English + 3 others)."
        })
        return;
    }

    const queryParams = new URLSearchParams({
      subjects: selectedSubjects.join(','),
      count: numQuestions
    });

    router.push(`/student/cbt-practice/test/${testType}?${queryParams.toString()}`);
  };

  return (
    <DashboardAuthWrapper requiredRole="student">
      <div className="container mx-auto max-w-2xl py-12">
        <BackButton className="mb-4" />
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl capitalize">Configure Your {testType} Test</CardTitle>
            <CardDescription>Select your subjects and number of questions to begin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Subjects</Label>
              {isJamb && <p className="text-sm text-muted-foreground">Use of English is compulsory. Please select 3 other subjects.</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableSubjects.map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={selectedSubjects.includes(subject)}
                      onCheckedChange={(checked) => handleSubjectChange(subject, !!checked)}
                      disabled={isJamb && subject === "English"}
                    />
                    <label
                      htmlFor={subject}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold" htmlFor="num-questions">Number of Questions</Label>
               <Select value={numQuestions} onValueChange={setNumQuestions}>
                    <SelectTrigger id="num-questions" className="w-[180px]">
                        <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <Button size="lg" className="w-full" onClick={handleStartTest}>
              Start Test <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardAuthWrapper>
  );
}
