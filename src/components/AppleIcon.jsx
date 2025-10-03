import React from 'react';

const AppleIcon = () => (
    // We are using the PNG file you placed in the public folder.
    // The filter inverts black to white, ensuring the logo is visible on the black button.
    <img 
        src="/apple_logo.png" 
        alt="Apple Logo" 
        style={{ 
            width: '24px', 
            height: '24px', 
            marginRight: '8px',
            // This CSS filter inverts the color. Assuming your PNG is black, 
            // this makes it white for the black button background.
            filter: 'invert(100%)',
            objectFit: 'contain'
        }} 
    />
);

export default AppleIcon;