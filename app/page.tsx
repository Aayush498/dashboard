"use client";

import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {
  Upload,
  Brain,
  Database,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const BarChart = dynamic(
  () => import("recharts").then((mod) => mod.BarChart),
  { ssr: false }
);

const Bar = dynamic(
  () => import("recharts").then((mod) => mod.Bar),
  { ssr: false }
);

const XAxis = dynamic(
  () => import("recharts").then((mod) => mod.XAxis),
  { ssr: false }
);

const YAxis = dynamic(
  () => import("recharts").then((mod) => mod.YAxis),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false }
);

const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = data?.access_distribution
    ? Object.entries(data.access_distribution).map(([key, value]) => ({
        score: key,
        count: value,
      }))
    : [];

  const steps = [
    {
      icon: Upload,
      title: "ZIP Upload",
      desc: "Received payer policy PDFs in ZIP format",
    },
    {
      icon: Database,
      title: "Drive Processing",
      desc: "Extracted PDFs + uploaded PA_Business_Rules.xlsx",
    },
    {
      icon: Brain,
      title: "Gemini AI",
      desc: "Configured Gemini API inside notebook secrets",
    },
    {
      icon: FileSpreadsheet,
      title: "Google Drive Mount",
      desc: "Mounted Drive + connected PDFs folder",
    },
    {
      icon: Sparkles,
      title: "AI Extraction",
      desc: "Applied structured extraction + business rules",
    },
    {
      icon: CheckCircle2,
      title: "Final Output",
      desc: "Generated result.csv directly into Drive folder",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.25),transparent_30%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 backdrop-blur mb-6">
            <Sparkles className="w-4 h-4" />
            AI Powered Payer Intelligence Platform
          </div>

          <h1 className="text-6xl font-black leading-tight mb-6">
            Payer Policy
            <br />
            Intelligence Dashboard
          </h1>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Upload payer policy outputs and instantly generate
            AI-driven access insights, restriction analysis,
            competitive intelligence, and market access strategy.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">
            End-to-End Pipeline
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="bg-zinc-900/70 border border-zinc-800 backdrop-blur-xl p-6 rounded-3xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-[32px] p-10 backdrop-blur-xl mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-3">
                Upload Final Output
              </h2>

              <p className="text-zinc-400 text-lg">
                Upload generated CSV/XLSX from notebook pipeline.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-4"
              />

              <button
                onClick={handleUpload}
                className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all"
              >
                Analyze Dataset
              </button>
            </div>
          </div>

          {loading && (
            <div className="mt-10 bg-black border border-zinc-800 rounded-2xl p-8 text-center text-2xl font-bold animate-pulse">
              Running AI Analysis...
            </div>
          )}
        </div>

        {data && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <p className="text-zinc-400 mb-3">Total Rows</p>
                <h3 className="text-6xl font-black">
                  {data.total_rows}
                </h3>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <p className="text-zinc-400 mb-3">Total Columns</p>
                <h3 className="text-6xl font-black">
                  {data.total_columns}
                </h3>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <p className="text-zinc-400 mb-3">Access Categories</p>
                <h3 className="text-6xl font-black">
                  {Object.keys(data.access_distribution).length}
                </h3>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-10">
              <h2 className="text-4xl font-bold mb-10">
                Access Quality Distribution
              </h2>

              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-10">
              <h2 className="text-4xl font-bold mb-8">
                AI Insights
              </h2>

              <div className="whitespace-pre-wrap text-zinc-300 leading-8 text-lg">
                {data.ai_analysis}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}