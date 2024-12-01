import { useState, useContext } from 'react';
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import Footer from '../footer/footer.jsx';
import InvoiceTable from '../test.jsx';
import favicon from '../assets/Debuggers1-.png';
import { Helmet } from 'react-helmet';
import { EmailContext } from '../contexts/EmailContext';


function Createfact() {
  const { email } = useContext(EmailContext);
  return (
    <>
      <Helmet>
        <title>Création de facture</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div id="header">
        <Header />
      </div>
      <div id="sidebar">
        <Sidebar />
      </div>
      <InvoiceTable />
      <Footer />
    </>
  );
}

export default Createfact;
