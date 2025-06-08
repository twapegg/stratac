"use client";
import React from "react";
import tickets from "@/data/tickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const CATEGORY_COLORS = {
  "Public Works": "#2563eb",
  Health: "#16a34a",
  Education: "#f59e42",
  "Law & Order": "#f43f5e",
  Other: "#6366f1",
};

function getCategoryStats() {
  const stats = {};
  tickets.forEach((t) => {
    stats[t.category] = (stats[t.category] || 0) + 1;
  });
  return stats;
}

function getTagsStats() {
  const stats = {};
  tickets.forEach((t) => {
    t.tags.forEach((tag) => {
      stats[tag] = (stats[tag] || 0) + 1;
    });
  });
  return stats;
}

export default function AdminDashboard() {
  const categoryStats = getCategoryStats();
  const tagStats = getTagsStats();

  const categoryPieData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        data: Object.values(categoryStats),
        backgroundColor: Object.keys(categoryStats).map(
          (cat) => CATEGORY_COLORS[cat] || "#a3a3a3"
        ),
      },
    ],
  };

  const tagBarData = {
    labels: Object.keys(tagStats),
    datasets: [
      {
        label: "Complaints per Tag",
        data: Object.values(tagStats),
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Pie
                data={categoryPieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full min-w-[400px] md:min-w-[600px]">
              <Bar
                data={tagBarData}
                height={300}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  // ...other options
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>All Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 border">ID</th>
                    <th className="px-2 py-1 border">Name</th>
                    <th className="px-2 py-1 border">Category</th>
                    <th className="px-2 py-1 border">Tags</th>
                    <th className="px-2 py-1 border">Subject</th>
                    <th className="px-2 py-1 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t.id} className="even:bg-gray-50">
                      <td className="px-2 py-1 border">{t.id}</td>
                      <td className="px-2 py-1 border">{t.name}</td>
                      <td className="px-2 py-1 border">{t.category}</td>
                      <td className="px-2 py-1 border">{t.tags.join(", ")}</td>
                      <td className="px-2 py-1 border">{t.subject}</td>
                      <td className="px-2 py-1 border">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
