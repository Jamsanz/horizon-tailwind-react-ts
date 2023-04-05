import React from 'react'
import ErrorContainer from './Error';
import Loading from './Loading';


interface IProps {
  error?: any;
  data?: any;
  isLoading?: boolean;
  children?: JSX.Element
}

const QueryResult = (props: IProps) => {
  if (props.isLoading) {
    return (<Loading />)
  }

  if (props.error) {
    return <ErrorContainer error={props.error} />
  }

  return props.children;

}

export default QueryResult;