import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TOPING } from 'graphql/mutations/toping/delete';
import { GET_TOPINGS } from 'graphql/queries/topings/get';
import { Toping } from 'graphql/__generated__/graphql';
import React from 'react'
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { DeleteAlert } from 'utils/alert';

interface IProps {
  setToping?: React.Dispatch<React.SetStateAction<Toping>>;
  activeId?: string;
  categoryId?: string;
}

const TopingsTable: React.FC<IProps> = (props) => {
  const { data, loading, error } = useQuery(GET_TOPINGS, {
    variables: {
      categoryId: props.categoryId
    },
    skip: !props.categoryId
  });

  const [deleteToping] = useMutation(DELETE_TOPING);

  const setEmpty = () => {
    props?.setToping({ toping: "", price: 0, categoryId: "", _id: "", qty: 0 });
  }

  const handleDelete = (id: string) => {
    DeleteAlert().then((res) => {
      if (res.isConfirmed) {
        deleteToping({
          variables: {
            id,
          },
          refetchQueries: [{ query: GET_TOPINGS, variables: { categoryId: props.categoryId } }],
          onCompleted: () => {
            toast.success("Toping deleted successfully")
            setEmpty();
          }
        });
      }
    });
  }

  if (loading) return <div className='h-24 w-full grid place-content-center'>Loading...</div>;

  if (error) return <div className='h-24 w-full grid place-content-center'>{error.message}</div>;


  return (
    data?.categoryToping.length > 0 ?
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
            data?.categoryToping?.map(toping => (
              <tr key={toping._id} onClick={() => props.setToping(toping)} className={`${props?.activeId === toping._id ? 'bg-gray-50' : ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      {toping.toping}
                    </p>
                  </div>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    {toping.price}
                  </p>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    <BsTrashFill className='hover:scale-110' onClick={() => handleDelete(toping._id)} />
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

export default TopingsTable