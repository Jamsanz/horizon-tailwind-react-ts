import ItemsCard from "./components/ItemsCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ORDERS } from "graphql/queries/order/get";
import QueryResult from "components/query";
import OrderTable from "./components/OrderTable";
import { useState } from "react";
import { Order } from "graphql/__generated__/graphql";
import Card from "components/card";
import Button from "components/button/default";
import OrderDetails from "./components/OrderDetails";
import UpdateOrder from "./components/UpdateOrder";

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  const [orderDetails, setOrderDetails] = useState<Order>();

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* Order Table */}
        <QueryResult isLoading={loading} error={error}>
          <OrderTable
            data={data?.Orders}
            activeId={orderDetails?._id}
            setOrderDetails={setOrderDetails}
          />
        </QueryResult>
        <div className="mb-5"></div>
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          <Card extra={"w-full sm:overflow-auto px-6 pb-6"}>
            <header className="relative flex items-center justify-between pt-4">
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                Order Details <span className="text-xs text-gray-600">{orderDetails?._id && `(${orderDetails._id})`}</span>
              </div>
            </header>
            {!orderDetails && <div className="grid w-full h-24 place-content-center">No Order Selected</div>}
            {orderDetails && <OrderDetails order={orderDetails} />}

          </Card>
        </div>

      </div>

      {/* right side section */}
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        {/* update order component */}
        <UpdateOrder
          order={orderDetails}
          setOrderDetails={setOrderDetails}
        />
        <div className="mb-5" />
        {/* items List component */}
        <ItemsCard
          orderId={orderDetails?._id}
          items={orderDetails?.items}
        />
        <div className="mb-5" />
      </div>
    </div>
  );
};

export default Orders;
