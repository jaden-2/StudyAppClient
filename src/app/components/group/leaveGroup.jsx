'use client';
import styles from './leaveGroup.module.css';
import Image from 'next/image';

export default function LeaveGroup({ groupName, onConfirm, onCancel }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image 
                    src="/image/warning.svg" 
                    width={48} 
                    height={48} 
                    alt="" 
                    className={styles.warningIcon}
                />
                <h2 className={styles.title}>Leave Group?</h2>
            </div>

            <p className={styles.message}>
                Are you sure you want to leave <span className={styles.groupName}>{groupName}</span>? 
                You'll need to be invited again to rejoin.
            </p>

            <div className={styles.actions}>
                <button 
                    onClick={onCancel} 
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
                <button 
                    onClick={onConfirm} 
                    className={styles.leaveButton}
                >
                    Leave Group
                </button>
            </div>
        </div>
    );
}