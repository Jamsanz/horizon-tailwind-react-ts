import { useMutation } from '@apollo/client';
import Button from 'components/button/default';
import Card from 'components/card';
import { UPDATE_ORDER } from 'graphql/mutations/order/update';
import { GET_ORDERS } from 'graphql/queries/order/get';
import { Order } from 'graphql/__generated__/graphql';
import React, { FormEvent, useEffect, useState } from 'react'

interface IProps {
  order?: Order,
  setOrderDetails?: React.Dispatch<React.SetStateAction<Order>>
}
const UpdateOrder: React.FC<IProps> = (props) => {
  const [updateOrder, { loading, error }] = useMutation(UPDATE_ORDER);
  const [update, setUpdate] = useState<string>();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    updateOrder({
      variables: {
        updateOrderInput: {
          _id:props.order._id,
          status: update
        }
      },
      onCompleted: () => { 
        props.setOrderDetails({ ...props.order, status: update });
      },
      refetchQueries: [{query: GET_ORDERS}]
    })
  }

  useEffect(() => { 
    setUpdate(props?.order?.status)
  }, [props.order]);
  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* ItemsCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Update Order Status
          <span className="text-xs text-gray-600 block">{props?.order?._id && `(${props?.order._id})`}</span>
        </div>
      </div>
      <form onSubmit={handleUpdate} className="flex flex-col h-full w-full bg-white px-3 pb-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
        <select
          name=""
          id="status"
          disabled={loading}
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ">
          <option value="" ></option>
          {props.order && (
            <React.Fragment>
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="processing">processing</option>
              <option value="shipped">shipped</option>
              <option value="delivered">delivered</option>
              <option value="canceled">canceled</option>
            </React.Fragment>
          )}
        </select>
        <Button type="submit" disabled={loading}>
          {
            loading ? 'Loading...' : 'Update'
          }
        </Button>
      </form>
    </Card>
  )
}

export default UpdateOrder;