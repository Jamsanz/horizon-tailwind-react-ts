import { useMutation } from '@apollo/client';
import Button from 'components/button/default';
import InputField from 'components/fields/InputField';
import { ADD_ITEM } from 'graphql/mutations/items/post';
import { UPDATE_ITEM } from 'graphql/mutations/items/update';
import { GET_ITEMS } from 'graphql/queries/items/item';
import { Item } from 'graphql/__generated__/graphql';
import React, { ChangeEvent, MouseEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { MdFileUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import { cloudinaryUpload } from 'utils';

interface IProps {
  item?: Item
  setItemEmpty?: React.Dispatch<React.SetStateAction<Item>>,
  categoryId?: string;
}

const ItemForm: React.FC<IProps> = (props) => {
  const [addItem] = useMutation(ADD_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [item, setItem] = useState<Item>(props.item);
  const inputRef = useRef<any>(null);
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef?.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({...item, [name]: value})
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    setFile(file)

    reader.onload = function (event) {
      setPreview(event.target.result as string);
    };

    reader.readAsDataURL(file);

  };

  const emptyForm = () => {
    setItem({ name: "", imageUrl: "", price: 0, description: "", categoryId: '', _id: '' });
    props?.setItemEmpty(null);
    setFile(null);
    setPreview(null);
  }

  const validate = (): boolean => {
    if (!item?.name) {
      toast.error("Item name is required");
      return false;
    }
    if (!item?.description) {
      toast.error("Item description is required");
      return false;
    }
    if (!item?.price) {
      toast.error("Item price is required");
      return false;
    }
    if (!preview) {
      toast.error("Item image is required");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      if (props.item?._id) {
        if (file) {
          const { secure_url } = await cloudinaryUpload(file);
          updateItem({
            variables: {
              id: props?.item._id,
              updateItemInput: {
                name: item.name,
                description: item.description,
                price: +item?.price,
                imageUrl: secure_url
              }
            },
            onError: (error) => toast.error(error.message),
            refetchQueries: [{ query: GET_ITEMS, variables: {categoryId: props.categoryId} }],
            onCompleted: () => toast.success("Item updated successfully")
          })
        } else {
          updateItem({
            variables: {
              id: props?.item?._id,
              updateItemInput: {
                name: item.name,
                description: item.description,
                price: +item?.price
              }
            },
            onError: (error) => toast.error(error.message),
            refetchQueries: [{ query: GET_ITEMS, variables: { categoryId: props.categoryId } }],
            onCompleted: () => toast.success("Item updated successfully")
          })
        }
        return;
      }
      const { secure_url } = await cloudinaryUpload(file);

      await addItem({
        variables: {
          createItemInput: {
            name: item.name,
            imageUrl: secure_url,
            description: item.description,
            categoryId: props.categoryId,
            price: +item.price
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
        refetchQueries: [{ query: GET_ITEMS, variables: { categoryId: props.categoryId } }],
        onCompleted: () => {
          toast.success("Item added successfuly")
          emptyForm();
        }
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {
    setItem(props?.item);
    setPreview(props?.item?.imageUrl);
  }, [props?.item]);


  return (
    <form onSubmit={handleSubmit}>
      <div
        className="h-full w-full mb-2 rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
      >
        <button
          onClick={handleClick}
          className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
        >
          {
            preview ? <img src={preview} className="w-fit" /> :
              <>
                <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                  Upload Image
                </h4>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  PNG, JPG and GIF files are allowed
                </p>
              </>
          }
        </button>
      </div>
      <InputField
        variant=''
        label='Name'
        name='name'
        placeholder='Pepperoni Pizza'
        extra={'mb-2'}
        required
        onChange={handleChange}
        value={item?.name}
        // value={Item?.name}
        // onChange={e => setItem({ ...Item, name: e.target.value })}
      />
      <InputField
        variant=''
        label='Description'
        name='description'
        placeholder='Heavenly made with mushrooms'
        extra={'mb-2'}
        required
        onChange={handleChange}
        value={item?.description}
        // value={Item?.name}
        // onChange={e => setItem({ ...Item, name: e.target.value })}
      />
      
      <InputField
        variant=''
        label='Price'
        name='price'
        type={"number"}
        placeholder='5000'
        extra={'mb-2'}
        required
        onChange={handleChange}
        value={item?.price}
        // value={Item?.name}
        // onChange={e => setItem({ ...Item, name: e.target.value })}
      />
      
      <input
        ref={inputRef}
        type="file"
        accept='.png,.jpeg,.gif,.jpg'
        onChange={handleUpload}
        name=""
        id=""
        hidden
      />
      {
        props?.categoryId &&
      <Button type='submit' disabled={loading}>
        {
          loading ? 'Loading...' : props.item ? 'Update' : 'Add'
        }
      </Button>
      }
      {
        props?.item && <span onClick={emptyForm}>Clear</span>
      }
    </form>
  )
}

export default ItemForm;