import axios from 'axios';

export const coingeckoEndpoints = {
    GET_BTC_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_ETH_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_XRP_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ripple&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_BCH_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin-cash&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_ADA_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=cardano&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_LTC_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=litecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_XEM_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=nem&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_XLM_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=stellar&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_MIOTA_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=iota&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_DASH_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=dash&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_MARKET_STATUS: axios.get('https://api.coingecko.com/api/v3/global'),
    GET_EXCHANGES_LIST: axios.get('https://api.coingecko.com/api/v3/exchanges/list'),
};

export const baseApiUrl = 'http://localhost:8000';
