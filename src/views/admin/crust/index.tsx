import { useQuery } from '@apollo/client';
import Card from 'components/card';
import DataCard from 'components/card/DataCard';
import DataTable from 'components/table/DataTable';
import { GET_CATEGORIES } from 'graphql/queries/categories/get';
import { GET_CRUSTS } from 'graphql/queries/crust/get';
import { Category, Crust, Item } from 'graphql/__generated__/graphql';
import React, { ChangeEvent, useEffect, useState } from 'react'
import CrustForm from './components/crust.form';
import CrustsTable from './components/crust.table';


interface IProps {
  data?: Item[],
  setCategory?: any;
  activeId?: string;
}

const Crusts: React.FC<IProps> = (props) => {
  const { data: categories, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES);
  const [category, setCategory] = useState<Category>();
  const [crust, setCrust] = useState<Crust>();
  
  return (
    <div>
      <Card extra='mt-5'>
        <select
          onChange={e => setCategory(JSON.parse(e.target.value))}
          className='flex h-12 w-full Crusts-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none '
        >
          <option value="" selected disabled>-- Select Category --</option>
          {
            categories?.categories.map((category) =>
              <option value={JSON.stringify(category)} key={category._id}>{category.name}</option>
            )
          }
        </select>
      </Card>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-4">
        {/* left section */}
        <div className='col-span-3'>
          <DataTable title={`${category?.name ? category.name : ''} Crusts`} >
            <CrustsTable
              activeId={crust?._id}
              setCrust={setCrust}
              categoryId={category?._id}
            />
          </DataTable>
        </div>
        {/* right section */}
        <div>
          <DataCard title='Add/Edit Form'>
            <CrustForm
              crust={crust}
              category={category}
              setCrust={setCrust}
            />
          </DataCard>
        </div>
      </div>
    </div>
  )
}

export default Crusts