import './App.css';
import Dropdown from './components/Dropdown';
import Input from './components/Input';
import Modal from './components/Modal';
import React, { useState } from 'react';

function App() {
  const [records] = useState([
    {
      id: 1,
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4A',
      city: 'Sacramento',
      state: 'CA',
      zipCode: '95814'
    },
    {
      id: 2,
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'Sacramento',
      state: 'CA',
      zipCode: '95814'
    },
    {
      id: 3,
      addressLine1: '123 Main St',
      addressLine2: 'Apt 5',
      city: 'Sacramento',
      state: 'CA',
      zipCode: '95814'
    },
    {
      id: 4,
      addressLine1: '123 Elm St',
      addressLine2: '',
      city: 'Anza',
      state: 'CA',
      zipCode: '92539'
    },
    {
      id: 5,
      addressLine1: '456 Elm St',
      addressLine2: '',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001'
    }
  ]);

  const [dropdown, setDropdown] = useState({
    isOpen: false,
    filteredRecords: []
  });

  const [beResponse, setBeResponse] = useState({
    isSubmitted: false,
    verifiedAddress: false,
    isUserVerified: false
  });

  const [formData, setFormData] = useState({
    name: {
      value: '',
      errorMessage: ''
    },
    addressLine1: {
      value: '',
      errorMessage: ''
    },
    addressLine2: {
      value: '',
      errorMessage: ''
    },
    city: {
      value: '',
      errorMessage: ''
    },
    state: {
      value: '',
      errorMessage: ''
    },
    zipCode: {
      value: '',
      errorMessage: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDropdown({ ...dropdown, isOpen: false });
    let hasError = false;
    
    Object.keys(formData).forEach((field) => {
      // Set error message if the field is empty
      if (!formData[field].value && field !== 'addressLine2') {
        hasError = true;

        setFormData((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            errorMessage: 'This field is required'
          }
        }));

      // Clear error message if the field is valid
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            errorMessage: ''
          }
        }));
      }
    });
    
    if (hasError) {
      console.log('Form failed FE validation, not submitted');
    } else {
      // If the formData does not match a record, set beResponse
      const isVerified = records.some((record) => {
        return (
          record.addressLine1 === formData.addressLine1.value &&
          record.addressLine2 === formData.addressLine2.value &&
          record.city === formData.city.value &&
          record.state === formData.state.value &&
          record.zipCode === formData.zipCode.value
        );
      });

      if (isVerified || beResponse.isUserVerified) {
        setBeResponse({
          isSubmitted: true,
          verifiedAddress: true
        });

        console.log('Form submitted, BE verified the address', formData);
      } else {
        setBeResponse({
          isSubmitted: true,
          verifiedAddress: false
        });

        console.log('Frontend checked if the address is in our recrods. It was not and the user must confirm or change the address.')
      }
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form data state with the new value
    setFormData((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
        errorMessage: ''
      }
    }));
  }

  const handleAutoComplete = (e) => {
    handleChange(e);

    const { name, value } = e.target;

    if (value.length >= 3) {
      // If value is included in records, show dropdown
      const filteredRecords = records.filter((record) =>
        record.addressLine1.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredRecords.length > 0) {
        setDropdown({
          isOpen: true,
          filteredRecords: filteredRecords
        });
      }
    } else {
      // If value is less than 3 characters, close dropdown
      setDropdown({
        isOpen: false,
        filteredRecords: []
      });
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.isOpen && !event.target.closest('.dropdown')) {
        setDropdown({ ...dropdown, isOpen: false });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdown]);

  return (
    <div className="App">
      {beResponse.isSubmitted && !beResponse.verifiedAddress && (
        <p style={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bold', color: 'red' }}>Address could not be verified. Please confirm the address.</p>
      )}
      {beResponse.isSubmitted && (beResponse.verifiedAddress || beResponse.isUserVerified) && (
        <p style={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bold', color: 'green' }}>Address verified successfully!</p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Address Form</h2>
        <p style={{ textAlign: 'left', marginBottom: '20px' }}><em>Type "123" or "456" to see a dropdown</em></p>
        <Input
          label="Name"
          placeholder="John doe"
          value={formData.name.value}
          errorMessage={formData.name.errorMessage}
          name="name"
          onChange={handleChange}
          onFocus={() => setDropdown({ ...dropdown, isOpen: false })}
        />
        <Input
          label="Address Line 1"
          placeholder="Address Line 1"
          value={formData.addressLine1.value}
          errorMessage={formData.addressLine1.errorMessage}
          name="addressLine1"
          onChange={handleAutoComplete}
        />
        <Dropdown
          isOpen={dropdown.isOpen}
          records={dropdown.filteredRecords}
          onClick={(record) => {
            setFormData((prevState) => ({
              ...prevState,
              addressLine1: {
                ...prevState.addressLine1,
                value: record.addressLine1,
                errorMessage: ''
              },
              addressLine2: {
                ...prevState.addressLine2,
                value: record.addressLine2 || '',
                errorMessage: ''
              },
              city: {
                ...prevState.city,
                value: record.city,
                errorMessage: ''
              },
              state: {
                ...prevState.state,
                value: record.state,
                errorMessage: ''
              },
              zipCode: {
                ...prevState.zipCode,
                value: record.zipCode,
                errorMessage: ''
              }
            }));

            setTimeout(() => {
              setDropdown({ ...dropdown, isOpen: false });
            }, 200);
          }}
        />
        <Input
          label="Address Line 2"
          placeholder="Address Line 2"
          value={formData.addressLine2.value}
          errorMessage={formData.addressLine2.errorMessage}
          name="addressLine2"
          onChange={handleChange}
          onFocus={() => setDropdown({ ...dropdown, isOpen: false })}
        />
        <Input
          label="City"
          placeholder="City"
          value={formData.city.value}
          errorMessage={formData.city.errorMessage}
          name="city"
          onChange={handleChange}
          onFocus={() => setDropdown({ ...dropdown, isOpen: false })}
        />
        <Input
          label="State"
          placeholder="State"
          value={formData.state.value}
          errorMessage={formData.state.errorMessage}
          name="state"
          onChange={handleChange}
          onFocus={() => setDropdown({ ...dropdown, isOpen: false })}
        />
        <Input
          label="Zip Code"
          placeholder="Zip Code"
          value={formData.zipCode.value}
          errorMessage={formData.zipCode.errorMessage}
          name="zipCode"
          onChange={handleChange}
          onFocus
        />

        {beResponse.isSubmitted && !beResponse.verifiedAddress && (
          <Modal
            isOpen={beResponse.isSubmitted && !beResponse.verifiedAddress}
            onClose={() => setBeResponse({ ...beResponse, isSubmitted: false })}
          >
            <h2>Address Was Not Recognized</h2>
            <p style={{ paddingBottom: '18px' }}>Please confirm the following address.</p>
            <p>{formData.addressLine1.value}{formData.addressLine2.value ? `, ${formData.addressLine2.value}` : ''}</p>
            <p style={{ paddingBottom: '24px' }}>{formData.city.value}, {formData.state.value} {formData.zipCode.value}</p>
            <button
              onClick={() => setBeResponse({ ...beResponse, isSubmitted: false })}
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', border: '1px solid #333', backgroundColor: 'transparent', color: '#333', cursor: 'pointer', marginRight: '10px' }}
            >
              Change Address
            </button>
            <button
              onClick={() => {
              setBeResponse({ ...beResponse, isUserVerified: true });
              handleSubmit();
              }}
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}
            >
              Confirm Address
            </button>
          </Modal>
        )}

        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', float: 'right', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
