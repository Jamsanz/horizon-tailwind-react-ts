import { useMutation, useQuery } from '@apollo/client';
import { DELETE_SIZE } from 'graphql/mutations/size/delete';
import { GET_SIZES } from 'graphql/queries/size/get';
import { Size } from 'graphql/__generated__/graphql';
import React from 'react'
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { DeleteAlert } from 'utils/alert';

interface IProps {
  setSize?: React.Dispatch<React.SetStateAction<Size>>;
  activeId?: string;
  categoryId?: string;
}

const SizesTable: React.FC<IProps> = (props) => {
  const { data, loading, error } = useQuery(GET_SIZES, {
    variables: {
      categoryId: props.categoryId
    },
    skip: !props.categoryId
  });

  const [deleteSize] = useMutation(DELETE_SIZE);
  const emptyForm = () => {
    props?.setSize({size: "", price: 0, categoryId: "", _id: ""});
  }

  const handleDelete = (id: string) => {
    DeleteAlert().then((res) => {
      if (res.isConfirmed) {
        deleteSize({
          variables: {
            id,
          },
          refetchQueries: [{ query: GET_SIZES, variables: { categoryId: props.categoryId } }],
          onCompleted: () => {
            toast.success("Category deleted successfully")
            emptyForm();
          }
        });
      }
    });
  }

  if (loading) return <div className='h-24 w-full grid place-content-center'>Loading...</div>;

  if (error) return <div className='h-24 w-full grid place-content-center'>{error.message}</div>;


  return (
    data?.categorySize.length > 0 ?
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
            data?.categorySize?.map(size => (
              <tr key={size._id} onClick={() => props.setSize(size)} className={`${props?.activeId === size._id ? 'bg-gray-50' : ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      {size.size}
                    </p>
                  </div>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    {size.price}
                  </p>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    <BsTrashFill className='hover:scale-110' onClick={() => handleDelete(size._id)} />
                  </p>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      :
      <div className="w-full h-24 grid place-content-center">
        <p>No data availabe</p>
      </div>
  )
}

export default SizesTable