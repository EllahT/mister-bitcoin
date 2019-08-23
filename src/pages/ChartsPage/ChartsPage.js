import React, { Component } from "react";
import { connect } from "react-redux";

import BitcoinSerivce from "../../services/BitcoinService";

import "./ChartsPage.scss";

import ChartContainer from "../../components/ChartContainer/ChartContainer";

class Charts extends Component {
  state = {};
  async componentDidMount() {
    const marketPrice = await BitcoinSerivce.getMarketPrice();
    const confirmedTransactions = await BitcoinSerivce.getConfirmedTransactions();
    this.setState({ marketPrice, confirmedTransactions });
  }
  render() {
    const { marketPrice, confirmedTransactions } = this.state;
    return (
      <section className="charts-page">
        <h1>Charts</h1>
        {marketPrice && (
          <ChartContainer
            data={marketPrice}
            color="lightblue"
            title="Market Price"
            subTitle="Last 6 Monthes"
          />
        )}
        {confirmedTransactions && (
          <ChartContainer
            data={confirmedTransactions}
            color="orange"
            title="Confirmed Transactions"
            subTitle="Last 30 Days"
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;

  return {
    user
  };
};

export default connect(mapStateToProps)(Charts);
