import { FC } from 'react';

export const Title: FC<{ title: string }> = ({ title }) => {
  return <h2 className="gothic-font text-white pb-2 pt-2">{title}</h2>;
};
