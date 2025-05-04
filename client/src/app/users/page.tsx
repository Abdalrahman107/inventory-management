"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "../redux";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", flex: 2, align:"left", headerAlign:"left" },
  { field: "name", headerName: "Name", flex: 2, align:"left", headerAlign:"left" },
  { field: "email", headerName: "Email", flex: 4, align:"left", headerAlign:"left" },
];

const Users = () => {
  let isDarkMode = useAppSelector((state)=> state.global.isDarkMode)
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className={`shadow rounded-lg border border-gray-200  ${isDarkMode?"!text-gray-800":""}`}
        getRowClassName={() => `${isDarkMode?"bg-gray-100 hover:!bg-gray-200":""}    focus:!bg-transparent `}
      />
    </div>
  );
};

export default Users;
