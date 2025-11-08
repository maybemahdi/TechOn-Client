// import Navbar from "@/components/shared/Navbar/NavBar";
import { ReactNode } from "react";
import NavBar from './../../components/shared/NavBar/NavBar';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <NavBar />
      <div className="mt-[60px]">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default layout;
