import Dropdown from 'components/dropdown';
import { Order } from 'graphql/__generated__/graphql';
import React from 'react'
import { FiFilter } from 'react-icons/fi'

interface IProps{
  data: Order[];
  setData?: React.Dispatch<React.SetStateAction<Order[]>>;
  transparent?: boolean;
}

const OrderFilter: React.FC<IProps> = ({ data, setData ,transparent }) => {
  const [open, setOpen] = React.useState(false);

  const handleFilter = (query: string) => {
    if (query === "all") {
      setData(data);
      return;
    }
    setData(data?.filter(order => order.status === query));
  }
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center text-xl hover:cursor-pointer ${transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
            } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          
          <FiFilter className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p onClick={_=> handleFilter("all")} className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium">
            All
          </p>
          <p onClick={_=> handleFilter("pending")} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            Pending
          </p>
          <p onClick={_=> handleFilter("confirmed")} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            Confirmed
          </p>
          <p onClick={_=> handleFilter("processing")} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            Processing
          </p>
          <p onClick={_=> handleFilter("shipped")} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            Shipped
          </p>
          <p onClick={_=> handleFilter("delivered")} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            Delivered
          </p>
          <p onClick={_=> handleFilter("canceled")} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            Canceled
          </p>
        </div>
      }
    />
  );
}

export default OrderFilter