import { AxiosError } from 'axios';
import DataTable from 'components/table/DataTable'
import { IUser } from 'interfaces/user.interface';
import React from 'react'
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { http } from 'utils';
import { DeleteAlert } from 'utils/alert';
import { emptyUser } from './users.form';

interface IProps{
  setItem: React.Dispatch<React.SetStateAction<IUser>>
  activeId?: string;
  data: IUser[];
  loading: boolean;
  refetch: () => void
}
const UsersTable: React.FC<IProps> = (props) => {

  const handleDelete = (id: string) => {
    DeleteAlert().then(async (res) => {
      if (res.isConfirmed) {
        try {
          const { data } = await http.delete(`/users/${id}`);
          toast.success(data.message);
          props.refetch();
          props.setItem(emptyUser as IUser);
        } catch (error) {
          toast.error(((error as AxiosError)?.response?.data as any)?.message)
        }
      }
    })
  }

  return (
    <DataTable loading={props.loading} title='Users'>
      {props?.data?.length > 0 ?
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
                  <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
                </div>
              </th>
              <th
                className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
              >
                <div className="items-center justify-between text-xs text-gray-200">
                  <p className="text-sm font-bold text-gray-600 dark:text-white">ROLE</p>
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
              props.data?.map(item => (
                <tr key={item._id} onClick={() => props.setItem(item)} className={`${props?.activeId === item._id ? 'bg-gray-50' : ''} hover:cursor-pointer hover:bg-gray-50 dark:hover:!bg-navy-700`}>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src={item?.profileImg}
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
                      {item?.email}
                    </p>
                  </td>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <p className="text-md font-medium text-gray-600 dark:text-white">
                      {item?.role[0]}
                    </p>
                  </td>
                  <td
                    className="min-w-[150px] border-white/0 py-3  pr-4"
                  >
                    <p className="text-md font-medium text-gray-600 dark:text-white">
                      {/* <MdModeEdit className='hover:scale-110' onClick={() => handleDelete(item._id)} /> */}
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
      }
    </DataTable>
  )
}

export default UsersTable