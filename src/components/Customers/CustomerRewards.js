// import core dependencies
import React, { Fragment, useContext } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";

// import custom dependencies
import { RewardsContext } from "../../Contexts/RewardsContext";
import List from "../UI/List";

// import component stylesheet
import "./CustomerRewards.css";

const CustomerRewards = () => {
  const { customerId } = useParams();

  const { reward } = useContext(RewardsContext);

  let rewardsContent = <p>Sorry, no rewards found at this time.</p>;

  if (Object.keys(reward).length > 0) {
    rewardsContent = Object.keys(reward.rewards).map((rewardItem) =>
      rewardItem !== "total" ? (
        <List
          key={rewardItem}
          title={rewardItem}
          reward={`${reward.rewards[rewardItem]} Pts.`}
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
        <NavLink
          to={customerId ? "/" : `/customer/${reward.customerId}`} 
          className="rewards-title-viewlink"
        >
          {customerId ? "All Customers" : "View Details"}
        </NavLink>
        {rewardsContent}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default CustomerRewards;
