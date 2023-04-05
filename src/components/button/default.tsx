import React, {DetailedHTMLProps, ButtonHTMLAttributes} from 'react'

interface IProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className"> {
  extraStyle?: string;
}

const Button = ({ children, extraStyle, ...props}: IProps) => {
  return (
    <button
      className={`linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${extraStyle}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;