'use client';

import cn from 'classnames';
import Link from 'next/link';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useSearchStore } from '@/modules/Search/store/searchStore';
import { Input } from '@/UI/Input/Input';

import styles from './Search.module.scss';

export const Search: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { searchQuery, results, isLoading, error, setSearchQuery, fetchCities, clearResults } =
    useSearchStore();

  const loading = isTyping || isLoading;

  const debouncedFetchCities = useDebouncedCallback((query: string) => {
    if (query.trim() && query.length > 2) {
      fetchCities(query);
      setIsTyping(false);
    } else {
      setIsTyping(false);
      clearResults();
    }
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setIsTyping(true);
      debouncedFetchCities(query);
    } else {
      setIsTyping(false);
      clearResults();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        clearResults();
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearResults]);

  const handleCityClick = () => {
    clearResults();
    setSearchQuery('');
    setIsMenuOpen(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    return () => {
      clearResults();
    };
  }, [clearResults]);

  return (
    <div className={cn(styles.search)}>
      <div className="d-flex align-items-center justify-content-center position-relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Поиск по городам"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsMenuOpen(true)}
          className={cn('form-control', styles.input)}
        />

        <div
          ref={menuRef}
          className={cn('position-absolute w-auto mt-1 rounded shadow rounded-5', styles.menu, {
            [styles.menuOpen]: isMenuOpen,
          })}
        >
          <ul className="p-2 m-0 bg-default-background rounded-5">
            {loading && (
              <li className="p-2 placeholder-glow">
                <span
                  className="placeholder col-12 rounded-5 mb-3"
                  style={{ height: '20px' }}
                ></span>
                <span
                  className="placeholder col-12 rounded-5 mb-3"
                  style={{ height: '20px' }}
                ></span>
                <span
                  className="placeholder col-12 rounded-5 mb-3"
                  style={{ height: '20px' }}
                ></span>
              </li>
            )}
            {!loading && error && (
              <li className="p-2 text-danger" role="alert">
                {error.message || 'Не удалось выпольнить поиск. Попробуйте позже.'}
              </li>
            )}
            {!loading && !error && results?.length === 0 && searchQuery.trim() && (
              <li className="p-2 text-white" role="option">
                Ничего не найдено
              </li>
            )}
            {!loading &&
              !error &&
              results.map((city) => (
                <li
                  key={city.name}
                  className="p-2 hover-bg-light cursor-pointer"
                  onClick={handleCityClick}
                >
                  <Link href={`/detailed-forecast/${city.name}`}>
                    {city.name}, {city.country}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
