'use client'

import { useState } from 'react';

function useCopyToClipboard() {
    const [showTooltip, setShowTooltip] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return { copyToClipboard, showTooltip, setShowTooltip };
}

export default useCopyToClipboard;
