import React from 'react'
import Card from "components/card";
import { Order } from 'graphql/__generated__/graphql';
import { dateTimeFormatter, formatToCurrency } from 'utils';

interface IProps {
  order: Order,
}

const OrderDetails: React.FC<IProps> = ({order}) => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-2">
        <div className="flex md:col-span-2 flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order._id}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Name</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order.user.name}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Payment Method</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order?.payment_method}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order.status}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Delivery Option</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order?.delivery_option}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date & Time</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {dateTimeFormatter(order.createdAt)}
          </p>
        </div>

        <div className="flex flex-col md:col-span-2 items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Delivery Address</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order.delivery_address}
          </p>
        </div>

        <div className="flex flex-col md:col-span-2 justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Transaction Reference</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {order.transaction_id}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Updated At</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {dateTimeFormatter(order.updatedAt)}
          </p>
        </div>
        <div className="flex md:col-span-3 flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            N {formatToCurrency(order.total)}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default OrderDetails