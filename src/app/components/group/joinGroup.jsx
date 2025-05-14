'use client';

import { useState } from 'react';
import styles from './joinGroup.module.css';
import Image from 'next/image';

export default function JoinGroup({ onClose, onJoin }) {
    const [groupCode, setGroupCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupCode.trim()) {
            onJoin(groupCode.trim());
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
                <h2 className={styles.headerTitle}>Join Group</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <p className={styles.instruction}>
                    Enter the group code to join a study group
                </p>

                <input
                    type="text"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    placeholder="Enter group code"
                    className={styles.input}
                    autoFocus
                />

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
                        className={styles.joinButton}
                            
                        disabled={!groupCode.trim()}
                    >
                        Join Group
                    </button>
                </div>
            </form>
        </div>
    );
}