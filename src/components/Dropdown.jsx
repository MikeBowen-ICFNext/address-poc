import React from 'react';

const Dropdown = ({ isOpen, records, onClick }) => {
    if (!isOpen || records?.length < 1) return null;

    return (
        <div className="dropdown" style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', zIndex: 1000, width: '650px', maxHeight: '200px', overflowY: 'auto', marginTop: '-30px' }}>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {records.map((record, index) => (
                    <li key={index} onClick={() => onClick(record)} style={{ cursor: 'pointer', padding: '5px 10px', borderBottom: '1px solid #ccc', color: '#333' }}>
                        <div className="dropdown-item" style={{ padding: '6px', cursor: 'pointer' }}>
                            <p><strong>{record.addressLine1}</strong> {record.addressLine2 && record.addressLine2}</p>
                            <p>{record.city}, {record.state} {record.zipCode}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;