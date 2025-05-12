import React, { useState } from 'react';
import styles from "@components/group/createGroup.module.css";

const CreateGroup = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        if (title.trim() && description.trim()) {
            onCreate({ title, description });
            
            onClose();
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Create New Group</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="group-title">Group Title</label>
                    <input
                        type="text"
                        id="group-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter group title"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="group-description">Description</label>
                    <textarea
                        id="group-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter group description"
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleCreate} className={styles.createButton}>Create</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;