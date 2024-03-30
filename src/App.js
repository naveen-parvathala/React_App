import React, { useState } from 'react';
import './App.css';
import { FaAngleLeft } from "react-icons/fa";
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [schemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
    setSelectedSchema('');
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSegmentName('');
    setSelectedSchema('');
  };

  const handleAddNewSchema = () => {
    if (selectedSchema) {
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
      setSelectedSchema('');
      // setSelectedSchemas([]);
    }
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
    };

    fetch('http://localhost:4000/segments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Segment saved successfully');
        handlePopupClose();
        setSelectedSchemas([]);
      })
      .catch((error) => {
        console.error('Error saving segment:', error);
      });
  };

  return (
    <div className="App">
      
      <div className='App-header'>
        {!showPopup && <button onClick={handleSaveSegmentClick} className='mybutton'>Save Segment</button>}
        {showPopup && (
          <div className="popup">
            <header className='mix'><FaAngleLeft size={20} style={{ marginTop: '18px' }}/><p className='para'>Saving Segment</p></header>
            <p>Enter the Name of the Segment</p>
            <input
              type="text"
              id="segmentName"
              placeholder='Name of the segment'
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <p>To save your segment, you need to add the schemas to build your query</p>
            {selectedSchemas.length > 0 && (
              <div className="blue-box">
                {selectedSchemas.map((schema, index) => (
                  <select key={index}>
                    <option disabled selected>{schema.label}</option>
                    {schemas.map((option) => (
                      !selectedSchemas.find(selected => selected.value === option.value) && (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      )
                    ))}
                  </select>
                ))}
              </div>
            )}
            <select
              id="schema"
              value={selectedSchema.value}
              onChange={(e) => setSelectedSchema(schemas.find(schema => schema.value === e.target.value))}
            >
              <option value="">Add schema to segment</option>
              {schemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <a href="#" onClick={handleAddNewSchema} className='App-link'>+ Add new schema</a>
            <div className="button-group">
              <button onClick={handleSaveSegment} className='save'>Save Segment</button>
              <button onClick={handlePopupClose} className='cancel'>Cancel</button>
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
