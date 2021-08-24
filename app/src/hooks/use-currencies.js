import { useState, useEffect, createContext } from "react";
import { baseApiUrl, coingeckoEndpoints } from "../constants/api-endpoints";
import axios from "axios";

export const CoinsContext = createContext([]);

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
        coingeckoEndpoints.GET_DASH_SET,
      ])
      .then(
        axios.spread((...responses) => {
          const newCoinArray = responses.map((item) => {
              console.log(item.data[0])
            return {
              ath: item.data[0].ath ? item.data[0].ath : 0,
              ath_change_percentage: item.data[0].ath_change_percentage ? item.data[0].ath_change_percentage : 0.0,
              ath_date: item.data[0].ath_date ? item.data[0].ath_date : "",
              atl: item.data[0].atl ? item.data[0].atl : 0.0,
              atl_change_percentage: item.data[0].atl_change_percentage ? item.data[0].atl_change_percentage : 0.0,
              atl_date: item.data[0].atl_date ? item.data[0].atl_date : "",
              circulating_supply: item.data[0].circulating_supply ? item.data[0].circulating_supply : 0,
              current_price: item.data[0].current_price ? item.data[0].current_price : 0,
              fully_diluted_valuation: item.data[0].fully_diluted_valuation ? item.data[0].fully_diluted_valuation : 0,
              high_24h: item.data[0].high_24h ? item.data[0].high_24h : 0,
              coin_id: item.data[0].id ? item.data[0].id : "",
              image: item.data[0].image ? item.data[0].image : "",
              last_updated: item.data[0].last_updated ? item.data[0].last_updated : "",
              low_24h: item.data[0].low_24h ? item.data[0].low_24h : 0,
              market_cap: item.data[0].market_cap ? item.data[0].market_cap : 0,
              market_cap_change_24h: item.data[0].market_cap_change_24h ? item.data[0].market_cap_change_24h : 0.0,
              market_cap_change_percentage_24h: item.data[0].market_cap_change_percentage_24h ? item.data[0].market_cap_change_percentage_24h : 0.0,
              market_cap_rank: item.data[0].market_cap_rank ? item.data[0].market_cap_rank : 0,
              max_supply: item.data[0].max_supply ? item.data[0].max_supply : 0,
              name: item.data[0].name ? item.data[0].name : "",
              price_change_24h: item.data[0].price_change_24h ? item.data[0].price_change_24h : 0.0,
              price_change_percentage_24h: item.data[0].price_change_percentage_24h ? item.data[0].price_change_percentage_24h : 0.0,
              symbol: item.data[0].symbol ? item.data[0].symbol : "",
              total_supply: item.data[0].total_supply ? item.data[0].total_supply : 0,
              total_volume: item.data[0].total_volume ? item.data[0].total_volume : 0,
            };
          });
          setCoins(newCoinArray);
            axios.get(baseApiUrl + "/api/currencies")
            .then((response) => {
                if(response.data.length < 1) {
                    console.log("vide");
                    newCoinArray.map((item) => {
                        axios
                          .get(`${baseApiUrl}/sanctum/csrf-cookie`, {
                            method: "GET",
                            withCredentials: true,
                          })
                          .then(() => {
                            axios({
                              method: "POST",
                              url: `${baseApiUrl}/api/currency`,
                              withCredentials: true,
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "true",
                              },
                              data: item,
                            })
                              .then((response) => {
                                console.log(response.data.message);
                              })
                              .catch((error) => {
                                console.log(error.message);
                              });
                          });
                      });
                } else {
                    let _id = 1;
                    newCoinArray.map((item) => {
                        axios
                          .get(`${baseApiUrl}/sanctum/csrf-cookie`, {
                            method: "GET",
                            withCredentials: true,
                          })
                          .then(() => {
                            axios({
                              method: "PUT",
                              url: `${baseApiUrl}/api/currency/${_id}`,
                              withCredentials: true,
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "true",
                              },
                              data: item,
                            })
                              .then((response) => {
                                console.log(response.data.message);
                                _id++;
                              })
                              .catch((error) => {
                                console.log(error.message);
                              });
                          });
                      });
                }
            })
            .catch((error) => console.log(error.message))
        })
      )
      .catch(function (error) {
        console.error(error.message);
      });
  }, []);

  return (
    <CoinsContext.Provider value={{ coins, market }}>
      {children}
    </CoinsContext.Provider>
  );
};

function useCoinsProvider() {
  const [status, setStatus] = useState({});
  const [exchangesList, setExchangesList] = useState([]);

  useEffect(() => {
    axios
      .all([
        coingeckoEndpoints.GET_MARKET_STATUS,
        coingeckoEndpoints.GET_EXCHANGES_LIST,
      ])
      .then(
        axios.spread((...responses) => {
          setStatus(responses[0].data);
          setExchangesList(responses[1].data);
        })
      )
      .catch(function (error) {
        console.error(error.message);
      });
  }, []);

  return {
    status,
    exchangesList,
  };
}
