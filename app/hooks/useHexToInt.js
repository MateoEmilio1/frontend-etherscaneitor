import { useState, useEffect } from 'react';

const hexToInt = (hex) => {
    if (!hex) return 0;
    return parseInt(hex, 16);
};

export const useHexToInt = (hexValue) => {
    const [intValue, setIntValue] = useState(0);

    useEffect(() => {
        if (hexValue) {
            setIntValue(hexToInt(hexValue));
        }
    }, [hexValue]);

    return intValue;
};
