"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { ExploreData } from "../types/types";

function formatTimeRemaining(deadline: Date) {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 30) {
    const months = Math.floor(days / 30);
    return `Ends in ${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 7) {
    const weeks = Math.floor(days / 7);
    return `Ends in ${weeks} week${weeks > 1 ? "s" : ""}`;
  } else {
    return `Ends in ${days} day${days > 1 ? "s" : ""}`;
  }
}

interface TaskCardProps {
  exploreData: ExploreData[];
}

export default function TaskCard({ exploreData }: TaskCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {exploreData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-4">
          {exploreData.map((exp) => (
            <Card key={exp?.id} className="flex flex-col h-full bg-card">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={exp?.user?.profilePicture || "/placeholder.svg"}
                    alt="user-profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      @{exp?.user?.username}
                    </span>
                    {exp?.user?.xAccountVerified && (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <CardTitle className="text-base mt-1">{exp?.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex flex-wrap gap-2">
                  {exp?.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{`+${exp.bountySubmissions.length} participated`}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {formatTimeRemaining(new Date(exp?.deadline))}
                </span>
                <div className="flex items-center">
                  <span className="font-medium">${exp?.remainingAmount} left</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks available.</p>
      )}
    </div>
  );
}
