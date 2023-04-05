import { useMutation, useQuery } from '@apollo/client';
import { DELETE_ITEM } from 'graphql/mutations/items/delete';
import { GET_ITEMS } from 'graphql/queries/items/item';
import { Item } from 'graphql/__generated__/graphql';
import React from 'react'
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { DeleteAlert } from 'utils/alert';

interface IProps {
  setItem?: React.Dispatch<React.SetStateAction<Item>>;
  activeId?: string;
  categoryId?: string;
}

const ItemsTable: React.FC<IProps> = (props) => {
  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables: {
      categoryId: props.categoryId
    },
    skip: !props.categoryId
  });

  const [deleteItem] = useMutation(DELETE_ITEM);
  const emptyForm = () => {
    props?.setItem({ name: "", imageUrl: "", price: 0, description: "", categoryId: '', _id: '' })
  }

  const handleDelete = (id: string) => {
    DeleteAlert().then((res) => {
      if (res.isConfirmed) {
        deleteItem({
          variables: {
            id,
          },
          refetchQueries: [{ query: GET_ITEMS, variables: { categoryId: props.categoryId } }],
          onCompleted: () => {
            toast.success("Item deleted successfully");
            emptyForm();
          }
        });
      }
    });
  }

  if (loading) return <div className='h-24 w-full grid place-content-center'>Loading...</div>;

  if (error) return <div className='h-24 w-full grid place-content-center'>{error.message}</div>;

  return (
    data?.category_items.length > 0 ?
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
                <p className="text-sm font-bold text-gray-600 dark:text-white">DESCRIPTION</p>
              </div>
            </th>
            <th
              className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
            >
              <div className="items-center justify-between text-xs text-gray-200">
                <p className="text-sm font-bold text-gray-600 dark:text-white">PRICE</p>
              </div>
            </th>
            <th
              className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
            >
              <div className="items-center justify-between text-xs text-gray-200">
                <p className="text-sm font-bold text-gray-600 dark:text-white">ACTION</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data?.category_items?.map(item => (
              <tr key={item._id} onClick={() => props.setItem(item)} className={`${props?.activeId === item._id ? 'bg-gray-50' : ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-[30px] w-[30px] rounded-full">
                      <img
                        src={item.imageUrl}
                        className="h-full w-full rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      {item.name}
                    </p>
                  </div>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    {item.description}
                  </p>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    {item.price}
                  </p>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    <BsTrashFill className='hover:scale-110' onClick={() => handleDelete(item._id)} />
                  </p>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table> :
      <div className="w-full h-24 grid place-content-center">
        <p>No data available</p>
      </div>
  )
}

export default ItemsTable