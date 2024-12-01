import { useState, useEffect, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import edit from '../assets/editing.png';
import del from '../assets/delete.png';
import Modal from '../gererfact/popUpModal';
import EditProductModal from './popupedit'; 
import AddProductModal from './addprodmodal';

function Tablestck() {
  const { email } = useContext(EmailContext);
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for Add Product Modal

  // Fetch products from the database
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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch('http://localhost/login/delete_product.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email, productId: productToDelete.ID_Product })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts(products.filter(p => p.ID_Product !== productToDelete.ID_Product));
        }
      })
      .catch(error => console.error('Error deleting product:', error));

    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleSaveEdit = (updatedProduct) => {
    fetch('http://localhost/login/update_product.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email, productId: productToEdit.ID_Product, ...updatedProduct })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts(products.map(product =>
            product.ID_Product === productToEdit.ID_Product ? { ...product, ...updatedProduct } : product
          ));
        }
      })
      .catch(error => console.error('Error updating product:', error));

    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  const handleAddProductClick = () => {
    setIsAddModalOpen(true); // Open the Add Product Modal
  };

  const handleSaveAdd = (newProduct) => {
    fetch('http://localhost/login/add_product.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_user: email, ...newProduct })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts([...products, data.newProduct]); // Add the new product to the list
        }
      })
      .catch(error => console.error('Error adding product:', error));

    setIsAddModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
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
  const buttonStyle = {
    backgroundColor: '#007bff', /* Blue background color */
    color: 'white', /* White text color */
    border: 'none', /* No border */
    padding: '10px 20px', /* Padding for button */
    fontSize: '16px', /* Font size */
    cursor: 'pointer', /* Pointer cursor on hover */
    borderRadius: '4px', /* Rounded corners */
    position: 'absolute', /* Positioning */
    top: '10px', /* Distance from top */
    left: '10px', /* Distance from left */
    zIndex: '1', /* Make sure it's on top of other elements */
};

  return (
    <div style={cssdiv}>
      <h1>Liste des produits</h1>
      <button onClick={handleAddProductClick} style={buttonStyle}>Ajouter un produit</button> {/* Add this button */}
      <hr />
      {products.map(product => (
        <div key={product.ID_Product} style={boxcss}>
          <span>Nom du produit:<br /><span><b>{product.name}</b></span></span>
          <span>Prix:<br /><span><b>{product.Price}</b></span></span>
          <span>Quantité:<br /><span><b>{product.Quantity}</b></span></span>
          <span>Fournisseur:<br /><span><b>{product.Fournisseur}</b></span></span>
          <img src={edit} width="22px" height="22px" style={iconcss} onClick={() => handleEditClick(product)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <img src={del} width="22px" height="22px" style={iconcss} onClick={() => handleDeleteClick(product)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
      ))}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        onSave={handleSaveEdit}
        product={productToEdit}
      />
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCancelAdd}
        onSave={handleSaveAdd}
      />
    </div>
  );
}

export default Tablestck;
