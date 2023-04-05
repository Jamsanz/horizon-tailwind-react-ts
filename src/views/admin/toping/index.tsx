import { useQuery } from '@apollo/client';
import Card from 'components/card';
import DataCard from 'components/card/DataCard';
import DataTable from 'components/table/DataTable';
import { GET_CATEGORIES } from 'graphql/queries/categories/get';
import { Category, Toping } from 'graphql/__generated__/graphql';
import React, { useState } from 'react'
import TopingForm from './components/toping.form';
import TopingsTable from './components/toping.table';

const Topings: React.FC = () => {
  const { data: categories, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES);
  const [category, setCategory] = useState<Category>();
  const [toping, setToping] = useState<Toping>();

  return (
    <div>
      <Card extra='mt-5'>
        <select
          onChange={e => setCategory(JSON.parse(e.target.value))}
          className='flex h-12 w-full Topings-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none '
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
          <DataTable title={`${category?.name ? category.name : ''} Topings`} >
            <TopingsTable
              activeId={toping?._id}
              setToping={setToping}
              categoryId={category?._id}
            />
          </DataTable>
        </div>
        {/* right section */}
        <div>
          <DataCard title='Add/Edit Form'>
            <TopingForm
              toping={toping}
              category={category}
              setToping={setToping}
            />
          </DataCard>
        </div>
      </div>
    </div>
  )
}

export default Topings