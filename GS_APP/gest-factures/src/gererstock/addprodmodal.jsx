import React, { useState, useEffect } from 'react';

function AddProductModal({ isOpen, onClose, onSave }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [fournisseur, setFournisseur] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Match the transition duration
        }
    }, [isOpen]);

    const handleSave = async () => {
        const newProduct = {
            name,
            Price: price,
            Quantity: quantity,
            Fournisseur: fournisseur
        };
    
        try {
            const response = await fetch('http://localhost/login/add_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
    
            const result = await response.json();
    
            if (result.status === 'success') {
                // Optionally trigger any additional actions or update states
                onSave(); // Trigger the refresh in the parent component
                onClose(); // Close the modal
                window.location.reload(); // Refresh the page
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    
        // Clear input fields after the operation
        setName('');
        setPrice('');
        setQuantity('');
        setFournisseur('');
    };
    

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
        opacity: isOpen ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        zIndex: '1000',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        width: '400px',
        textAlign: 'center',
        visibility: isVisible ? 'visible' : 'hidden'
    };

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '999',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
        visibility: isVisible ? 'visible' : 'hidden'
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#0000FF',
        
    };

    const inputcss = {
        borderRadius: '5px',
        padding: '5px 10px',
        border: '1px solid #ccc',
    };

    return (
        <>
            <div style={overlayStyle}></div>
            <div style={modalStyle}>
                <p><b>Ajouter un produit</b></p>
                <input
                    style={inputcss}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom du produit"
                />
                <input
                    style={inputcss}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Prix"
                />
                <input
                    style={inputcss}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantité"
                />
                <input
                    style={inputcss}
                    type="text"
                    value={fournisseur}
                    onChange={(e) => setFournisseur(e.target.value)}
                    placeholder="Fournisseur"
                />
                <br />
                <button style={buttonStyle} onClick={onClose}>Annuler</button>
                <button style={buttonStyle} onClick={handleSave}>Sauvegarder</button>
            </div>
        </>
    );
}

export default AddProductModal;
