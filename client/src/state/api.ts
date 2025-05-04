import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface DashboardMetrics {
    popularProducts:Product[]
    salesSummary: SalesSummary[]
    purchaseSummary: PurchaseSummary[]
    expenseSummary: ExpenseSummary[] 
    expenseByCategorySummary: ExpenseByCategorySummary[]
}
export interface Product{
    productId: string    
    name: string
    price: number
    rating?: number;
    stockQuantity: number;
}
export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
} 
export interface SalesSummary{
    salesSummaryId: string; 
    totalValue: number;      
    changePercentage?: number ;
    date: string;            
}
export interface PurchaseSummary{
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}
export interface ExpenseSummary{
    expenseSummarId: string;
    totalExpenses: number;
    date: string;
}
export interface ExpenseByCategorySummary{
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}
export interface User{
    userId: string;
    name: string;
    email: string ;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    tagTypes: ['DashboardMetrics', 'Products', 'Users', 'Expenses'],
    endpoints : (build) => ({
        getDashboardMetrics: build.query <DashboardMetrics, void>({
            query: () => '/dashboard',
            providesTags: ['DashboardMetrics'],
        }),
        createProduct: build.mutation <Product, NewProduct>({
            query: (newProduct) => ({
                url:'/products',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Products'],
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url:'/products',
                params: search? { search }  : {}
            }),
            providesTags: ['Products'],
        }),
        getUsers: build.query <User[], void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        getExpensesByCategory: build.query <ExpenseByCategorySummary[], void>({
            query: () => '/expenses',
            providesTags: ['Expenses'],
        }),
    })
})

export const { 
    useGetDashboardMetricsQuery,
    useCreateProductMutation,
    useGetProductsQuery,
    useGetUsersQuery,
    useGetExpensesByCategoryQuery,
} = api