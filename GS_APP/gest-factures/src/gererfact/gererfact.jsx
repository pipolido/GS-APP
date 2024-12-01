import { useState, useContext } from 'react'
import Header from '../header/header.jsx'
import Sidebar from '../sidebar/sidebar.jsx';
import Footer from '../footer/footer.jsx';
import Tablefact from './tablefact.jsx';
import { Helmet } from 'react-helmet';
import favicon from '../assets/Debuggers.png'
import { EmailContext } from '../contexts/EmailContext';



function Gererfact(){
  const { email } = useContext(EmailContext);
    return(
        <>
        <Helmet>
        <title>Acceuil</title>
        <link rel="icon" href={favicon} />
        </Helmet>
        <Header/>
        <Sidebar/>
        <Tablefact/>
        <Footer/>
        
        
      </>
    );
}

export default Gererfact;