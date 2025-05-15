'use client';
import styles from './loginRequest.module.css';
import Image from 'next/image';

export default function LoginRequest({ onClose, onLogin }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image 
                    src="/image/lock.svg" 
                    width={48} 
                    height={48} 
                    alt="" 
                    className={styles.icon}
                />
                <h2>Login Required</h2>
            </div>
            <p className={styles.message}>
                Please log in to access this feature
            </p>
            <div className={styles.actions}>
                <button 
                    onClick={onClose}
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
                <button 
                    onClick={onLogin}
                    className={styles.loginButton}
                >
                    Log In
                </button>
            </div>
        </div>
    );
}