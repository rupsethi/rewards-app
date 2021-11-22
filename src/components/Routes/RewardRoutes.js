// import core dependencies
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import custom dependencies
import App from "../../App";
import Transaction from "../Transactions/Transaction";

const RewardRoutes = () => {
  // return JSX syntactic sugar for React.createElement
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/customer" element={<Navigate to="/" />} />
        <Route path="/customer/:customerId" element={<Transaction />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default RewardRoutes;
