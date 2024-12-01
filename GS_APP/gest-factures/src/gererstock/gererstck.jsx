import { useContext } from 'react';
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import Footer from '../footer/footer.jsx';
import Tablestck from './tablestck.jsx';
import { Helmet } from 'react-helmet';
import favicon from '../assets/Debuggers.png';
import { EmailContext } from '../contexts/EmailContext';

function Gererstck() {
  const { email } = useContext(EmailContext);
  return (
    <>
      <Helmet>
        <title>Stock</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <Header />
      <Sidebar />
      <Tablestck email={email} />
      <Footer />
    </>
  );
}

export default Gererstck;
