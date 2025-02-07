export const PRIORITY_FEE_OPTIONS = {
    slow: { label: "Slow (1 Gwei)", value: 1 },
    medium: { label: "Medium (2 Gwei)", value: 2 },
    fast: { label: "Fast (3 Gwei)", value: 3 },
    custom: { label: "Custom", value: null },
};

export const GAS_UNITS_OPTIONS = {
    transfer: { label: "ETH Transfer (21,000 gas)", value: 21000 },
    approve: { label: "Contract Approval (45,000 gas)", value: 45000 },
    swap: { label: "Swap on Uniswap (100,000 gas)", value: 100000 },
    nftMint: { label: "NFT Mint (150,000 gas)", value: 150000 },
    custom: { label: "Custom", value: null },
};

export const INFO_CARDS = [
    {
        title: "What is the Priority Fee?",
        content: (
            <>
                <p>
                    The <strong>Priority Fee</strong> is an additional tip paid to validators to process your transaction faster.
                </p>
                <p>The recommended values are:</p>
                <ul className="list-disc pl-5">
                    <li><strong>Slow:</strong> 1 Gwei</li>
                    <li><strong>Medium:</strong> 2 Gwei</li>
                    <li><strong>Fast:</strong> 3 Gwei</li>
                </ul>
            </>
        ),
    },
    {
        title: "What are Gas Units?",
        content: (
            <>
                <p>
                    <strong>Gas units</strong> represent the computational cost of executing a transaction.
                </p>
                <p>Some common examples:</p>
                <ul className="list-disc pl-5">
                    <li><strong>ETH Transfer:</strong> 21,000 gas</li>
                    <li><strong>Contract Approval:</strong> 45,000 gas</li>
                    <li><strong>Swap on Uniswap:</strong> 100,000 gas</li>
                    <li><strong>NFT Mint:</strong> 150,000 gas</li>
                </ul>
            </>
        ),
    },
];