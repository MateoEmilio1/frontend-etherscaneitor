"use client"

import { create } from 'zustand';
import { createContext } from 'react';
import axios from 'axios';

const createEthPriceStore = () =>
    create((set) => ({
        ethPrice: "",
        isLoading: true,
        fetchEthPrice: async () => {
            set({ isLoading: true });
            try {
                const response = await axios.get(
                    "https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace"
                );
                const priceData = response.data[0];
                const precioReal = priceData.price.price * 10 ** priceData.price.expo;
                set({ ethPrice: precioReal.toFixed(1), isLoading: false });
            } catch (error) {
                console.error("Error al obtener el precio de ETH:", error);
                set({ isLoading: false });
            }
        },
    }));

export const EthPriceStoreContext = createContext(null);

export const EthPriceStoreProvider = ({ children }) => {
    const store = createEthPriceStore();
    return (
        <EthPriceStoreContext.Provider value={store}>
            {children}
        </EthPriceStoreContext.Provider>
    );
};
