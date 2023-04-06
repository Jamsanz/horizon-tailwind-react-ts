import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "graphql/queries/categories/get";
import Categories from "./components/category.table";
import DataTable from "components/table/DataTable";
import { Category } from "graphql/__generated__/graphql";
import { useState } from "react";
import DataCard from "components/card/DataCard";
import CategoryForm from "./components/category.form";
import { MdFileUpload } from "react-icons/md";

const Tables = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [category, setCategory] = useState<Category>();

  if (error) return <div className="w-full h-24 grid place-content-center">{error.message}</div>
  
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-6">
        <div className="col-span-4">
          <DataTable title="Category Table" loading={loading}>
            <Categories
              data={data?.categories}
              setCategory={setCategory}
              activeId={category?._id}
            />
          </DataTable>
        </div>
        <div className="col-span-2 ">
          <DataCard title="">
            <CategoryForm
              category={category}
              setCategoryEmpty={setCategory}
            />
          </DataCard>
        </div>
      </div>

    </div>
  );
};

export default Tables;
