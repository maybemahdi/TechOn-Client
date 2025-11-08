import Footer from "@/components/shared/Footer/Footer";
import NavBar from "@/components/shared/NavBar/NavBar";
// import NavBar from "@/components/shared/Navbar/NavBar";
import WithUser from "@/role-wrappers/WithUser";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <WithUser>
      <div className="">
        <NavBar />
        <div className="mt-[60px]">{children}</div>
        <Footer />
      </div>
    </WithUser>
  );
};

export default layout;
