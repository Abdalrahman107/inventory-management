"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "../redux";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", flex: 1, align:"left", headerAlign:"left" },
  { field: "name", headerName: "Product Name", flex: 3, align:"left", headerAlign:"left" },
  {
    field: "price",
    headerName: "Price",
    flex: 2,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
    align:"left",
    headerAlign:"left"
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 2,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    align:"left",
    headerAlign:"left"
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    flex: 2,
    type: "number",
    align:"left",
    headerAlign:"left"
  },
];

const Inventory = () => {
  let isDarkMode = useAppSelector((state)=> state.global.isDarkMode)
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col !text-left">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className={`shadow rounded-lg border border-gray-200  ${isDarkMode?"!text-gray-800":""}`}
        getRowClassName={() => `${isDarkMode?"bg-gray-100 hover:!bg-gray-200":""}    focus:!bg-transparent `}
        
      />
    </div>
  );
};

export default Inventory;
