import { useState, useEffect } from 'react';
import Cache from 'simple-storage-cache';
import { Portfolio } from '../types';
import { Api, ApiPortfolioRepository } from '.';

interface PortfolioState {
  portfolio: Portfolio | null;
  error: string;
}
type UsePortfolioApi = (apiUrl: string) => PortfolioState;

export const usePorfolioApi: UsePortfolioApi = (apiUrl) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const SIXTY_MINUTES_IN_MILLISECONDS = 60 * 60 * 1000;
    const api = new Api<Portfolio>(apiUrl);
    const cache = new Cache<Portfolio>(
      'portfolio',
      SIXTY_MINUTES_IN_MILLISECONDS
    );
    const apiPortafolioRepository = new ApiPortfolioRepository(cache, api);
    apiPortafolioRepository
      .get()
      .then((portfolio) => {
        if ('error' in portfolio) {
          setError(portfolio.error);
          return;
        }
        setPortfolio(portfolio);
      })
      .catch(console.log);
  }, [apiUrl]);
  return {
    portfolio,
    error,
  };
};
