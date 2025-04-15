import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div className="modal-content" style={{ background: 'white', color: '#333', padding: '30px 16px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#333', fontSize: '24px', cursor: 'pointer' }}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;