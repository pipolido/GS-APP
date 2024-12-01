import React, { useState, useEffect } from 'react';

function EditClientModal({ isOpen, onClose, onSave, product }) {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.Price : '');
    const [quantity, setQuantity] = useState(product ? product.Quantity : '');
    const [fournisseur, setFournisseur] = useState(product ? product.Fournisseur : '');
    const [isVisible, setIsVisible] = useState(false);

    // Hover state for buttons
    const [isHoveredCancel, setIsHoveredCancel] = useState(false);
    const [isHoveredConfirm, setIsHoveredConfirm] = useState(false);

    const handleMouseEnterCancel = () => setIsHoveredCancel(true);
    const handleMouseLeaveCancel = () => setIsHoveredCancel(false);
    const handleMouseEnterConfirm = () => setIsHoveredConfirm(true);
    const handleMouseLeaveConfirm = () => setIsHoveredConfirm(false);

    // Populate fields when the modal opens with the selected product
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.Price);
            setQuantity(product.Quantity);
            setFournisseur(product.Fournisseur);
        }
    }, [product]);

    // Show modal transition
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Match the transition duration
        }
    }, [isOpen]);

    const handleSave = () => {
        // Create the updated product object
        const updatedProduct = {
            name,
            Price: price,
            Quantity: quantity,
            Fournisseur: fournisseur
        };
        onSave(updatedProduct); // Save changes
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
        marginBottom: '10px',
        width: '100%',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: isHoveredCancel ? '#89CFF0' : '#0000FF'
    };

    const confirmButtonStyle = {
        ...buttonStyle,
        backgroundColor: isHoveredConfirm ? '#89CFF0' : '#0000FF'
    };

    return (
        <>
            <div style={overlayStyle}></div>
            <div style={modalStyle}>
                <p><b>Modifier le produit</b></p>
                <input
                    style={inputcss}
                    type="text"
                    placeholder="Nom du produit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    style={inputcss}
                    type="number"
                    placeholder="Prix"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    style={inputcss}
                    type="number"
                    placeholder="Quantité"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    style={inputcss}
                    type="text"
                    placeholder="Fournisseur"
                    value={fournisseur}
                    onChange={(e) => setFournisseur(e.target.value)}
                />
                <div>
                    <button style={cancelButtonStyle} onClick={onClose} onMouseEnter={handleMouseEnterCancel} onMouseLeave={handleMouseLeaveCancel}>Annuler</button>
                    <button style={confirmButtonStyle} onClick={handleSave} onMouseEnter={handleMouseEnterConfirm} onMouseLeave={handleMouseLeaveConfirm}>Sauvegarder</button>
                </div>
            </div>
        </>
    );
}

export default EditClientModal;
