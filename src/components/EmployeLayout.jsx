import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeSidebar from './EmployeSidebar';

const EmployeLayout = () => {
  return (
    <div className="flex">
      <EmployeSidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeLayout;
