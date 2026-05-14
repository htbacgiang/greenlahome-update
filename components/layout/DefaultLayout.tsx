import { FC, ReactNode } from "react";
import Footer from "../common/Footer";
import GoogleAnalytics from "../common/GoogleAnalytics";
import MessengerButton from "../button/MessengerButton";
import Navbar from '../../components/tantruonggiang/header/Navbar';

interface Props {
  title?: string;
  desc?: string;
  thumbnail?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
        <Navbar />
        <GoogleAnalytics />
        <main className="mx-auto">{children}</main>
        <MessengerButton />
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;