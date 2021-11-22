// import core dependencies
import { useState, useEffect } from "react";
import Config from "react-global-configuration";
import moment from "moment";

// import custom dependencies
import { assignUniqueID } from "./../components/Utils/RewardUtils";

function useRewards() {
  const [rewards, setRewards] = useState([]);

  const getGlobalConfigValue = (key) => {
    return Config.get(key);
  };

  const calculateRewards = (orderAmount) => {
    if (orderAmount <= 100) return orderAmount - 50 > 0 ? orderAmount - 50 : 0;
    else return 2 * (orderAmount - 100) + 50;
  };

  const customerObject = function () {
    return {
      customerId: this.customerId,
      purchases: [],
      rewards: { total: 0 },
    };
  };

  const purchaseObject = function () {
    return {
      key: assignUniqueID(),
      date: this.date,
      amount: this.amount,
    };
  };

  // hook calls only once
  useEffect(() => {
    const fetchTransactions = async () => {
      const purchaseAPI = getGlobalConfigValue("purchaseAPI");
      const purchases = await fetch(purchaseAPI);
      return await purchases.json();
    };

    const refineTransactions = (purchases) => {
      const customerRewards = {};

      let { month, rewardAmount, customer } = {};

      purchases.forEach((trnx) => {
        month = moment(trnx.date).format("MMMM");
        rewardAmount = 0;

        if (!customerRewards[trnx.customerId])
          customerRewards[trnx.customerId] = customerObject.apply(trnx);

        customer = customerRewards[trnx.customerId];

        customer.purchases.push(purchaseObject.apply(trnx));

        if (!customer.rewards[month]) customer.rewards[month] = 0;

        rewardAmount = calculateRewards(Math.round(trnx.amount));
        customer.rewards[month] += rewardAmount;
        customer.rewards.total += rewardAmount;
      });

      return customerRewards;
    };

    // setting rewards state
    fetchTransactions().then((purchases) => {
      setRewards([...Object.values(refineTransactions(purchases))]);
    });
  }, []);

  return rewards;
}

export { useRewards };
