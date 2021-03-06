import { useEffect, createContext } from "react";
import axios from "axios";

import { useLocalStorage } from "./use-local-storage";
import { coingeckoEndpoints } from "../constants/api-endpoints";

import { baseApiUrl } from "../constants/api-endpoints";
import { useAuth } from "./use-auth";

export const CoinsContext = createContext([]);

export const CoinsProvider = ({ children }) => {
  const auth = useAuth();
  const market = useCoinsProvider();
  const [storedCoins, setStoredCoins] = useLocalStorage('_coins', []);
  const [refs, setRefs] = useLocalStorage('_refs', []);

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

  useEffect(() => {
    if (refs.length === 0) {
      axios({
        method: "GET",
        url: `${baseApiUrl}/api/currencies`,
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "true",
          "Authorization": `Bearer ${auth.storedToken}`
        }
      })
        .then((response) => {
          setRefs(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
    //eslint-disable-next-line
  }, [])

  /**
   * 
   * @param {*} amount 
   * @param {*} coin 
   * @param {*} ref 
   * @param {*} mode  // mode: sell, purchase
   * @returns 
   */
  const Converter = (amount, coin, ref, mode) => {
    if (mode === 'purchase') {
      return (amount / (ref[coin] && ref[coin].current_price)).toFixed(5);
    }
    if (mode === 'sell') {
      return (amount * (ref[coin] && ref[coin].current_price)).toFixed(2);
    }
    return;
  };


  return (
    <CoinsContext.Provider value={{ refs, storedCoins, market, Converter }}>
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
    exchangesListStatus,
  };
}
