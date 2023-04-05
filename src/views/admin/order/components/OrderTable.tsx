import Card from 'components/card';
import Progress from 'components/progress';
import { Order } from 'graphql/__generated__/graphql';
import React, { useEffect, useState } from 'react'
import { getTimeAgo } from 'utils';
import OrderFilter from './OrderFilter';

interface IProps {
  data: Order[];
  activeId?: string;
  setOrderDetails: React.Dispatch<React.SetStateAction<Order>>;
}
const OrderTable = (props: IProps) => {
  const [data, setData] = useState<Order[]>(props.data);


  useEffect(() => {
    setData(props.data);
   }, [props.data]);

  return (
    <Card extra={"w-full overflow-auto px-6 pb-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Order Table
        </div>

        <OrderFilter
          data={props.data}
          setData={setData}
        />
      </header>

      <div className="mt-8 overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr className="!border-px !border-gray-400">
              <th
                className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
              >
                <div className="items-center justify-between text-xs text-gray-200">
                  <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
                </div>
              </th>
              <th
                className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
              >
                <div className="items-center justify-between text-xs text-gray-200">
                  <p className="text-sm font-bold text-gray-600 dark:text-white">ORDER-ID</p>
                </div>
              </th>
              <th
                className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
              >
                <div className="items-center justify-between text-xs text-gray-200">
                  <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
                </div>
              </th>
              <th
                className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
              >
                <div className="items-center justify-between text-xs text-gray-200">
                  <p className="text-sm font-bold text-gray-600 dark:text-white">OPTION</p>
                </div>
              </th>
              <th
                className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
              >
                <div className="items-center justify-between text-xs text-gray-200">
                  <p className="text-sm font-bold text-gray-600 dark:text-white">TIME</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map(order => (
                <tr key={order._id} onClick={() => props.setOrderDetails(order)} className={`${props?.activeId === order._id ? 'bg-gray-50': ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src={"https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"}
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div>
                      <p className="text-sm font-medium text-navy-700 dark:text-white">
                        {order.user.name.split(" ").slice(0,1)}
                      </p>
                    </div>
                  </td>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <p className="text-md font-medium text-gray-600 dark:text-white">
                      {order._id}
                    </p>
                  </td>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <div className="mx-2 flex font-bold">
                      <Progress width="w-16" value={orderStatus[order.status]} />
                    </div>
                  </td>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <p className="text-md font-medium text-gray-600 dark:text-white">
                      {order.delivery_option}
                    </p>
                  </td>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <p className="text-md font-medium text-gray-600 dark:text-white">
                      {getTimeAgo(order.createdAt)}
                    </p>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default OrderTable;

const orderStatus: { [key: string]: number } = {
  "pending": 0,
  "confirmed": 25,
  "processing": 50,
  "shipped": 75,
  "delivered": 100
}
