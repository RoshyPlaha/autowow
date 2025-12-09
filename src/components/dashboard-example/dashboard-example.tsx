import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function Dashboard() {
  const bounceRateData = [
    { name: "Bounced", value: 65 },
    { name: "Engaged", value: 35 },
  ];

  const COLORS = ["#6b7280", "#3b82f6"]; // Gray for Bounced, Blue for Engaged

  const topSearches = [
    "manual blue r8",
    "blue audi r8 manual",
    "used r8 manual for sale",
  ];

  const monthlyVisits = [
    { month: "Oct", visits: 5200 },
    { month: "Nov", visits: 5600 },
    { month: "Dec", visits: 6100 },
  ];

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Website Visits Month on Month */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Website Visits</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Visits"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Bounce Rate Pie Chart */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Bounce Rate</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bounceRateData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={70}
                  label
                >
                  {bounceRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Time on Site */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4 flex flex-col justify-center items-center h-full">
          <h2 className="text-lg font-semibold mb-4">Average Time on Site</h2>
          <div className="text-4xl font-bold">4:32</div>
          <p className="text-sm mt-2">minutes : seconds</p>
        </CardContent>
      </Card>

      {/* Top Searches */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Top Searches</h2>
          <ul className="space-y-2 text-sm">
            {topSearches.map((search, index) => (
              <li
                key={index}
                className="p-2 rounded-xl bg-muted"
              >
                {search}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
