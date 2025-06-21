export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        SIGNUP: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/get_user",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    }, 
    INCOME: {
        GET_ALL: "/api/v1/income/get_all",
        ADD: "/api/v1/income/add",
        DELETE: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD_EXCEL: "/api/v1/income/download_excel",
    },
    EXPENSE: {
        GET_ALL: "/api/v1/expense/get_all",
        ADD: "/api/v1/expense/add",
        DELETE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
        DOWNLOAD_EXCEL: "/api/v1/expense/download_excel",
    },
    IMAGE: {
        UPLOAD: "/api/v1/auth/upload_image",
    },
    BUDGET: {
        GET: "/api/v1/budget",
        SET: "/api/v1/budget/set",
        DELETE: (category) => `/api/v1/budget/${category}`,
    },
    REPORTS: {
        GET_RECENT: "/api/v1/reports/recent",
        GET_MONTHLY: (year, month) => `/api/v1/reports/monthly/${year}/${month}`,
        GENERATE: (year, month) => `/api/v1/reports/generate/${year}/${month}`,
    },
}