import { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import { Api, ApiPortfolioRepository, Cache } from '.';
import apiDataParser from './apiDataParser';

interface PortfolioState {
  portfolio: Portfolio;
  loading: Boolean;
  error: string;
}
type UsePortfolioApi = (
  initialPortfolio: Portfolio,
  apiUrl: string
) => PortfolioState;

export const usePorfolioApi: UsePortfolioApi = (initialPortfolio, apiUrl) => {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const api = new Api(apiUrl);
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
  }, [apiUrl]);
  return {
    portfolio,
    loading,
    error,
  };
};
