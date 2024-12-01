import edit from '../assets/editing.png';
import del from '../assets/delete.png';
import { useState, useContext, useEffect } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import Modal from './popUpModal';
import EditInvoiceModal from './EditInvoice';

function Tablefact() {
    const { email } = useContext(EmailContext);
    const [isHovered, setIsHovered] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    const [invoiceToEdit, setInvoiceToEdit] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [editSuccessMessage, setEditSuccessMessage] = useState('');
    const [showEditSuccess, setShowEditSuccess] = useState(false);

    useEffect(() => {
        fetch('http://localhost/login/get_invoices.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_user: email })
        })
        .then(response => response.json())
        .then(data => setInvoices(data))
        .catch(error => console.error('Error fetching invoices:', error));
    }, [email]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleDeleteClick = (id) => {
        setInvoiceToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (invoice) => {
        if (invoice.status === 'EN ATTENTE') {
            setInvoiceToEdit(invoice.id);
        } else {
            setAlertMessage('La facture est déjà traitée');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setInvoiceToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (invoiceToDelete !== null) {
            fetch('http://localhost/login/delete_invoice.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: invoiceToDelete })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setInvoices(invoices.filter(invoice => invoice.id !== invoiceToDelete));
                } else {
                    alert(data.message);
                }
                handleCloseDeleteModal();
            })
            .catch(error => console.error('Error deleting invoice:', error));
        }
    };

    const handleEditSuccess = () => {
        setEditSuccessMessage('Facture modifiée avec succès');
        setShowEditSuccess(true);
        setTimeout(() => {
            setShowEditSuccess(false);
            window.location.reload(); // Reload the page after 2 seconds
        }, 2000);
    };

    const cssdiv = {
        position: 'absolute',
        top: '15%',
        left: '15%',
        width: '80%',
        paddingBottom: '5%',
        margin: '0%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const h1css = {};

    const boxcss = {
        border: '2px solid gray',
        borderRadius: '5px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '2%',
        marginBottom: '0.5%',
        backgroundColor: '#c2c7cc',
    };

    const iconcss = {
        margin: '0%',
        padding: '0%',
        cursor: isHovered ? 'pointer' : 'default',
    };

    const attcss = {
        backgroundColor: '#D8AE27',
        color: '#FFC714',
        padding: '3px',
        borderRadius: '3px',
        display: 'flex',
        width: '100px',
        justifyContent: 'center',
    };

    const okcss = {
        backgroundColor: '#3CAF18',
        color: '#4CFF14',
        padding: '3px',
        borderRadius: '3px',
        display: 'flex',
        width: '100px',
        justifyContent: 'center',
    };

    const nocss = {
        backgroundColor: '#BA2600',
        color: '#FF3400',
        padding: '3px',
        borderRadius: '3px',
        display: 'flex',
        width: '100px',
        justifyContent: 'center',
    };

    const alertcss = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(202, 205, 200, 0.8)',
        color: 'black',
        padding: '20px',
        borderRadius: '10px',
        opacity: '1',
        transition: 'opacity 0.5s ease-in-out',
        zIndex: '1000'
    };

    const overlaycss = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: '1',
        transition: 'opacity 0.5s ease-in-out',
        zIndex: '999'
    };

    return (
        <div style={cssdiv}>
            <h1 style={h1css}>Liste des factures générées</h1>
            <hr />
            {invoices.map(invoice => (
                <div key={invoice.id} style={boxcss}>
                    <span>ID facture:<br /> <b>{invoice.id}</b></span>
                    <span>Nom du client:<br /> <b>{invoice.nomclient}</b></span>
                    <span>Date:<br /> <b>{invoice.date}</b></span>
                    <span>Montant:<br /> <b>{invoice.prixttc} DH</b></span>
                    <span>Status:<br /> <span style={invoice.status === 'PAYÉE' ? okcss : (invoice.status === 'EN ATTENTE' ? attcss : nocss)}>{invoice.status}</span></span>
                    <img src={edit} width="22px" height="22px" style={iconcss} onClick={() => handleEditClick(invoice)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <img src={del} width="22px" height="22px" style={iconcss} onClick={() => handleDeleteClick(invoice.id)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                </div>
            ))}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                message="Êtes-vous sûr de vouloir supprimer cette facture ?"
            />
            {invoiceToEdit !== null && (
                <EditInvoiceModal
                    isOpen={invoiceToEdit !== null}
                    onClose={() => setInvoiceToEdit(null)}
                    invoiceId={invoiceToEdit}
                    email={email}
                    onEditSuccess={handleEditSuccess} // Pass the edit success handler
                />
            )}
            {showAlert && (
                <>
                    <div style={overlaycss}></div>
                    <div style={alertcss}>
                        {alertMessage}
                    </div>
                </>
            )}
            {showEditSuccess && (
                <div style={alertcss}>
                    {editSuccessMessage}
                </div>
            )}
        </div>
    );
}

export default Tablefact;
