"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import SurveyForm from "./components/SurveyForm";
import Link from "next/link";

export default function Home() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch("/api/surveys");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        setSurveys(data);
      } catch (e: any) {
        console.error("Error fetching surveys:", e);
        setError("Failed to load surveys.");
      }
    };

    fetchSurveys();
  }, []);

  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/pages/surveybuilder">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Go to Survey Builder
        </button>
      </Link>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">SurveyMaker</li>
          <li>Go take or create surveys</li>
        </ol>
        <div className="w-full max-w-lg">
          <SurveyForm />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4 items-center flex-col sm:flex-row">

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
        <div>
          <h1>Surveys</h1>
          {error && <p className="text-red-500">{error}</p>}
          <ul>
            {surveys.map((survey: any) => (
              <li key={survey._id}>
                <strong>{survey.name}</strong> - {survey.email}, {survey.age} years old
                <br />
                Feedback: {survey.feedback}
              </li>
            ))}
          </ul>
        </div>
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
