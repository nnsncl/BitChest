import { useEffect, createContext } from "react";
import axios from "axios";

import { useLocalStorage } from "./use-local-storage";
import { coingeckoEndpoints } from "../constants/api-endpoints";


export const CoinsContext = createContext([]);

export const CoinsProvider = ({ children }) => {
  const market = useCoinsProvider();
  const [storedCoins, setStoredCoins] = useLocalStorage('_coins', []);

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
        coingeckoEndpoints.GET_DASH_SET,
      ])
      .then(
        axios.spread((...responses) => {
          const formatedResponse = responses.map((item) => {
            return {
              circulating_supply: item.data[0].circulating_supply,
              current_price: item.data[0].current_price,
              fully_diluted_valuation: item.data[0].fully_diluted_valuation,
              high_24h: item.data[0].high_24h,
              coin_id: item.data[0].id,
              image: item.data[0].image,
              last_updated: item.data[0].last_updated,
              low_24h: item.data[0].low_24h,
              market_cap: item.data[0].market_cap,
              market_cap_change_24h: item.data[0].market_cap_change_24h,
              market_cap_change_percentage_24h: item.data[0].market_cap_change_percentage_24h,
              market_cap_rank: item.data[0].market_cap_rank,
              max_supply: item.data[0].max_supply,
              name: item.data[0].name,
              price_change_24h: item.data[0].price_change_24h,
              price_change_percentage_24h: item.data[0].price_change_percentage_24h,
              symbol: item.data[0].symbol,
              total_supply: item.data[0].total_supply,
              total_volume: item.data[0].total_volume
            };
          });
          setStoredCoins(formatedResponse);
        })
      )
      .catch(function (error) {
        console.error(error.message);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <CoinsContext.Provider value={{ storedCoins, market }}>
      {children}
    </CoinsContext.Provider>
  );
};

function useCoinsProvider() {
  const [marketStatus, setMarketStatus] = useLocalStorage('_market', {});
  const [exchangesListStatus, setExchangesListStatus] = useLocalStorage('_exchanges', []);

  useEffect(() => {
    axios
      .all([
        coingeckoEndpoints.GET_MARKET_STATUS,
        coingeckoEndpoints.GET_EXCHANGES_LIST,
      ])
      .then(
        axios.spread((...responses) => {
          setMarketStatus(responses[0].data);
          setExchangesListStatus(responses[1].data);
        })
      )
      .catch(function (error) {
        console.error(error.message);
      });
  //eslint-disable-next-line
  }, []);

  return {
    marketStatus,
    exchangesListStatus
  };
}
