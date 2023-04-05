import Card from 'components/card'
import React, { ReactNode } from 'react'

interface IProps {
  title: string;
  rightOption?: JSX.Element;
  loading?: boolean;
  children: any
}

const DataTable: React.FC<IProps> = (props) => {
  return (
    <Card extra={"w-full overflow-auto px-6 pb-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {props.title}
        </div>
      </header>
      {
        props.loading ?
          <div className="grid place-content-center w-full h-24">
            <p>Loading...</p>
          </div> :
          <div className="mt-3 overflow-x-scroll">
            {props?.children}
          </div>
      }
    </Card>
  )
}

export default DataTable