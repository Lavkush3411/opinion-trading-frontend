import React from "react";
import OrderBook from "../components/orderbook/OrderBook";

function Trade() {
  return (
    <div className="w-full h-full flex-col  flex-1">
      <div className="w-full h-full flex-1">
        <OrderBook />
      </div>
    </div>
  );
}

export default Trade;
