import type { Certificate, Education } from "./types";

export const education: Education = {
  school: "Lovely Professional University",
  degree: "B.Tech — Computer Science & Engineering",
  start: "2024",
  end: "2028 (Expected)",
  facts: [
    "Punjab, India",
    "Full-stack web development with TypeScript, React and Next.js",
    "75+ LeetCode problems solved",
  ],
};

export const certificates: readonly Certificate[] = [
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "Feb 2026",
    image: "/certificates/problem_solving.png",
    alt: "HackerRank Problem Solving (Basic) certificate",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "Feb 2026",
    image: "/certificates/python_basics.png",
    alt: "HackerRank Python (Basic) certificate",
  },
  {
    title: "Java (Basic)",
    issuer: "HackerRank",
    date: "Dec 2025",
    image: "/certificates/java_basic_image.png",
    alt: "HackerRank Java (Basic) certificate",
  },
  {
    title: "Azure Data Fundamentals (DP-900)",
    issuer: "Microsoft",
    date: "Jan 2026",
    image: "/certificates/microsoft_data_fundamentals.jpg",
    alt: "Microsoft Certified: Azure Data Fundamentals certificate",
  },
  {
    title: "Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "Jan 2026",
    image: "/certificates/microsoft_azure_fund.jpg",
    alt: "Microsoft Certified: Azure Fundamentals certificate",
  },
];
