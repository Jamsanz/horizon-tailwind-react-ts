import { IUser } from 'interfaces/user.interface';
import UsersForm from './components/users.form';
import UsersTable from './components/users.table';
import { useState } from 'react';
import useFetch from 'hooks/useFetch';

const Users = () => {
  const [user, setUser] = useState<IUser>();
  const { data, loading, error, refetch } = useFetch('/users');

  return (
    <div className="grid md:grid-cols-5 gap-5">
      <div className='w-full md:col-span-3'>
        <UsersTable
          setItem={setUser}
          data={data as IUser[]}
          loading={loading}
          activeId={user?._id}
          refetch={refetch}
        />
      </div>
      <div className='w-full md:col-span-2'>
        <UsersForm
          user={user}
          setUser={setUser}
          refetch={refetch}
        />
      </div>
    </div>
  )
}

export default Users;