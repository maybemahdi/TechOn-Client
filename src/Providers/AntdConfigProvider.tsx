import { ConfigProvider } from 'antd';
import React from 'react';

const AntdConfigProvider = ({children}:{children: React.ReactNode}) => {
    return (
      <ConfigProvider theme={{ token: { colorPrimary: "#2563eb" } }}>
        {children}
      </ConfigProvider>
    );
};

export default AntdConfigProvider;