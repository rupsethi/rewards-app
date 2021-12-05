import React, { useState } from "react";

import "./Configs/RewardsConfig";
import { useRewards } from "./Hooks/useRewards";
import Card from "./components/UI/Card";
import Customers from "./components/Customers/Customers";
import CustomerFilter from "./components/Customers/CustomerFilter";

import "./App.css";

function App() {
  const [selected, setSelected] = useState(-1);

  const rewards = useRewards();

  const onChangeFilter = (selected) => setSelected(selected);

  return (
    <div className="App">
      <Card className="reward-dashboard">
        <CustomerFilter
          rewards={rewards}
          selected={selected}
          onChangeFilter={onChangeFilter}
        />
        <Customers rewards={rewards} selected={selected} />
      </Card>
    </div>
  );
}

export default App;
