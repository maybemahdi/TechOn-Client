import { Spin } from "antd";

const Loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Spin size="large" />
    </main>
  );
};

export default Loading;
