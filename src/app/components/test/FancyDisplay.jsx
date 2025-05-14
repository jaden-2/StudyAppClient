import React from 'react';
import PropTypes from 'prop-types';
import styles from './fancyDisplay.module.css';

const FancyDisplay = ({ children }) => {
    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.fancyDisplay}>
                {children}
            </div>
        </>
    );
};

FancyDisplay.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FancyDisplay;