'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './shareDialog.module.css';

const ShareGroup = ({ groupId, onClose }) => {
    const [showCopied, setShowCopied] = useState(false);

    useEffect(() => {
        if (showCopied) {
            const timer = setTimeout(() => setShowCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showCopied]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(groupId);
            setShowCopied(true);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Share Group</h2>
                <p className={styles.subtitle}>Share this group ID with others to let them join</p>
            </div>

            <div className={styles.idBox}>
                <span className={styles.groupId}>{groupId}</span>
                <button 
                    onClick={copyToClipboard} 
                    className={styles.copyButton}
                    aria-label="Copy group ID"
                >
                    <Image 
                        src="/image/copy.svg" 
                        width={16} 
                        height={16} 
                        alt="" 
                        aria-hidden="true"
                    />
                    Copy
                </button>
            </div>

            <button 
                onClick={onClose} 
                className={styles.closeButton}
            >
                Close
            </button>

            {showCopied && (
                <div className={styles.toast} role="alert">
                    Copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default ShareGroup;