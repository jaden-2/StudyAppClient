import React, { useState } from 'react';
import styles from "@components/group/createGroup.module.css";
import Image from 'next/image';

const CreateGroup = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onCreate({ title, description });
            onClose();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerBar}>
                <button 
                    className={styles.backButton} 
                    onClick={onClose}
                    aria-label="Close dialog"
                >
                    <Image src="/image/arrow_back.svg" width={24} height={24} alt="" />
                </button>
                <h2 className={styles.headerTitle}>Create New Group</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="group-title" className={styles.label}>
                        Group Title
                    </label>
                    <input
                        type="text"
                        id="group-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a name for your study group"
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="group-description" className={styles.label}>
                        Description
                    </label>
                    <textarea
                        id="group-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What will your group be studying?"
                        className={styles.textarea}
                        rows="4"
                        required
                    />
                </div>

                <div className={styles.actions}>
                    <button 
                        type="button" 
                        onClick={onClose}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className={styles.createButton}
                        disabled={!title.trim() || !description.trim()}
                    >
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;