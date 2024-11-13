"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { surrealConnection } from "@/lib/surrealdb";

export default function Home() {
  const [dbStatus, setDbStatus] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectToDatabase = async () => {
      try {
        const dbInstance = await surrealConnection();
        setDbStatus("Database Connected Successfully!");

        const result = await dbInstance.query("SELECT * FROM your_table LIMIT 1");
        console.log("Query result:", result);
      } catch (err) {
        setError("Failed to connect to the database.");
        console.error("Error:", err);
      }
    };
    connectToDatabase();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            SurveyMaker
          </li>
          <li>Go take or create surveys</li>
        </ol>

        {/* Conditional rendering based on db connection status */}
        <div className="flex flex-col gap-4 items-center">
          {/* Show the connection status */}
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <p>{dbStatus}</p>
          )}

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Create Survey
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Retrieve survey data
            </a>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project 300
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Oby, Robertas, Igor, James
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          2024
        </a>
      </footer>
    </div>
  );
}