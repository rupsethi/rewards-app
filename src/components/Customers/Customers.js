// import core dependencies
import React from "react";
import { useParams } from "react-router-dom";

// import custom dependencies
import Card from "../UI/Card";
import Customer from "./Customer";
import CustomerRewards from "./CustomerRewards";
import Transaction from "../Transactions/Transaction";

// import component stylesheet
import "./Customers.css";

const Customers = ({ rewards, selected }) => {
  const { customerId } = useParams();

  let customerContent = <p>No customer rewards found.</p>;

  if (rewards.length > 0) {
    customerContent = rewards
      .filter((r) =>
        customerId
          ? r.customerId === Number(customerId)
          : r.customerId === selected || selected === -1
      )
      .map((reward) => (
        <li key={reward.customerId} className="customer-list-item">
          <Card className="customer">
            <Customer
              customerId={reward.customerId}
              total={reward.rewards.total}
            />
            <CustomerRewards
              customer={reward.customerId}
              rewards={reward.rewards}
            />
            {customerId ? <Transaction purchases={reward.purchases} /> : ""}
          </Card>
        </li>
      ));
  }

  // return JSX syntactic sugar for React.createElement
  return customerContent;
};

export default Customers;
