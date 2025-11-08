/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FormProvider, useForm } from 'react-hook-form';

import { ConfigProvider } from 'antd';
import { cn } from '@/lib/utils';

const MyFormWrapper = ({
  onSubmit,
  className,
  children,
  defaultValues,
  resolver,
}: {
  onSubmit: (data: any, reset: () => void) => void;
  className?: string;
  children: React.ReactNode;
  defaultValues?: any;
  resolver?: import('react-hook-form').Resolver<any, any>;
}) => {
  const formConfig: Record<string, any> = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }

  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit = (data: any) => {
    onSubmit(data, reset); // Pass reset function to onSubmit
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            hoverBorderColor: '#1F4529',
            activeBorderColor: '#1F4529',
            
          },
          Input: {
            hoverBorderColor: '#1F4529',
            activeBorderColor: '#1F4529',

            colorText: '#1F4529',
          },
          Checkbox: {
            colorBorder: '#1F4529',
            colorPrimary: '#1F4529',
            colorPrimaryHover: '#1F4529',
          },
          DatePicker: {
            // colorPrimary: '#1F4529',
            colorPrimaryHover: '#1F4529',
            // colorBorder: '#1F4529',
            // colorText: '#1F4529',
            // colorTextDisabled: '#1F4529',
          },
        },
      }}
    >
      <FormProvider {...methods}>
        <form className={cn('', className)} onSubmit={handleSubmit(submit)}>
          {children}
        </form>
      </FormProvider>
    </ConfigProvider>
  );
};

export default MyFormWrapper;
