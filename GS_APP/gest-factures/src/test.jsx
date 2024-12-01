import React, { useState, useEffect, useContext } from 'react';
import logofact from './assets/Debuggers1-.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmailContext } from './contexts/EmailContext';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader for loading animation
import InvoicePreviewModal from './InvoicePreviewModal'; // Import the InvoicePreviewModal

function InvoiceTable() {
  const { email } = useContext(EmailContext);
  const [saving, setSaving] = useState(false); // Add state for saving loading
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [invoiceData, setInvoiceData] = useState(null); // State to store invoice data
  const [items, setItems] = useState([]);
  const [nomclient, setNomClient] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]); // State for products
  const [selectedProduct, setSelectedProduct] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the custom popup


  

  useEffect(() => {
    fetch('http://localhost/login/get_products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email })
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [email]);

  const addItem = (event) => {
    event.preventDefault();
    setItems([...items, { produitservice: '', prixUnitaire: '', quantite: '', prixTotale: '0' }]);
  };

  const handleInputChange = (event, index) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
    calculateTotal(newItems);
  };
  
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (newItems) => {
    const totalHT = newItems.reduce((total, item) => total + (item.prixUnitaire * item.quantite), 0);
    setItems(newItems.map((item) => ({ ...item, prixTotale: item.prixUnitaire * item.quantite })));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true); // Show loading animation

    const data = {
      email_user: email,
      nomclient,
      date,
      prixht: items.reduce((total, item) => total + (item.prixUnitaire * item.quantite), 0).toFixed(2),
      prixttc: items.reduce((total, item) => total + (item.prixUnitaire * item.quantite * 1.1), 0).toFixed(2),
      items: items.map(item => ({
        produitservice: item.produitservice,
        prixu: item.prixUnitaire,
        qnt: item.quantite,
        prixtotal: item.prixTotale
      }))
    };

  //   try {
  //     const response = await fetch('http://localhost/login/save_invoice.php', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     });

  //     const result = await response.json();
  //     if (result.status === 'success') {
  //       setInvoiceData(data); // Store the invoice data
  //       setShowModal(true); // Show the modal
  //     } else {
  //       alert('Error saving invoice: ' + result.message);
  //     }
  //   } catch (error) {
  //     console.error('Error saving invoice:', error);
  //     alert('Error saving invoice');
  //   } finally {
  //     setSaving(false); // Hide loading animation
  //   }
  // };
  try {
    const response = await fetch('http://localhost/login/save_invoice.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.status === 'success') {
      setInvoiceData(data); // Store the invoice data
      setShowModal(true); // Show the modal
    } else {
      setErrorMessage( result.message);
      triggerPopup();
    }
  } catch (error) {
    console.error('Error saving invoice:', error);
    setErrorMessage('Error saving invoice');
    triggerPopup();
  } finally {
    setSaving(false); // Hide loading animation
  }
};
  const triggerPopup = () => {
    setShowPopup(true); // Show the popup
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  const handleProductChange = (event, index) => {
    
    const newItems = [...items];
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(product => product.ID_Product === selectedProductId);
    setSelectedProduct(event.target.value);
    if (selectedProduct) {
      newItems[index].produitservice = selectedProduct.name;
      newItems[index].prixUnitaire = selectedProduct.Price;
      setItems(newItems); 
      calculateTotal(newItems);
    }
  };
 
  const cssPopup = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(202, 205, 200, 0.8)',
    color: 'black',
    padding: '20px',
    borderRadius: '8px',
    zIndex: 1001,
    textAlign: 'center',
  };

  const cssPopupOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };
  
  const cssdiv = {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '80%',
    paddingBottom: '5%',
    margin: '0%',
  };

  const cssinput = {
    maxWidth: '50%',
  };

  const csslabel = {
    width: '15%',
    backgroundColor: '#ccc9c9',
  };

  const tableTitlesStyle = {
    display: 'block',
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '2%',
    paddingRight: '2%',
    backgroundImage: 'linear-gradient(190deg, #5f5e26, blue)',
    borderRadius: '5px',
    width: '100%',
    border: 'none',
  };

  const namepStyle = {
    display: 'inline-block',
    width: '45%',
  };

  const prixuStyle = {
    display: 'inline-block',
    width: '15%',
  };

  const prixtStyle = {
    display: 'inline-block',
    width: '15%',
  };

  const qntStyle = {
    display: 'inline-block',
    width: '15%',
  };

  const spancss = {
    width: '15%',
  };

  const dropdown = {
    position :'relative',
    width: '100%',
    height: '45px',
    borderRadius: '4px',
    border: '1px solid #c7c3c3',
    paddingLeft: '10px',
  };
  return (
    <div>
      {saving && ( // for the loading animation when clicking on 'enregistrer'
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <ClipLoader color={"#0c48b5"} loading={saving} size={150} />
        </div>
      )}
      <style media="print">
        {`
          @media print {
            #invoice {
              width: 100%;
              margin: 0;
              padding: 0;
            }
            #btn1, #sidebar, #header {
              display: none;
            }
            #delbtn {
              display: none;
            }
            #addbtn {
              display: none;
            }
            #namep, #prixu, #qnt, #prixt {
              font-size: 10px;
            }
            #qnt, #prixt {
              position: relative;
              left: 2%;
            }
            .input-group.flex-nowrap {
              width: 100%;
            }
            #addon-wrapping {
              font-size: 10px;
              font-weight: bold;
            }
          }
        `}
      </style>
      {showPopup && ( // Custom pop-up for error messages
        <>
          <div style={cssPopupOverlay}></div>
          <div style={cssPopup}>
            {errorMessage}
          </div>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className="invoice-table" style={cssdiv} id="invoice">
          <img src={logofact} alt="Logo" width="8%" height="8%" />
          <hr />
          <div className="invoice-info" style={{ justifyContent: 'space-around' }}>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" style={csslabel} id="addon-wrapping">
                Nom du Client :
              </span>
              <input
                type="text"
                style={cssinput}
                id="inpuut"
                className="form-control"
                placeholder="physique ou morale"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={nomclient}
                onChange={(e) => setNomClient(e.target.value)}
                required
              />
            </div>

            <div className="input-group flex-nowrap" style={{ marginTop: '1%' }}>
              <span className="input-group-text" style={csslabel} id="addon-wrapping">
                Date :
              </span>
              <input
                type="date"
                style={cssinput}
                id="inpuut"
                className="form-control"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <hr />
          <div id="tabletitles" style={tableTitlesStyle}>
            <span id="namep" style={namepStyle}><b>Produit/Service : </b></span>
            <span id="prixu" style={prixuStyle}><b>Prix Unitaire(DH):</b></span>
            <span id="qnt" style={qntStyle}><b>Quantité :</b></span>
            <span id="prixt" style={prixtStyle}><b>Prix Totale(DH):</b></span>
          </div>
          <table border="1" style={{ border: 'none', width: '100%' }}>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} style={{ display: 'flex' }}>
                  <td style={{ width: '45%', margin: '0px', padding: '4px' }}>
                    <select
                      name="products"
                      value={item.ID_Product} 
                      onChange={(event) => handleProductChange(event, index)}
                      className='dropdown'
                      style={dropdown}
                      key={index} 
                      required
                    >
                      {<option>Select Product</option>}
                      {products && products.length > 0 ? (
                        products.map((product) => (
                          <option
                            key={product.ID_Product}
                            data-price={product.Price}
                            value={product.ID_Product}
                          >
                            {product.name} - {product.Quantity} available
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading products...</option> 
                      )}
                    </select>
                   


                  </td>
                  <td style={{ width: '15%', margin: '0px', padding: '4px' }}>
                    <input
                      type="number"
                      name="prixUnitaire"
                      value={item.prixUnitaire}
                      onChange={(event) => handleInputChange(event, index)}
                      style={{ width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #c7c3c3', paddingLeft: '10px' }}
                      required disabled
                    />
                  </td>
                  <td style={{ width: '15%', margin: '0px', padding: '4px' }}>
                    <input
                      type="number"
                      name="quantite"
                      value={item.quantite}
                      onChange={(event) => handleInputChange(event, index)}
                      style={{ width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #c7c3c3', paddingLeft: '10px' }}
                      required
                    />
                  </td>
                  <td style={{ width: '15%', margin: '0px', padding: '4px' }}>
                    <input
                      type="number"
                      name="prixTotale"
                      value={item.prixTotale}
                      readOnly
                      style={{ width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #c7c3c3', paddingLeft: '10px' }}
                    />
                  </td>
                  <td style={{ width: '10%', margin: '0px', padding: '4px' }}>
                    <button type="button" id='delbtn' onClick={() => removeItem(index)} style={{ width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #c7c3c3', backgroundColor: '#ccc9c9' }}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addItem}
            id='addbtn'
            style={{ margin: '2px', borderRadius: '4px', border: '1px solid #c7c3c3', marginTop: '5px', padding: '8px', backgroundColor: '#ccc9c9' }}
          >
            Ajouter un produit
          </button>
          <hr />

          <div id="total">
            <div className="input-group flex-nowrap" id="totdiv" style={{ margin: '5px' }}>
              <span className="input-group-text" id="addon-wrapping" style={{ width: '15%', backgroundColor: '#ccc9c9' }}>Totale HT (DH) :</span>
              <span className="input-group-text" style={spancss}>{items.reduce((total, item) => total + (item.prixUnitaire * item.quantite), 0).toFixed(2)}</span>
            </div>

            <div className="input-group flex-nowrap" id="totdiv" style={{ margin: '5px' }}>
              <span className="input-group-text" id="addon-wrapping" style={{ width: '15%', backgroundColor: '#ccc9c9' }}>Tax (%) :</span>
              <span className="input-group-text" id="addon-wrapping" style={spancss}>10%</span>
            </div>

            <div className="input-group flex-nowrap" id="totdiv" style={{ margin: '5px' }}>
              <span className="input-group-text" id="addon-wrapping" style={{ width: '15%', backgroundColor: '#ccc9c9' }}>Totale TTC (DH) :</span>
              <span className="input-group-text" id="prixttc" style={spancss}>{items.reduce((total, item) => total + (item.prixUnitaire * item.quantite * 1.1), 0).toFixed(2)}</span>
            </div>
          </div>

          <div id="btndiv" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <input
              type="submit"
              value="Enregistrer"
              className="btn btn-secondary btn"
              id="btn1"
              style={{ backgroundColor: '#0000FF', margin: '4px' }}
            />
            <input
              type="button"
              value="Imprimer"
              className="btn btn-secondary btn"
              id="btn1"
              style={{ backgroundColor: '#0000FF', margin: '4px' }}
              onClick={handlePrint}
            />
          </div>
        </div>
      </form>

      {/* Add the modal component and pass the required props */}
      <InvoicePreviewModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        invoiceData={invoiceData}
      />
    </div>
  );
}

export default InvoiceTable;

