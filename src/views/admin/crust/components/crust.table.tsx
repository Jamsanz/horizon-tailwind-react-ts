import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CRUST } from 'graphql/mutations/crust/delete';
import { GET_CRUSTS } from 'graphql/queries/crust/get';
import { Crust } from 'graphql/__generated__/graphql';
import React from 'react'
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { DeleteAlert } from 'utils/alert';

interface IProps {
  setCrust?: React.Dispatch<React.SetStateAction<Crust>>;
  activeId?: string;
  categoryId?: string;
}

const CrustsTable: React.FC<IProps> = (props) => {
  const { data, loading, error } = useQuery(GET_CRUSTS, {
    variables: {
      categoryId: props.categoryId
    },
    skip: !props.categoryId
  });

  const [deleteCrust] = useMutation(DELETE_CRUST);
  const emptyForm = () => {
    props?.setCrust({ crust: "", price: 0, categoryId: "", _id: "" });
  }

  const handleDelete = (id: string) => {
    DeleteAlert().then((res) => {
      if (res.isConfirmed) {
        deleteCrust({
          variables: {
            id,
          },
          refetchQueries: [{ query: GET_CRUSTS, variables: { categoryId: props.categoryId } }],
          onCompleted: () => {
            toast.success("Category deleted successfully");
            emptyForm();
          }
        });
      }
    });
  }


  if (loading) return <div className='h-24 w-full grid place-content-center'>Loading...</div>;

  if (error) return <div className='h-24 w-full grid place-content-center'>{error.message}</div>;


  return (
    data?.categoryCrust.length > 0 ?
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
            data?.categoryCrust?.map(crust => (
              <tr key={crust._id} onClick={() => props.setCrust(crust)} className={`${props?.activeId === crust._id ? 'bg-gray-50' : ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      {crust.crust}
                    </p>
                  </div>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    {crust.price}
                  </p>
                </td>
                <td
                  className="min-w-[150px] border-white/0 py-3  pr-4"
                >
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    <BsTrashFill className='hover:scale-110' onClick={() => handleDelete(crust._id)} />
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

export default CrustsTable