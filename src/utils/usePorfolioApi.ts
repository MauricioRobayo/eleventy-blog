import { useState, useEffect } from 'react';
import SLSC from 'simple-localstorage-cache';
import { Portfolio } from '../types';
import { Api, ApiPortfolioRepository } from '.';
import apiDataParser from './apiDataParser';

interface PortfolioState {
  portfolio: Portfolio | null;
  error: string;
}
type UsePortfolioApi = (apiUrl: string) => PortfolioState;

export const usePorfolioApi: UsePortfolioApi = (apiUrl) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const api = new Api<Portfolio>(apiUrl);
    const cache = new SLSC<Portfolio>('portfolio', 60);
    const apiPortafolioRepository = new ApiPortfolioRepository(cache, api);
    apiPortafolioRepository
      .get()
      .then((portfolio) => {
        if ('error' in portfolio) {
          setError(portfolio.error);
          return;
        }
        setPortfolio(apiDataParser(portfolio));
      })
      .catch(console.log);
  }, [apiUrl]);
  return {
    portfolio,
    error,
  };
};
