import { useMutation } from '@apollo/client';
import { DELETE_CATEGORY } from 'graphql/mutations/category/delete';
import { GET_CATEGORIES } from 'graphql/queries/categories/get';
import { Category } from 'graphql/__generated__/graphql';
import React from 'react'
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { DeleteAlert } from 'utils/alert';


interface IProps {
  data?: Category[],
  setCategory?: React.Dispatch<React.SetStateAction<Category>>;
  activeId?: string;
}

const CategoryTable: React.FC<IProps> = (props) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDelete = (id: string) => {
    DeleteAlert().then((res) => {
      if (res.isConfirmed) {
        deleteCategory({
          variables: {
            id,
          },
          refetchQueries: [{ query: GET_CATEGORIES }],
          onCompleted: () => toast.success("Category deleted successfully")
        });
      }
    });
  }
  return (
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
              <p className="text-sm font-bold text-gray-600 dark:text-white">ITEMS</p>
            </div>
          </th>
          <th
            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
          >
            <div className="items-center justify-between text-xs text-gray-200">
              <p className="text-sm font-bold text-gray-600 dark:text-white">TOPINGS</p>
            </div>
          </th>
          <th
            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
          >
            <div className="items-center justify-between text-xs text-gray-200">
              <p className="text-sm font-bold text-gray-600 dark:text-white">CRUSTS</p>
            </div>
          </th>
          <th
            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
          >
            <div className="items-center justify-between text-xs text-gray-200">
              <p className="text-sm font-bold text-gray-600 dark:text-white">SIZES</p>
            </div>
          </th>
          <th
            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
          >
            <div className="items-center justify-between text-xs text-gray-200">
              <p className="text-sm font-bold text-gray-600 dark:text-white">Action</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          props.data?.map(category => (
            <tr key={category._id} onClick={() => props.setCategory(category)} className={`${props?.activeId === category._id ? 'bg-gray-50' : ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
              <td
                className="min-w-[150px] border-white/0 py-3  pr-4"
              >
                <div className="flex items-center gap-2">
                  <div className="h-[30px] w-[30px] rounded-full">
                    <img
                      src={category.imageUrl}
                      className="h-full w-full rounded-full"
                      alt=""
                    />
                  </div>
                  <p className="text-sm font-medium text-navy-700 dark:text-white">
                    {category.name}
                  </p>
                </div>
              </td>
              <td
                className="min-w-[150px] border-white/0 py-3  pr-4"
              >
                <p className="text-md font-medium text-gray-600 dark:text-white">
                  {category.items}
                </p>
              </td>
              <td
                className="min-w-[150px] border-white/0 py-3  pr-4"
              >
                <p className="text-md font-medium text-gray-600 dark:text-white">
                  {category.topings}
                </p>
              </td>
              <td
                className="min-w-[150px] border-white/0 py-3  pr-4"
              >
                <p className="text-md font-medium text-gray-600 dark:text-white">
                  {category.crusts}
                </p>
              </td>
              <td
                className="min-w-[150px] border-white/0 py-3  pr-4"
              >
                <p className="text-md font-medium text-gray-600 dark:text-white">
                  {category.sizes}
                </p>
              </td>
              <td
                className="min-w-[150px] border-white/0 py-3  pr-4"
              >
                <p className="text-md font-medium text-gray-600 dark:text-white">
                  <BsTrashFill className='hover:scale-110' onClick={() => handleDelete(category._id)} />
                </p>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CategoryTable;