import { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import { Api, ApiPortfolioRepository, Cache } from '.';
import apiDataParser from './apiDataParser';

const API_URL = 'https://gitconnected.com/v1/portfolio/mauriciorobayo';

interface PortfolioState {
  portfolio: Portfolio;
  loading: Boolean;
  error: string;
  url: string;
}
type UsePortfolioApi = (initialPortfolio: Portfolio) => PortfolioState;

export const usePorfolioApi: UsePortfolioApi = (initialPortfolio) => {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const api = new Api(API_URL);
    const cache = new Cache('portfolio', 60);
    const apiPortafolioRepository = new ApiPortfolioRepository(cache, api);
    apiPortafolioRepository
      .get()
      .then((portfolio) => {
        if ('error' in portfolio) {
          setError(portfolio.error);
        }
        setPortfolio(apiDataParser(portfolio));
      })
      .catch(console.log)
      .finally(() => setloading(false));
  }, []);
  return {
    portfolio,
    loading,
    error,
    url: API_URL,
  };
};
