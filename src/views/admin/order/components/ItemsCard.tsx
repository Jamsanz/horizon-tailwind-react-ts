import Nft1 from "assets/img/nfts/Nft1.png";
import Card from "components/card";
import { Cart } from "graphql/__generated__/graphql";
import { IToping } from "interfaces/toping.interface";
import { formatToCurrency } from "utils";

interface IProps {
  items?: Cart[]
  orderId?: string; 
}

const ItemsCard = (props: IProps) => {

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* ItemsCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Order Items <span className="text-xs text-gray-600">{props?.orderId && `(${props.orderId})`}</span>
        </div>
        {/* <CardMenu /> */}
      </div>
      {/* Empty Items List */}
      {
        !props.items &&
        <div className="w-full h-24 grid place-content-center">
            <p>No Order Seleted</p>
        </div>
      }

      {/* History CardData */}
      {props.items?.length > 0 && props.items.map((data, index) => (
        <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  className="h-full w-full rounded-xl"
                  src={data?.item?.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-base text-navy-700 dark:text-white">
                  {" "}
                  {data.item.name}
                </h5>
                <p className=" text-sm font-normal text-gray-600 w-40">
                  {" "}
                  {data.topings?.map((val: IToping) => val.toping).join(", ")}{" "}
                </p>
                <h3 className=" text-navy-700 dark:text-white">
                  N {formatToCurrency(data.total)}
                </h3>
              </div>
            </div>
            <div className="h-fit w-6 grid place-content-center bg-brand-500 dark:bg-white rounded">
              <p className="text-white dark:text-navy-700 font-bold">{data.qty}</p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default ItemsCard;
