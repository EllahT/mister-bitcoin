import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import bitcoinActions from "../../store/actions/bitcoinActions/bitcoinActions";

import "./ChartsPage.scss";

import ChartContainer from "../../components/ChartContainer/ChartContainer";

class Charts extends Component {
  async componentDidMount() {
    await Promise.all([
      this.props.actions.loadConfirmedTransactionsData(),
      this.props.actions.loadMarketPriceData()
    ]);
  }
  render() {
    console.log(this.props);
    return (
      <section className="charts-page">
        <h1>Charts</h1>
        {this.props.marketPriceData && (
          <ChartContainer
            data={this.props.marketPriceData}
            color="lightblue"
            title="Market Price"
            subTitle="Last 6 Monthes"
          />
        )}
        {this.props.confirmedTransactionsData && (
          <ChartContainer
            data={this.props.confirmedTransactionsData}
            color="orange"
            title="Confirmed Transactions"
            subTitle="Last 30 Days"
          />
        )}
      </section>
    );
  }
}

Charts.propTypes = {
  confirmedTransactionsData: PropTypes.array,
  marketPriceData: PropTypes.array,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  marketPriceData: state.bitcoin.marketPricesData,
  confirmedTransactionsData: state.bitcoin.confirmedTransactionsData
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadMarketPriceData: bitcoinActions.loadMarketPricesData,
      loadConfirmedTransactionsData:
        bitcoinActions.loadConfirmedTransactionsData
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charts);
