import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import WithAdmin from "@/role-wrappers/WithAdmin";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <WithAdmin>
      <DashboardLayout>{children}</DashboardLayout>
    </WithAdmin>
  );
};

export default layout;
