export const PRIORITY_FEE_OPTIONS = {
    slow: { label: "Lento (1 Gwei)", value: 1 },
    medium: { label: "Medio (2 Gwei)", value: 2 },
    fast: { label: "Rápido (3 Gwei)", value: 3 },
    custom: { label: "Personalizado", value: null },
};

export const GAS_UNITS_OPTIONS = {
    transfer: { label: "Transferencia de ETH (21,000 gas)", value: 21000 },
    approve: { label: "Aprobación de contrato (45,000 gas)", value: 45000 },
    swap: { label: "Swap en Uniswap (100,000 gas)", value: 100000 },
    nftMint: { label: "Mint de NFT (150,000 gas)", value: 150000 },
    custom: { label: "Personalizado", value: null },
};

export const INFO_CARDS = [
    {
        title: "¿Qué es el Priority Fee?",
        content: (
            <>
                <p>
                    El <strong>Priority Fee</strong> es una propina adicional pagada a los validadores para que procesen tu transacción más rápido.
                </p>
                <p>Se recomienda usar los siguientes valores:</p>
                <ul className="list-disc pl-5">
                    <li><strong>Lento:</strong> 1 Gwei</li>
                    <li><strong>Medio:</strong> 2 Gwei</li>
                    <li><strong>Rápido:</strong> 3 Gwei</li>
                </ul>
            </>
        ),
    },
    {
        title: "¿Qué son las Gas Units?",
        content: (
            <>
                <p>
                    Las <strong>unidades de gas</strong> representan el costo computacional de ejecutar una transacción.
                </p>
                <p>Algunos ejemplos comunes:</p>
                <ul className="list-disc pl-5">
                    <li><strong>Transferencia de ETH:</strong> 21,000 gas</li>
                    <li><strong>Aprobación de contrato:</strong> 45,000 gas</li>
                    <li><strong>Swap en Uniswap:</strong> 100,000 gas</li>
                    <li><strong>Mint de NFT:</strong> 150,000 gas</li>
                </ul>
            </>
        ),
    },
];