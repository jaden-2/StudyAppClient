'use client';

import styles from './actionBar.module.css';
import Image from 'next/image';

export default function ActionBar({ onCreateGroup, onJoinGroup }) {
    return (
        <div className={styles.actionBar}>
            <button 
                className={`${styles.actionButton} ${styles.createButton}`}
                onClick={onCreateGroup}
            >
                <Image 
                    src="/image/add.svg" 
                    width={20} 
                    height={20} 
                    alt="" 
                />
                Create Group
            </button>
            
            <button 
                className={`${styles.actionButton} ${styles.joinButton}`}
                onClick={onJoinGroup}
            >
                <Image 
                    src="/image/join.svg" 
                    width={20} 
                    height={20} 
                    alt="" 
                />
                Join Group
            </button>
        </div>
    );
}