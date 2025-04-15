import React from 'react';

const Input = ({ label = '', placeholder = '', value, onChange, errorMessage = '', name = '', onFocus = () => {} }) => {
    return (
        <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                onFocus={onFocus}
            />
            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px', minHeight: '14px' }}>
                { errorMessage }
            </p>
        </div>
    );
};

export default Input;