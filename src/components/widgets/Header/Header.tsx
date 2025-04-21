import Link from 'next/link';
import { FC } from 'react';

import { Favorites } from '@/assets/icons';

import { Search } from '../../shared/Search';

export const Header: FC = () => {
  return (
    <header className="d-flex align-items-center gap-3 mb-4">
      <div className="logo">
        <h1 className="gothic-font fs-2 mb-0">
          <Link href="/">Weather</Link>
        </h1>
      </div>
      <Search />
      <Link
        href="/favorites"
        className="bg-default-background rounded-3 d-flex align-items-center justify-content-center"
        style={{ height: '46px', width: '46px', minWidth: '46px' }}
      >
        <Favorites />
      </Link>
    </header>
  );
};
