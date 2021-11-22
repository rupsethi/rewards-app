import React from "react";
import { useParams } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { RewardsContext } from "../../Contexts/RewardsContext";
import CustomerRewards from "../Customers/CustomerRewards";

// Hooks in to my my component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const rendorComponent = (mockData) => {
  render(
    <MemoryRouter>
      <RewardsContext.Provider value={mockData}>
        <CustomerRewards />
      </RewardsContext.Provider>
    </MemoryRouter>
  );
};

describe("<CustomerRewards /> Component:", () => {
  it("Validate customerRewards should render 'Rewards Earned In Last Three Months'.", () => {
    useParams.mockImplementation(() => ({ customerId: undefined }));

    // Preparation
    rendorComponent({
      reward: {
        customerId: 1,
        purchases: [],
        rewards: { total: 278, September: 17, October: 162, November: 99 },
      },
    });

    // Assertion
    expect(
      screen.getByText("Rewards Earned In Last Three Months", { exact: false })
    ).toBeInTheDocument();
  });

  it("Validate 'Months Name' rendered should matches the mock data.", () => {
    useParams.mockImplementation(() => ({ customerId: undefined }));
    // Preparation
    const prepareProps = {
      reward: {
        customerId: 7,
        purchases: [],
        rewards: { September: 17, October: 162, November: 99 },
      },
    };

    rendorComponent(prepareProps);

    // Assertions
    Object.keys(prepareProps.reward.rewards).forEach((r) =>
      expect(screen.getByText(r)).toBeInTheDocument()
    );
  });

  it("Validate 'Monthly Points Earned' rendered should matches the mock Data.", () => {
    useParams.mockImplementation(() => ({ customerId: undefined }));

    // Preparation
    const prepareProps = {
      reward: {
        customerId: 2,
        purchases: [],
        rewards: { September: 29, October: 199, November: 16 },
      },
    };

    rendorComponent(prepareProps);

    // Assertions
    Object.keys(prepareProps.reward.rewards).forEach((r) =>
      expect(screen.getByText(`${prepareProps.reward.rewards[r]} Pts.`)).toBeInTheDocument()
    );
  });

  it("Validate 'View Details' link rendered on the page.", () => {
    useParams.mockImplementation(() => ({ customerId: undefined }));

    // Preparation
    rendorComponent({
      reward: {
        customerId: 5,
        purchases: [],
        rewards: { total: 244, September: 29, October: 199, November: 16 },
      },
    });

    // Assertion
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("Validate 'View Details' link should contian valid href attribute.", () => {
    useParams.mockImplementation(() => ({ customerId: undefined }));

    // Preparation
    const prepareProps = {
      reward: {
        customerId: 9,
        purchases: [],
        rewards: { total: 244, September: 29, October: 199, November: 16 },
      },
    };

    rendorComponent(prepareProps);

    // Assertion
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/customer/${prepareProps.reward.customerId}`
    );
  });

  it("Validate 'View Details' link should be clickable.", () => {
    useParams.mockImplementation(() => ({ customerId: undefined }));

    // Preparation
    const prepareProps = {
      reward: {
        customerId: 3,
        purchases: [],
        rewards: { total: 244, September: 29, October: 199, November: 16 },
      },
    };

    rendorComponent(prepareProps);

    // Assertion
    expect(screen.getByRole("link").closest("a")).toHaveAttribute(
      "href",
      `/customer/${prepareProps.reward.customerId}`
    );
  });

  it("Validate 'All Customers' link should navigate to customer details page on click.", () => {
    // Preparation
    const prepareProps = {
      reward: {
        customerId: 5,
        purchases: [],
        rewards: { total: 244, September: 29, October: 199, November: 16 },
      },
    };

    useParams.mockImplementation(() => ({
      customerId: prepareProps.reward.customerId,
    }));

    rendorComponent(prepareProps);

    // Assertion
    expect(screen.getByText("All Customers")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
