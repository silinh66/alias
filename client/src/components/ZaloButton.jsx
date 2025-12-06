import React from 'react';

const ZaloButton = () => {
    return (
        <a
            href="https://zalo.me/0395.888.619"
            target="_blank"
            rel="noopener noreferrer"
            className="zalo-button"
            title="Chat Zalo"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                alt="Zalo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
        </a>
    );
};

export default ZaloButton;
