import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "graphql/queries/categories/get";
import DataTable from "components/table/DataTable";
import Crust from "../crust/components/crust.table";
import { Category, Crust as ICrust, Item, Size, Toping } from "graphql/__generated__/graphql";
import { useState } from "react";
import DataCard from "components/card/DataCard";
import Sizes from "../size/components/size.table";

import CrustForm from "../crust/components/crust.form";
import SizeForm from "../size/components/size.form";
import Categories from "../category/components/category.table";
import CategoryForm from "../category/components/category.form";

const Tables = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [category, setCategory] = useState<Category>();
  const [crust, setCrust] = useState<ICrust>();
  const [toping, setToping] = useState<Toping>();
  const [size, setSize] = useState<Size>();
  const [item, setItem] = useState<Item>();
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-4">
        <div className="col-span-3">
          <DataTable title="Category Table" loading={loading}>
            <Categories
              data={data?.categories}
              setCategory={setCategory}
              activeId={category?._id}
            />
          </DataTable>
        </div>
        <DataCard title="Category Form">
          <CategoryForm
            category={category}
            setCategoryEmpty={setCategory}
          />
        </DataCard>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-4">
        <div>
          <DataTable title="Crust Table" >
            <Crust
              activeId={crust?._id}
              setCrust={setCrust}
              categoryId={category?._id}
            />
          </DataTable>
        </div>
        <div>
          <DataCard title="Crust Form">
            <CrustForm category={category} />
          </DataCard>
        </div>
        <div>
          <DataTable title="Size Table" >
            <Sizes
              activeId={size?._id}
              setSize={setSize}
              categoryId={category?._id}
            />
          </DataTable>
        </div>
        <div>
          <DataCard title="Size Form">
            <SizeForm category={category} />
          </DataCard>
        </div>
      </div>
    </div>
  );
};

export default Tables;
