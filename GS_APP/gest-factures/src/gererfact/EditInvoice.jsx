import React, { useState, useEffect } from 'react';

function EditInvoiceModal({ isOpen, onClose, invoiceId, email, onEditSuccess }) {
    const [invoiceDetails, setInvoiceDetails] = useState({
        nomclient: '',
        date: '',
        prixht: 0,
        prixttc: 0,
        items: [],
    });

    useEffect(() => {
        if (isOpen) {
            fetch('http://localhost/login/get_invoice_details.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: invoiceId, email_user: email })
            })
            .then(response => response.json())
            .then(data => setInvoiceDetails(data))
            .catch(error => console.error('Error fetching invoice details:', error));
        }
    }, [isOpen, invoiceId, email]);

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceDetails.items];
        items[index][field] = value;

        if (field === 'prixu' || field === 'qnt') {
            const prixu = parseFloat(items[index].prixu) || 0;
            const qnt = parseInt(items[index].qnt, 10) || 0;
            items[index].prixtotal = (prixu * qnt).toFixed(2);
        }

        const prixht = items.reduce((sum, item) => sum + parseFloat(item.prixtotal), 0).toFixed(2);
        const prixttc = (prixht * 1.1).toFixed(2);

        setInvoiceDetails({ ...invoiceDetails, items, prixht, prixttc });
    };

    const handleAddRow = () => {
        const items = [...invoiceDetails.items, { produitservice: '', prixu: 0, qnt: 0, prixtotal: 0 }];
        setInvoiceDetails({ ...invoiceDetails, items });
    };

    const handleDeleteRow = (index) => {
        const items = invoiceDetails.items.filter((_, i) => i !== index);
        const prixht = items.reduce((sum, item) => sum + parseFloat(item.prixtotal), 0).toFixed(2);
        const prixttc = (prixht * 1.1).toFixed(2);
        setInvoiceDetails({ ...invoiceDetails, items, prixht, prixttc });
    };

    const handleSave = () => {
        fetch('http://localhost/login/update_invoice.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoiceDetails)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                onEditSuccess(); // Call the edit success handler
                onClose();
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error updating invoice:', error));
    };

    if (!isOpen) {
        return null;
    }

    const inputcss={
        width: '50%',
        padding: '5px 5px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        borderRadius: '4px'
    };

    const modalcss = {
        display: 'block', // Ensure modal is displayed when isOpen is true
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      };
      
    const modalcontcss = {
        backgroundColor: '#fefefe',
        margin: '15% auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
      };
      
    

    return (
        <div className="modal" style={modalcss}>
            <div className="modal-content" style={modalcontcss}>
                <h2><i>Modifier le facture</i></h2>
                <hr/>
                <label htmlFor="nomclient"><b>Nom du client:</b></label>
                <input
                    style={inputcss}
                    id="nomclient"
                    name="nomclient"
                    type="text"
                    value={invoiceDetails.nomclient}
                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, nomclient: e.target.value })}
                />
                <label htmlFor="date"><b>Date:</b></label>
                <input
                    style={inputcss}
                    id="date"
                    name="date"
                    type="date"
                    value={invoiceDetails.date}
                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
                />
                <label htmlFor="prixht"><b>Prix HT:</b></label>
                <input
                    style={inputcss}
                    id="prixht"
                    name="prixht"
                    type="text"
                    value={invoiceDetails.prixht}
                    readOnly
                />
                <label htmlFor="prixttc"><b>Prix TTC (10% de Tax) : </b></label>
                <input
                    style={inputcss}
                    id="prixttc"
                    name="prixttc"
                    type="text"
                    value={invoiceDetails.prixttc}
                    readOnly
                />
                <br/>
                <table>
                    <thead style={{ borderBottom: '1px solid #ddd', padding: '10px' ,paddingTop: '1%', height: '35px'}}>
                        <tr style={{borderRadius: '0px 5px 5px 0px'}}>
                            <th style={{paddingLeft:'10px',backgroundColor: '#007bff',borderRadius: '5px 0px 0px 5px'}}>Produit/Service</th>
                            <th style={{backgroundColor: '#007bff'}}>Prix Unitaire</th>
                            <th style={{backgroundColor: '#007bff'}}>Quantité</th>
                            <th style={{backgroundColor: '#007bff'}}>Prix Total</th>
                            <th style={{backgroundColor: '#007bff',borderRadius: '0px 5px 5px 0px'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceDetails.items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <label htmlFor={`produitservice-${index}`}></label>
                                    <input
                                        style={{...inputcss,width:'95%'}}
                                        id={`produitservice-${index}`}
                                        name={`produitservice-${index}`}
                                        type="text"
                                        value={item.produitservice}
                                        onChange={(e) => handleItemChange(index, 'produitservice', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <label htmlFor={`prixu-${index}`}></label>
                                    <input
                                        style={{...inputcss,width:'95%'}}
                                        id={`prixu-${index}`}
                                        name={`prixu-${index}`}
                                        type="number"
                                        value={item.prixu}
                                        onChange={(e) => handleItemChange(index, 'prixu', parseFloat(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <label htmlFor={`qnt-${index}`}></label>
                                    <input
                                        style={{...inputcss,width:'95%'}}
                                        id={`qnt-${index}`}
                                        name={`qnt-${index}`}
                                        type="number"
                                        value={item.qnt}
                                        onChange={(e) => handleItemChange(index, 'qnt', parseInt(e.target.value, 10))}
                                    />
                                </td>
                                <td style={{...inputcss,width:'95%'}}>{item.prixtotal}</td>
                                <td>
                                    <button type="button" className="btn btn-secondary btn" onClick={() => handleDeleteRow(index)} style={{ width:'95%', margin: '0px', padding: '5px',backgroundColor: '#9D9D9C' }}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                <hr/>
                <div style={{display: 'flex', flexDirection: 'row-reverse', padding: '20px'}}>
                    <button type="button" onClick={handleAddRow} className="btn btn-secondary btn" style={{ backgroundColor: '#007bff', margin: '4px'  }}>Ajouter un produit</button>
                    <button type="button" onClick={handleSave} className="btn btn-secondary btn" style={{ backgroundColor: '#007bff', margin: '4px'  }}>Enregistrer</button>
                    <button type="button" onClick={onClose} className="btn btn-secondary btn" style={{ backgroundColor: '#007bff', margin: '4px'  }}>Annuler</button>
                </div>
            </div>
        </div>
    );
}

export default EditInvoiceModal;




// import React, { useState, useEffect } from 'react';

// function EditInvoiceModal({ isOpen, onClose, invoiceId, email, onEditSuccess }) {
//     const [invoiceDetails, setInvoiceDetails] = useState({
//         nomclient: '',
//         date: '',
//         prixht: 0,
//         prixttc: 0,
//         items: [],
//     });
//     const [products, setProducts] = useState([]); // Define products state
//     const [selectedProduct, setSelectedProduct] = useState('');

//     useEffect(() => {
//         if (isOpen) {
//             // Fetch invoice details
//             fetch('http://localhost/login/get_invoice_details.php', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ id: invoiceId, email_user: email }),
//             })
//                 .then((response) => response.json())
//                 .then((data) => setInvoiceDetails(data))
//                 .catch((error) => console.error('Error fetching invoice details:', error));

//             // Fetch product list
//             fetch('http://localhost/login/get_products.php', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email_user: email })
//             })
//                 .then(response => response.json())
//                 .then(data => setProducts(data))
//                 .catch(error => console.error('Error fetching products:', error));
//         }
//     }, [isOpen, invoiceId, email]);
//     const data = {
//         email_user: email,
//         nomclient,
//         date,
//         prixht: items.reduce((total, item) => total + (item.prixUnitaire * item.quantite), 0).toFixed(2),
//         prixttc: items.reduce((total, item) => total + (item.prixUnitaire * item.quantite * 1.1), 0).toFixed(2),
//         items: items.map(item => ({
//           produitservice: item.produitservice,
//           prixu: item.prixUnitaire,
//           qnt: item.quantite,
//           prixtotal: item.prixTotale
//         }))
//       };


//         const calculateTotal = (newItems) => {
//             const totalHT = newItems.reduce((total, item) => total + (item.prixUnitaire * item.quantite), 0);
//             setItems(newItems.map((item) => ({ ...item, prixTotale: item.prixUnitaire * item.quantite })));
//           };
//           const handleInputChange = (event, index) => {
//             const newItems = [...items];
//             newItems[index][event.target.name] = event.target.value;
//             setItems(newItems);
//             calculateTotal(newItems);
//           };


//     // const handleItemChange = (event, index) => {
//     //     const newItems = [...invoiceDetails.items];
//     //     const selectedProductId = event.target.value;
//     //     const selectedProduct = products.find((product) => product.ID_Product === selectedProductId);

//     //     if (selectedProduct) {
//     //         newItems[index].produitservice = selectedProduct.name;
//     //         newItems[index].prixUnitaire = selectedProduct.Price;
//     //         setInvoiceDetails({ ...invoiceDetails, items: newItems });
//     //         calculateTotal(newItems);
//     //     }
//     // };
//     const handleItemChange = (event, index) => {
//         const newItems = [...invoiceDetails.items];
//         const { name, value } = event.target;
    
//         // Check if the input is for quantity or something else
//         if (name.startsWith("qnt")) {
//             // Handle quantity change
//             newItems[index].qnt = parseInt(value, 10);  // Ensure it's a number
//             setInvoiceDetails({ ...invoiceDetails, items: newItems });
//             calculateTotal(newItems);
//         } else {
//             // Handle product change if necessary
//             const selectedProductId = value;
//             const selectedProduct = products.find((product) => product.ID_Product === selectedProductId);
    
//             if (selectedProduct) {
//                 newItems[index].produitservice = selectedProduct.name;
//                 newItems[index].prixUnitaire = selectedProduct.Price;
//                 setInvoiceDetails({ ...invoiceDetails, items: newItems });
//                 calculateTotal(newItems);
//             }
//         }
//     };
    
//     const handleAddRow = () => {
//         const newItems = [...invoiceDetails.items, { produitservice: '', prixUnitaire: "", quantite: "", prixtotal: "" }];
//         setInvoiceDetails({ ...invoiceDetails, items: newItems });
//     };

//     const handleDeleteRow = (index) => {
//         const newItems = invoiceDetails.items.filter((_, i) => i !== index);
//         calculateTotal(newItems);
//     };

//     const handleSave = () => {
//         fetch('http://localhost/login/update_invoice.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(invoiceDetails),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.status === 'success') {
//                     onEditSuccess();
//                     onClose();
//                 } else {
//                     alert(data.message);
//                 }
//             })
//             .catch((error) => console.error('Error updating invoice:', error));
//     };

//     if (!isOpen) {
//         return null;
//     }

//     const inputcss = {
//         width: '50%',
//         padding: '5px 5px',
//         margin: '8px 0',
//         display: 'inline-block',
//         border: '1px solid #ccc',
//         boxSizing: 'border-box',
//         borderRadius: '4px',
//     };

//     const modalcss = {
//         display: 'block',
//         position: 'fixed',
//         zIndex: 1,
//         left: 0,
//         top: 0,
//         width: '100%',
//         height: '100%',
//         overflow: 'auto',
//         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     };

//     const modalcontcss = {
//         backgroundColor: '#fefefe',
//         margin: '15% auto',
//         padding: '20px',
//         border: '1px solid #888',
//         width: '80%',
//     };

//     return (
//         <div className="modal" style={modalcss}>
//             <div className="modal-content" style={modalcontcss}>
//                 <h2><i>Modifier le facture</i></h2>
//                 <hr />
//                 <label htmlFor="nomclient"><b>Nom du client:</b></label>
//                 <input
//                     style={inputcss}
//                     id="nomclient"
//                     name="nomclient"
//                     type="text"
//                     value={invoiceDetails.nomclient}
//                     onChange={(e) => setInvoiceDetails({ ...invoiceDetails, nomclient: e.target.value })}
//                 />
//                 <label htmlFor="date"><b>Date:</b></label>
//                 <input
//                     style={inputcss}
//                     id="date"
//                     name="date"
//                     type="date"
//                     value={invoiceDetails.date}
//                     onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
//                 />
//                 <label htmlFor="prixht"><b>Prix HT:</b></label>
//                 <input
//                     style={inputcss}
//                     id="prixht"
//                     name="prixht"
//                     type="text"
//                     value={invoiceDetails.prixht}
//                     readOnly
//                 />
//                 <label htmlFor="prixttc"><b>Prix TTC (10% de Tax) : </b></label>
//                 <input
//                     style={inputcss}
//                     id="prixttc"
//                     name="prixttc"
//                     type="text"
//                     value={invoiceDetails.prixttc}
//                     readOnly
//                 />
//                 <br />
//                 <table>
//                     <thead style={{ borderBottom: '1px solid #ddd', padding: '10px', paddingTop: '1%', height: '35px' }}>
//                         <tr style={{ borderRadius: '0px 5px 5px 0px' }}>
//                             <th style={{ paddingLeft: '10px', backgroundColor: '#0000FF', borderRadius: '5px 0px 0px 5px' }}>Produit/Service</th>
//                             <th style={{ backgroundColor: '#0000FF' }}>Prix Unitaire</th>
//                             <th style={{ backgroundColor: '#0000FF' }}>Quantité</th>
//                             <th style={{ backgroundColor: '#0000FF' }}>Prix Total</th>
//                             <th style={{ backgroundColor: '#0000FF', borderRadius: '0px 5px 5px 0px' }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {invoiceDetails.items.map((item, index) => (
//                             <tr key={index}>
//                                 <td>
//                                     <select
//                                         style={{ ...inputcss, width: '95%' }}
//                                         value={products.find(product => product.name === item.produitservice)?.ID_Product || ''}
//                                         onChange={(event) => handleItemChange(event, index)}
//                                         required
//                                     >
//                                         {/* Display the selected product with its quantity */}
//                                         <option value="">
//                                             {item.produitservice || "select aproduct"}
//                                             {products.find(product => product.name === item.produitservice) ?
//                                                 ` - ${products.find(product => product.name === item.produitservice).Quantity} available` : ''}
//                                         </option>

//                                         {products.length > 0 ? (
//                                             products
//                                                 .filter(product => product.name !== item.produitservice) // Exclude the currently selected product
//                                                 .map((product) => (
//                                                     <option key={product.ID_Product} value={product.ID_Product}>
//                                                         {product.name} - {product.Quantity} available
//                                                     </option>
//                                                 ))
//                                         ) : (
//                                             <option disabled>No products available</option> // Fallback if products is empty
//                                         )}
//                                     </select>



//                                 </td>
//                                 <td>
//                                     <input
//                                         style={{ ...inputcss, width: '95%' }}
//                                         id={`prixu-${index}`}
//                                         name={`prixu-${index}`}
//                                         type="number"
//                                         value={item.prixu || item.prixUnitaire}
//                                         onChange={(event) => handleInputChange(event, index)}
//                                         readOnly
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         style={{ ...inputcss, width: '95%' }}
//                                         id={`qnt-${index}`}
//                                         name={`qnt-${index}`}
//                                         type="number"
//                                         value={item.qnt }
//                                         onChange={(event) => handleInputChange(event, index)}


//                                     />
//                                 </td>
//                                 <td >
//                                     <input 
//                                 style={{ ...inputcss, width: '95%' }}
//                                 value={item.prixtotal || item.prixTotale}
//                                 id={`prixtotal-${index}`}
//                                 name={`prixtotal-${index}`}
//                                 type='number'
//                                 onChange={(event)=>handleInputChange(event,index)}
//                                 readOnly

//                                 />
//                                     </td>
//                                 <td>
//                                     <button
//                                         type="button"
//                                         className="btn btn-secondary btn"
//                                         onClick={() => handleDeleteRow(index)}
//                                         style={{ width: '95%', margin: '0px', padding: '5px', backgroundColor: '#9D9D9C' }}
//                                     >
//                                         Supprimer
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <br />
//                 <hr />
//                 <div style={{ display: 'flex', flexDirection: 'row-reverse', padding: '20px' }}>
//                     <button type="button" onClick={handleAddRow} className="btn btn-secondary btn" style={{ backgroundColor: '#0000FF', margin: '4px' }}>Ajouter un produit</button>
//                     <button type="button" onClick={handleSave} className="btn btn-secondary btn" style={{ backgroundColor: '#0000FF', margin: '4px' }}>Enregistrer</button>
//                     <button type="button" onClick={onClose} className="btn btn-secondary btn" style={{ backgroundColor: '#0000FF', margin: '4px' }}>Annuler</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditInvoiceModal;
