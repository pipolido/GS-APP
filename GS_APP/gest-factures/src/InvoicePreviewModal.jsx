// InvoicePreviewModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import logofact from './assets/Debuggers1-.png';


const InvoicePreviewModal = ({ show, handleClose, invoiceData }) => {
  if (!invoiceData) return null;
    
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title><i>Résumé de facture:</i></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      

        <h5>Client: {invoiceData.nomclient}</h5>
        <p>Date: {invoiceData.date}</p>
        <hr/>
        <table className="table">
          <thead >
            <tr>
              <th style={{ backgroundColor: 'blue', borderRadius: '5px 0px 0px 5px' }}>Produit/Service</th>
              <th style={{ backgroundColor: 'blue' }}>Prix Unitaire (DH)</th>
              <th style={{ backgroundColor: 'blue' }}>Quantité</th>
              <th style={{ backgroundColor: 'blue', borderRadius: '0px 5px 5px 0px' }}>Prix Totale (DH)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.produitservice}</td>
                <td>{item.prixu}</td>
                <td>{item.qnt}</td>
                <td>{item.prixtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Totale HT (DH):&nbsp;&nbsp;&nbsp; <b>{invoiceData.prixht}</b></p>
        <p>Tax (%):&nbsp;&nbsp;&nbsp; <b>10%</b></p>
        <p>Totale TTC (DH):&nbsp;&nbsp;&nbsp; <b>{invoiceData.prixttc}</b></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'blue'}}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoicePreviewModal;
