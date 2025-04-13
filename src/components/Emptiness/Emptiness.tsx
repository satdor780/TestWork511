import Image from 'next/image';
import { FC } from 'react';

export const Emptiness: FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 pb-5">
      <Image src="/not-found.png" alt="not found" width={150} height={150} className="mb-3" />
      <p className="d-block pb-2 fs-5 fw-medium">{title}</p>
      <span className="d-block pb-3 text-white px-2 text-white">{subtitle}</span>
    </div>
  );
};
