"use client";
import axios from "axios";

export async function fetchAddressData(address) {
    const response = await axios.get("https://backend-etherneitor-production.up.railway.app/address", {
        params: { address },
    });
    return response.data;
}
