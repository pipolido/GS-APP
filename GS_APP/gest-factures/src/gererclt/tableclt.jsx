import { useState, useEffect, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import edit from '../assets/editing.png';
import del from '../assets/delete.png';
import Modal from '../gererfact/popUpModal';
import EditClientModal from './popupedit';

function Tableclt() {
  const { email } = useContext(EmailContext);
  const [clients, setClients] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);

  useEffect(() => {
    fetch('http://localhost/login/get_clients.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email })
    })
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, [email]);

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (client) => {
    setClientToEdit(client);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch('http://localhost/login/delete_client.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email, nomclient: clientToDelete.nomclient })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setClients(clients.filter(c => c.nomclient !== clientToDelete.nomclient));
        }
      })
      .catch(error => console.error('Error deleting client:', error));

    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const handleSaveEdit = (newName) => {
    fetch('http://localhost/login/update_client.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email, oldName: clientToEdit.nomclient, newName })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setClients(clients.map(client =>
            client.nomclient === clientToEdit.nomclient ? { ...client, nomclient: newName } : client
          ));
        }
      })
      .catch(error => console.error('Error updating client:', error));

    setIsEditModalOpen(false);
    setClientToEdit(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setClientToEdit(null);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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

  return (
    <div style={cssdiv}>
      <h1>Liste des clients</h1>
      <hr />
      {clients.map(client => (
        <div key={client.nomclient} style={boxcss}>
          <span>Nom du client:<br /><span><b>{client.nomclient}</b></span></span>
          <span>Date de première facture:<br /><span><b>{client.datePremiereFacture}</b></span></span>
          <span>Nombre de factures:<br /><span><b>{client.nombreFactures}</b></span></span>
          <img src={edit} width="22px" height="22px" style={iconcss} onClick={() => handleEditClick(client)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <img src={del} width="22px" height="22px" style={iconcss} onClick={() => handleDeleteClick(client)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
      ))}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Êtes-vous sûr de vouloir supprimer ce client et toutes les factures associées ?"
      />
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        onSave={handleSaveEdit}
        client={clientToEdit}
      />
    </div>
  );
}

export default Tableclt;
