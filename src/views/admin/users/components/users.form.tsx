import { AxiosError } from 'axios';
import Button from 'components/button/default';
import DataCard from 'components/card/DataCard';
import InputField from 'components/fields/InputField';
import { IUser } from 'interfaces/user.interface';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { http } from 'utils';

export let emptyUser = {
  name: '',
  phone: '',
  role: [''],
  email: ''
}

interface IProps {
  user?: IUser,
  setUser?: React.Dispatch<React.SetStateAction<IUser>>,
  refetch: () => void
}
const UsersForm: React.FC<IProps> = (props) => {
  const [user, setUser] = useState<IUser>(props?.user);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({...prev, [name]: value}))
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (props?.user?._id) {
        const { data } = await http.patch(`/users/${user?._id}`, { ...user, role: [user?.role]});
        toast.success(data.message);
        props.refetch();
        return;
      }
      const { data } = await http.post('/signup', {...user, role: [user?.role]});
      toast.success(data.message);
      setUser(emptyUser as IUser);
      props.refetch();

    } catch (error) {
      toast.error(((error as AxiosError)?.response?.data as any)?.message )
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    setUser({
      _id: props?.user?._id,
      name: props?.user?.name,
      phone: props?.user?.phone,
      email: props?.user?.email,
    });
  }, [props.user]);
  useEffect(() => {
    console.log(user)
   }, [user]);
  return (
    <DataCard title='Form'>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2'>
        <InputField
          label='Name'
          placeholder='Jane doe'
          extra='mb-1'
          name='name'
          onChange={handleChange}
          value={user?.name}
          required
        />
        <InputField
          label='Phone'
          name='phone'
          placeholder='Jane doe'
          onChange={handleChange}
          value={user?.phone}
          required
        />
        <select
          value={user?.role}
          name='role'
          onChange={handleChange}
          className='flex h-12 w-full col-span-2 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none '
        >
          <option value="" selected disabled>-- Select Role --</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
        </select>
        <InputField
          label='Email'
          name='email'
          type='email'
          placeholder='Email Address'
          value={user?.email}
          readOnly={!!user?._id}
          onChange={handleChange}
          required
        />
        <InputField
          label='Password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          type='password'
          required={!!!props?.user?._id}
        />
          <Button type='submit' extraStyle='col-span-2'>
            {
             loading ? 'Loading...' : props.user?._id ? 'Update' : 'ADD'
            }
          </Button>
        {
          props?.user?._id && <span role='button' onClick={()=> props.setUser(emptyUser as IUser)}>Clear</span>
        }
      </form>
    </DataCard>
  )
}

export default UsersForm;