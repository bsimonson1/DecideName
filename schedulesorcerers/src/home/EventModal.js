import React, { useState } from 'react';
import './EventModal.css'

const EventModal = ({ openModal, closeModal, onConfirm }) => {
    const [eventName, setEventName] = useState('');
    const [priority, setPriority] = useState(0);
    const [invalidEventName, invalidateEventName] = React.useState(false);
    
    const handleConfirm = (e) => {
        if (eventName){
            onConfirm(eventName);
            setEventName('');
            invalidateEventName(false);
        } else {
            invalidateEventName(true);
        }
    };

    const handleCancel = () => {
        setEventName('');
        invalidateEventName(false);
        closeModal();
    }

    return (
        <div className='modal-container'>
            {openModal && (
                <dialog open className='modal'>
                        <h3>Add Event</h3>
                        <div className='form-group'>
                            <label htmlFor="eventName">Event Name:</label>
                            <input 
                                type="text" 
                                id="eventName" value={eventName} 
                                onChange={(e) => setEventName(e.target.value)}
                            />
                            <label htmlFor="priority">Priority:</label>
                            <select>
                                <option value="2">High</option>
                                <option value="1" selected>Medium</option>
                                <option value=".5">Low</option>
                            </select>
                        </div>
                        {invalidEventName && <p1 className="error-message">Please input an event name.</p1>}
                        <div className='button-group'>
                            <button onClick={handleConfirm}>Confirm</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                </dialog>
            )}
        </div>
    );
};

export default EventModal;