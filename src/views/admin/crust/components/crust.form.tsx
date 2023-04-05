import { useMutation } from '@apollo/client';
import Button from 'components/button/default';
import InputField from 'components/fields/InputField';
import { ADD_CRUST } from 'graphql/mutations/crust/post';
import { UPDATE_CRUST } from 'graphql/mutations/crust/update';
import { GET_CRUSTS } from 'graphql/queries/crust/get';
import { Category, Crust } from 'graphql/__generated__/graphql'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface IProps {
  crust?: Crust
  category?: Category;
  setCrust?: React.Dispatch<React.SetStateAction<Crust>>
}

const CrustForm: React.FC<IProps> = (props) => {
  const [addCrust, {loading: addLoading}] = useMutation(ADD_CRUST);
  const [updateCrust, {loading: updateLoading}] = useMutation(UPDATE_CRUST);
  const [crust, setCrust] = useState<Crust>(props.crust);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCrust({ ...crust, [name]: value });
  }

  const emptyForm = () => {
    setCrust({ crust: "", price: 0, categoryId: "", _id: "" });
    props?.setCrust(null);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (props?.crust?._id) {
        updateCrust({
          variables: {
            id: crust._id,
            updateCrustInput: {
              crust: crust.crust,
              price: +crust.price
            }
          },
          refetchQueries: [{ query: GET_CRUSTS, variables: { categoryId: crust.categoryId } }],
          onCompleted: () => toast.success("Crust updated successfully"),
          onError: (err) => toast.error(err.message)
        })
        return;
      }
      addCrust({
        variables: {
          createCrustInput: {
            crust: crust.crust,
            categoryId: props.category._id,
            price: +crust.price
          }
        },
        refetchQueries: [{ query: GET_CRUSTS, variables: { categoryId: props.category._id } }],
        onCompleted: () => {
          toast.success("Crust updated successfully");
          emptyForm();
        },
        onError: (err) => toast.error(err.message)
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCrust(props.crust);
  }, [props.crust]);

  return (
    props?.category?._id ?
      <form onSubmit={handleSubmit}>
        <InputField
          label='Name'
          name='crust'
          placeholder='Crust'
          onChange={handleChange}
          value={crust?.crust}
        />
        <InputField
          label='Price'
          type="number"
          name='price'
          placeholder='500'
          onChange={handleChange}
          value={crust?.price}
        />
        {
          props.category &&
          <Button type='submit'>
            {
              addLoading || updateLoading ? 'Loading...' : props?.crust?._id ? 'Update' : 'ADD'
            }
          </Button>
        }
        {
          props?.crust?._id && <span onClick={emptyForm}>Clear</span>
        }
      </form> :
      <div className="w-full h-24 grid place-content-center">
        <p>No Category Selected</p>
      </div>
  )
}

export default CrustForm