import { useMutation } from '@apollo/client';
import Button from 'components/button/default';
import InputField from 'components/fields/InputField';
import { ADD_SIZE } from 'graphql/mutations/size/post';
import { UPDATE_SIZE } from 'graphql/mutations/size/update';
import { GET_SIZES } from 'graphql/queries/size/get';
import { Category, Size } from 'graphql/__generated__/graphql'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface IProps {
  size?: Size;
  category?: Category;
  setSize?: React.Dispatch<React.SetStateAction<Size>>
}

const SizeForm: React.FC<IProps> = (props) => {
  const [addSize, {loading: addLoading}] = useMutation(ADD_SIZE);
  const [updateSize, {loading: updateLoading}] = useMutation(UPDATE_SIZE);
  const [size, setSize] = useState<Size>(props.size);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSize({ ...size, [name]: value });
  };

  const emptyForm = () => {
    props?.setSize(null);
    setSize({size: "", price: 0, categoryId: '', _id: ''})
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (props?.size?._id) {
        updateSize({
          variables: {
            id: size._id,
            updateSizeInput: {
              size: size.size,
              price: +size.price
            }
          },
          refetchQueries: [{ query: GET_SIZES, variables: { categoryId: size.categoryId } }],
          onCompleted: () => toast.success("Size updated successfully"),
          onError: (err) => toast.error(err.message)
        })
        return;
      }
      addSize({
        variables: {
          createSizeInput: {
            size: size.size,
            categoryId: props.category._id,
            price: +size.price
          }
        },
        refetchQueries: [{ query: GET_SIZES, variables: { categoryId: props.category._id } }],
        onCompleted: () => {
          toast.success("Size updated successfully");
          emptyForm();
        },
        onError: (err) => toast.error(err.message)
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSize(props.size);
  }, [props.size]);
  return (
    props?.category?._id ?
      <form onSubmit={handleSubmit}>
        <InputField
          label='Size'
          name='size'
          placeholder='Size'
          value={size?.size}
          onChange={handleChange}
        />
        <InputField
          label='Price'
          type="number"
          name='price'
          placeholder='500'
          value={size?.price}
          onChange={handleChange}
        />
        {
          props.category &&
          <Button type='submit'>
            {
              addLoading || updateLoading ? 'Loading...': props?.size?._id ? 'Update' : 'ADD'
            }
          </Button>
        }
        {
          props?.size?._id && <span onClick={emptyForm}>Clear</span>
        }
      </form> :
      <div className="w-full h-24 grid place-content-center">
        <p>No category selected</p>
      </div>
  )
}

export default SizeForm