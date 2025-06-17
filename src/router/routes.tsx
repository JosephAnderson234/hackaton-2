import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ExpenseDetailsPage } from '../pages/ExpenseDetailsPage';
import { GoalsPage } from '../pages/GoalsPage';
import { ProtectedRoute } from './ProtectedRoute';
import { NavBar } from '../components/NavBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </div>
            </div>
        </>
    );
};

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Layout>
                    <DashboardPage />
                </Layout>
            </ProtectedRoute>
        )
    },
    {
        path: '/expenses/:categoryId',
        element: (
            <ProtectedRoute>
                <Layout>
                    <ExpenseDetailsPage />
                </Layout>
            </ProtectedRoute>
        )
    },
    {
        path: '/goals',
        element: (
            <ProtectedRoute>
                <Layout>
                    <GoalsPage />
                </Layout>
            </ProtectedRoute>
        )
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />
    }
]);