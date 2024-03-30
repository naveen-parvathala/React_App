import React, { useState } from 'react';
import './App.css';

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

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSegmentName('');
    setSelectedSchema('');
  };

  const handleAddNewSchema = () => {
    // Add new schema to blue box
    if (selectedSchema) {
      // Add the selected schema to the blue box
      console.log('Adding schema:', selectedSchema);
      // Clear the selected schema
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = () => {
    // Prepare segment data
    const data = {
      segment_name: segmentName,
      schema: [
        { [selectedSchema.value]: selectedSchema.label }
      ]
    };

    // Send POST request to JSON Server
    fetch('http://localhost:3000/segments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Segment saved:', responseData);
        handlePopupClose();
      })
      .catch((error) => {
        console.error('Error saving segment:', error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleSaveSegmentClick}>Save Segment</button>
      {showPopup && (
        <div className="popup">
          <h2>Enter the Name of the Segment</h2>
          <label htmlFor="segmentName">Segment Name:</label>
          <input
            type="text"
            id="segmentName"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
          <label htmlFor="schema">Add Schema to Segment:</label>
          <select
            id="schema"
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(JSON.parse(e.target.value))}
          >
            <option value="">Select Schema</option>
            {schemas.map((schema) => (
              <option key={schema.value} value={JSON.stringify(schema)}>
                {schema.label}
              </option>
            ))}
          </select>
          <button onClick={handleAddNewSchema}>+ Add new schema</button>
          <div className="button-group">
            <button onClick={handleSaveSegment}>Save Segment</button>
            <button onClick={handlePopupClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
