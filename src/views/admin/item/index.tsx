import { useQuery } from '@apollo/client';
import Card from 'components/card';
import DataCard from 'components/card/DataCard';
import DataTable from 'components/table/DataTable';
import { GET_CATEGORIES } from 'graphql/queries/categories/get';
import { Category, Item } from 'graphql/__generated__/graphql';
import React, { useState } from 'react'
import ItemForm from './components/item.form';
import ItemsTable from './components/item.table';

const Items: React.FC = () => {
  const { data: categories, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES);
  const [category, setCategory] = useState<Category>();
  const [item, setItem] = useState<Item>();

  return (
    <div>
      <Card extra='mt-5'>
        <select
          onChange={e => setCategory(JSON.parse(e.target.value))}
          className='flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none '
        >
          <option value="" selected disabled>-- Select Category --</option>
          {
            categories?.categories.map((category) =>
              <option value={JSON.stringify(category)} key={category._id}>{category.name}</option>
            )
          }
        </select>
      </Card>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-6">
        {/* left section */}
        <div className='col-span-4'>
          <DataTable title={`${category?.name ? category.name : ''} Items`} >
            <ItemsTable
              setItem={setItem}
              activeId={item?._id}
              categoryId={category?._id}
            />
          </DataTable>
        </div>
        {/* right section */}
        <div className='col-span-2'>
          <DataCard title=''>
            <ItemForm
              item={item}
              setItemEmpty={setItem}
              categoryId={category?._id}
            />
          </DataCard>
        </div>
      </div>
    </div>
  )
}

export default Items