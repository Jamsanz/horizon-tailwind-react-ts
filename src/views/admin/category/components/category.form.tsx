import { useMutation } from '@apollo/client';
import Button from 'components/button/default';
import InputField from 'components/fields/InputField';
import { ADD_CATEGORY } from 'graphql/mutations/category/post';
import { UPDATE_CATEGORY } from 'graphql/mutations/category/update';
import { GET_CATEGORIES } from 'graphql/queries/categories/get';
import { Category } from 'graphql/__generated__/graphql';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { MdFileUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import { cloudinaryUpload } from 'utils';
import { MouseEvent } from 'react';

interface IProps {
  category?: Category
  setCategoryEmpty?: React.Dispatch<React.SetStateAction<Category>>
}

const CategoryForm: React.FC<IProps> = (props) => {
  const [addCategory] = useMutation(ADD_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [category, setCategory] = useState<Category>(props.category);
  const inputRef = useRef<any>(null);
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef?.current?.click();
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      alert('Please select an SVG file');
      return;
    }

    const reader = new FileReader();
    setFile(file)

    reader.onload = function (event) {
      setPreview(event.target.result as string);
    };

    reader.readAsDataURL(file);

  };

  const validate = (): boolean => {
    if (!category.name) {
      toast.error("Category name is required");
      return false;
    }
    if (!preview) {
      toast.error("Category image is required");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      if (props.category?._id) {
        if (file) {
          const { secure_url } = await cloudinaryUpload(file);
          updateCategory({
            variables: {
              id: props.category?._id,
              updateCategoryInput: {
                name: category.name,
                imageUrl: secure_url
              }
            },
            onError: (error) => toast.error(error.message),
            refetchQueries: [{ query: GET_CATEGORIES }],
            onCompleted: () => toast.success("Category updated successfully")
          })
        } else {
          updateCategory({
            variables: {
              id: props.category?._id,
              updateCategoryInput: {
                name: category.name
              }
            },
            onError: (error) => toast.error(error.message),
            refetchQueries: [{ query: GET_CATEGORIES }],
            onCompleted: () => toast.success("Category updated successfully")
          })
        }
        return;
      }
      const { secure_url } = await cloudinaryUpload(file);

      await addCategory({
        variables: {
          createCategoryInput: {
            name: category.name,
            imageUrl: secure_url
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
        refetchQueries: [{ query: GET_CATEGORIES }],
        onCompleted: () => {
          toast.success("Category added successfuly")
          setCategory({imageUrl: "", name: ""});
          props.setCategoryEmpty(null);
          setFile(null);
        }
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {
    setCategory(props?.category);
    setPreview(props?.category?.imageUrl);
  }, [props?.category]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="h-full w-full mb-2 rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
      >
        <button
          onClick={handleClick}
          className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
          disabled={loading}
        >
          {
            preview ? <img src={preview} className="w-fit" /> :
              <>
                <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                  Upload Image
                </h4>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Only SVG files are allowed
                </p>
              </>
          }
        </button>
      </div>
      <InputField
        variant=''
        label='Name'
        name='name'
        placeholder='Pizza Specials'
        value={category?.name}
        onChange={e => setCategory({ ...category, name: e.target.value })}
        disabled={loading}
        required
      />
      <input
        ref={inputRef}
        type="file"
        accept='.svg'
        onChange={handleUpload}
        multiple
        name=""
        id=""
        hidden
      />
      <Button type='submit' disabled={loading}>
        {
          loading ? 'Loading...': props.category?._id ? 'Update' : 'Add'
        }
      </Button>
      {
        props?.category?._id && <span onClick={() => {
          setCategory({ name: "", imageUrl: "" });
          props.setCategoryEmpty(null)
        }}>Clear</span>
      }
    </form>
  )
}

export default CategoryForm;