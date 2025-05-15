'use client';

import { useState } from 'react';
import styles from './profile.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Profile({ user, onClose }) {
    const router = useRouter();
    
    const handleLogout = () => {
        router.push("logout")
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerBar}>
                <button 
                    className={styles.backButton} 
                    onClick={onClose}
                    aria-label="Close profile"
                >
                    <Image src="/image/arrow_back.svg" width={24} height={24} alt="" />
                </button>
                <h2 className={styles.headerTitle}>Profile</h2>
            </div>

            <div className={styles.header}>
                <div className={styles.avatar}>
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className={styles.username}>{user.username}</h2>
            </div>

            <div className={styles.menu}>
                <button className={styles.menuItem}>
                    <Image src="/image/setting.svg" width={20} height={20} alt="" />
                    Settings
                </button>
                <button className={styles.menuItem}>
                    <Image src="/image/info.svg" width={20} height={20} alt="" />
                    Help & Support
                </button>
                <button 
                    className={`${styles.menuItem} ${styles.logout}`}
                    onClick={handleLogout}
                >
                    <Image src="/image/logout.svg" width={20} height={20} alt="" />
                    Log Out
                </button>
            </div>
        </div>
    );
}