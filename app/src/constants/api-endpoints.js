import axios from 'axios';

export const coingeckoEndpoints = {
    GET_BTC_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_ETH_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_XRP_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ripple&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_BCH_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin-cash&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_ADA_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cardano&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_LTC_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=litecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_XEM_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=nem&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_XLM_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=stellar&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_MIOTA_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=iota&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
    GET_DASH_SET: axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dash&order=market_cap_desc&per_page=10&page=1&sparkline=false'),
};