"use client";
import React, { useState } from "react";
import { Transaction } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

export default function CreateTaskCard() {
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendTransaction, publicKey } = useWallet();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      requirements: "",
      tags: "",
      token: {
        mintAddress: "",
        amount: 0,
      },
    },
  });

  interface FormValues {
    title: string;
    content: string;
    requirements: string;
    tags: string;
    token: {
      mintAddress: string;
      amount: number;
    };
  }

  if (!publicKey) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Connect Your Wallet
        </h2>
        <p className="text-center mb-6">
          Please connect your wallet to create a new task.
        </p>
        <div className="flex justify-center text-violet-400">
          <Loader className="w-12 h-12 animate-pulse" />
        </div>
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);

    const formattedValues = {
      ...values,
      tags: values.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean),
      token: {
        ...values.token,
        amount: Number(values.token.amount),
      },
      payer: publicKey.toString(),
    };

      try {
        const response = await axios.post(
          "https://api2.gib.work/tasks/public/transaction",
          formattedValues, 
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
      

      if (!response) {
        throw new Error(`API error: ${response}`);
      }

      const data = response.data;

      const serializedTransaction = Buffer.from(
        data.serializedTransaction,
        "base64"
      );
      const transaction = Transaction.from(serializedTransaction);

      const signature = await sendTransaction(transaction, connection);
      const confirmationStatus = await connection.getSignatureStatus(
        signature,
        {
          searchTransactionHistory: true,
        }
      );

      if (!confirmationStatus.value?.confirmationStatus) {
        throw new Error("Transaction failed to confirm");
      }

      form.reset();
      alert(`Task created successfully! Task ID: ${data.taskId}`);
      window.location.href = "/exploreTasks";
    } catch (error) {
      console.error("Error creating task:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Task</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details to create a new task
          </p>
        </div>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the task"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              rules={{ required: "Requirements are required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List the task requirements"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags separated by commas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <Separator />
              <h3 className="text-lg font-medium">Token Details</h3>

              <FormField
                control={form.control}
                name="token.mintAddress"
                rules={{ required: "Mint address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mint Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter token mint address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token.amount"
                rules={{
                  required: "Amount is required",
                  min: { value: 0, message: "Amount must be positive" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter token amount (MINIMUM 10 USDC)"
                        step="0.000000001"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
