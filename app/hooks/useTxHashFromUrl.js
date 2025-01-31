'use client'
import { useEffect, useState } from 'react';

export default function useTxHashFromUrl() {
    const [txHash, setTxHash] = useState(null);

    useEffect(() => {
        const currentLink = window.location.href;
        const regex = /\/tx\/(.+)/;
        const match = currentLink.match(regex);
        const hash = match ? match[1] : null;
        setTxHash(hash);
    }, []);

    return txHash;
}

