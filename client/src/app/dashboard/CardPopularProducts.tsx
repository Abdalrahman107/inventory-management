"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useGetDashboardMetricsQuery, useGetProductsQuery } from "@/state/api";
import Rating from "../(components)/Rating";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

type Props = {};

const PopularProducts = (props: Props) => {
  const { data: DashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="bg-white col-span-1 md:row-span-3 xl:row-span-6 overflow-auto shadow rounded-xl py-2">
      {/* header */}
      <SectionHeader title={"Popular Products"} />
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        DashboardMetrics?.popularProducts?.map((product) => {
          return (
            <div
              key={product.productId}
              className="px-4 py-6 border-b border-b-gray-200 flex items-center justify-between gap-5">
              <div className="flex gap-3 items-center">
                <div className="w-1/3">
                    <Image
                    src={`https://s3-inventory710.s3.eu-west-2.amazonaws.com/product${
                      Math.floor(Math.random() * 3) + 1
                    }.png`}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                    />
                </div>
                <div className="flex flex-col w-2/3">
                  <h4>{product.name}</h4>
                  <div className="flex">
                    <span>${product.price}</span>
                    <span className="px-2">|</span>
                    <Rating rating={product.rating} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className={`w-8 h-8 p-2 rounded-full flex justify-center items-center   cursor-pointer bg-blue-100`}>
                  <ShoppingBag className="text-blue-600" />
                </button>
                <p>{Math.floor(product.stockQuantity / 1000)}k Sold</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PopularProducts;




