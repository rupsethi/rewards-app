// import core dependencies
import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

// import custom dependencies
import List from "../UI/List";

// import component stylesheet
import "./CustomerRewards.css";

const CustomerRewards = ({ customer, rewards }) => {
  const { customerId } = useParams();

  let rewardsContent = <p>Sorry, no rewards found at this time.</p>;

  if (Object.keys(rewards).length > 0) {
    rewardsContent = Object.keys(rewards).map((rewardItem) =>
      rewardItem !== "total" ? (
        <List
          key={rewardItem}
          title={rewardItem}
          reward={`${rewards[rewardItem]} Pts.`}
          text="earned"
        />
      ) : (
        ""
      )
    );
  }

  // return JSX syntactic sugar for React.createElement
  return (
    <Fragment>
      <div className="rewards">
        <h2 className="rewards-title">Rewards Earned In Last Three Months:</h2>
        <Link
          to={customerId ? "/" : `/customer/${customer}`}
          className="rewards-title-viewlink"
        >
          {customerId ? "All Customers" : "View Details"}
        </Link>
        {rewardsContent}
      </div>
    </Fragment>
  );
};

export default CustomerRewards;
