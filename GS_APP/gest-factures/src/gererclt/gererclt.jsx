import { useContext } from 'react';
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import Footer from '../footer/footer.jsx';
import Tableclt from './tableclt.jsx';
import { Helmet } from 'react-helmet';
import favicon from '../assets/Debuggers.png';
import { EmailContext } from '../contexts/EmailContext';

function Gererclt() {
  const { email } = useContext(EmailContext);
  return (
    <>
      <Helmet>
        <title>Clients</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <Header />
      <Sidebar />
      <Tableclt email={email} />
      <Footer />
    </>
  );
}

export default Gererclt;
