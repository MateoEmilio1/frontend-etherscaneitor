import { useContext } from 'react';
import { useStore } from 'zustand';
import { EthPriceStoreContext } from './ethPriceStore';

export function useEthPriceContext(selector) {
    const store = useContext(EthPriceStoreContext);
    if (!store) throw new Error('Missing EthPriceStoreProvider in the tree');
    return useStore(store, selector);
}
