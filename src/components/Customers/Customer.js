// import core dependencies
import React from "react";

import "./Customer.css";

const Customer = ({ customerId, total }) => {
  // return JSX syntactic sugar for React.createElement
  return (
    <div className="customer-description">
      <h2 className="customer-title" data-testid="customer-label">
        Customer {customerId}
      </h2>
      <div className="customer-points-text">Total Points Earned:</div>
      <div className="customer-points" data-testid="customer-total-rewards">
        {total}
      </div>
    </div>
  );
};

export default Customer;
