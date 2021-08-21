import { useState, useEffect, createContext } from "react";
import { coingeckoEndpoints } from '../constants/api-endpoints';
import axios from 'axios';

export const CoinsContext = createContext([])

export const CoinsProvider = ({ children }) => {
    const market = useCoinsProvider();
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios
            .all([
                coingeckoEndpoints.GET_BTC_SET,
                coingeckoEndpoints.GET_ETH_SET,
                coingeckoEndpoints.GET_XRP_SET,
                coingeckoEndpoints.GET_BCH_SET,
                coingeckoEndpoints.GET_ADA_SET,
                coingeckoEndpoints.GET_LTC_SET,
                coingeckoEndpoints.GET_XEM_SET,
                coingeckoEndpoints.GET_XLM_SET,
                coingeckoEndpoints.GET_MIOTA_SET,
                coingeckoEndpoints.GET_DASH_SET
            ])
            .then(
                axios.spread((...responses) => {
                    setCoins(responses)
                }))
            .catch(function (error) {
                console.error(error.message);
            })
    }, [])

    return (
        <CoinsContext.Provider value={{ coins, market }}>
            {children}
        </CoinsContext.Provider>
    )
}

function useCoinsProvider() {
    const [status, setStatus] = useState({});

    useEffect(() => {
        coingeckoEndpoints.GET_MARKET_STATUS
            .then((response) => {
                setStatus(response.data.data)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [])

    return {
        status
    }
}