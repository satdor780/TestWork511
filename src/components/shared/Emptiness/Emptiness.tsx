import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const Emptiness: FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 pb-5">
      <Image src="/not-found.png" alt="not found" width={150} height={150} className="mb-3" />
      <p className="d-block pb-2 fs-5 fw-medium">{title}</p>
      <span className="d-block pb-3 text-white px-2">{subtitle}</span>
      {!isHomePage && (
        <Link href="/" className="btn btn-primary mt-2 bg-default-background border-0">
          На главную
        </Link>
      )}
    </div>
  );
};
