// import core dependencies
import React from "react";
import moment from "moment";

// import custom dependencies
import Card from "../UI/Card";
import List from "../UI/List";

// import component stylesheet
import "./Transaction.css";

const Transaction = ({ purchases }) => {
  // const { reward } = useContext(RewardsContext);

  // return JSX syntactic sugar for React.createElement
  return (
    <Card className="transactions">
      <h2 className="transactions-title">All Transactions:</h2>
      {purchases.map((purchase) => (
        <List
          key={purchase.key}
          title={moment(purchase.date).format("DD MMM, YYYY")}
          reward={`$${Math.round(purchase.amount)}`}
          text="spent"
        />
      ))}
    </Card>
  );
};

export default Transaction;
