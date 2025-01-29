"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import axios from "axios";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";

export default function TaskCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api2.gib.work/explore", {
          headers: { "x-api-key": "feve" },
        });
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const exploreData = data?.results || [];
  console.log(">>>>>", exploreData);

  return (
    <div className="grid grid-cols-1  gap-4 p-4">
      {exploreData.map((exp) => (
        <Card key={exp?.id} className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src={exp?.user?.profilePicture || "/placeholder.svg"}
                alt="user-profile"
                layout="fill"
                // width={36}
                // height={36}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">@{exp?.user?.username}</span>
                {exp?.user?.xAccountVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <CardTitle className="text-lg mt-1">{exp?.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {exp?.tags.map((tag: string, idx: number) => (
                <Badge key={idx} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <span>{`+ ${exp.bountySubmissions.length} participated`}</span>

          </CardContent>
          {/* keep this to the right  */}
          <CardFooter>
            <span className="font-semibold text-gray-400">{`$ ${exp?.remainingAmount} left`}</span>
            {exp?.deadline.slice("T")}
            {/* compare to date.now a dn tell like 1 month or 1 week or 3 days like that  */}
            {/* 2025-02-04T00:00:00.000Z */}

          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
