import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDashboardMetricsQuery } from "@/state/api";

const SalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const [timeframe, setTimeframe] = useState("weekly");
  const totalValueSum = salesData.reduce(
    (acc, curr) => acc + curr.totalValue,
    0
  );

  const averageChangePercentage = salesData.reduce((acc, curr, _, array) => {
    return acc + (curr.changePercentage ?? 0) / array.length;
  }, 0);

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <div className="bg-white col-span-1 md:row-span-3 xl:row-span-6 overflow-auto shadow rounded-xl py-2 flex flex-col justify-between">
      {/* header */}
      <SectionHeader title={"Sales Summary"} />
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div className="overflow-auto h-auto">
            {/* body header */}
            <div className="flex justify-between items-center gap-5 px-3 py-4">
              <div className="flex flex-col">
                <p className="text-gray-500">value</p>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold">
                    $
                    {(totalValueSum / 1000000).toLocaleString("en", {
                      maximumFractionDigits: 2,
                    })}
                    m
                  </p>
                  <div
                    className={`text-xs text-green-400 flex items-center gap-1`}>
                    <TrendingUp className="w-4 h-4" />
                    <p>{averageChangePercentage.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 shadow text-center">
                <select
                  className="px-2 py-1.5"
                  value={timeframe}
                  onChange={(e) => {
                    setTimeframe(e.target.value);
                  }}>
                  <option className="w-full focus:outline-none" value="Daily">
                    Daily
                  </option>
                  <option className="w-full focus:outline-none" value="Weekly">
                    Weekly
                  </option>
                  <option className="w-full focus:outline-none" value="Monthly">
                    Monthly
                  </option>
                </select>
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer
              width="100%"
              height={350}
              className="px-4 py-4 my-auto">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between gap-5 px-3 py-4 border-t border-t-gray-200 text-sm mt-auto">
            <p>5 days</p>
            <p>
              Highest Sales Date:{" "}
              <span className="font-bold">{highestValueDate}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesSummary;
