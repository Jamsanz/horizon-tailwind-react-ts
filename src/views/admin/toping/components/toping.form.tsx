import { useMutation } from '@apollo/client';
import Button from 'components/button/default';
import InputField from 'components/fields/InputField';
import { ADD_TOPING } from 'graphql/mutations/toping/post';
import { UPDATE_TOPING } from 'graphql/mutations/toping/update';
import { GET_TOPINGS } from 'graphql/queries/topings/get';
import { Category, Toping } from 'graphql/__generated__/graphql'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface IProps {
  toping?: Toping;
  category?: Category;
  setToping: React.Dispatch<React.SetStateAction<Toping>>
}

const TopingForm: React.FC<IProps> = (props) => {
  const [addToping, {loading: addLoading}] = useMutation(ADD_TOPING);
  const [updateToping, {loading: updateLoading}] = useMutation(UPDATE_TOPING);
  const [toping, setToping] = useState<Toping>(props.toping);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setToping({ ...toping, [name]: value });
  };

  const emptyForm = () => {
    props?.setToping(null);
    setToping({ toping: "", price: 0, categoryId: '', _id: '', qty: 0 });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (props.toping._id) {
        updateToping({
          variables: {
            id: toping._id,
            updateTopingInput: {
              toping: toping.toping,
              price: +toping.price,
              qty: +toping.qty
            }
          },
          refetchQueries: [{ query: GET_TOPINGS, variables: { categoryId: toping.categoryId } }],
          onCompleted: () => toast.success("Toping updated successfully"),
          onError: (err) => toast.error(err.message)
        })
        return;
      }
      addToping({
        variables: {
          createTopingInput: {
            toping: toping.toping,
            categoryId: props.category._id,
            price: +toping.price,
            qty: 0
          }
        },
        refetchQueries: [{ query: GET_TOPINGS, variables: { categoryId: props.category._id } }],
        onCompleted: () => {
          toast.success("Toping added successfully")
          emptyForm();
        },
        onError: (err) => toast.error(err.message)
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setToping(props.toping);
  }, [props.toping]);

  return (
    props?.category?._id ?
      <form onSubmit={handleSubmit}>
        <InputField
          label='Toping'
          name='toping'
          placeholder='Toping'
          onChange={handleChange}
          value={toping?.toping}
        />
        <InputField
          label='Price'
          type="number"
          name='price'
          placeholder='500'
          onChange={handleChange}
          value={toping?.price}
        />
        {
          props.category &&
          <Button type='submit'>
            {
              addLoading || updateLoading ? 'Loading...' : props.toping?._id ? 'Update' : 'ADD'
            }
          </Button>
        }
        {
          props.toping?._id && <span role={"button"} onClick={emptyForm}>Clear</span>
        }
      </form> :
      <div className="w-full h-24 grid place-content-center">
        <p>No category selected</p>
      </div>
  )
}

export default TopingForm