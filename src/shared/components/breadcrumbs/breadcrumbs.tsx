import { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/icon.tsx';

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbsItem[];
  renderIcon?: () => ReactNode;
}

export interface BreadcrumbsItem {
  path?: string;
  title: ReactNode;
}

export const Breadcrumbs = ({ breadcrumbs, renderIcon }: BreadcrumbsProps) => {
  const defaultItem: BreadcrumbsItem = {
    path: '/',
    title: 'Main',
  };

  return (
    <nav className='overflow-x-auto'>
      <ul className='inline-flex min-w-max items-center font-medium'>
        {[defaultItem, ...breadcrumbs].map((item, index) => (
          <Breadcrumbs.Item
            key={item.path ?? index}
            {...item}
            index={index}
            renderIcon={renderIcon}
          />
        ))}
      </ul>
    </nav>
  );
};

interface BreadcrumbsCore
  extends Pick<BreadcrumbsProps, 'renderIcon'>,
    BreadcrumbsItem {
  index: number;
}

Breadcrumbs.Item = ({ path, title, index, renderIcon }: BreadcrumbsCore) => {
  const NavLink = ({ children }: PropsWithChildren) => {
    if (path) {
      return (
        <Link
          className='transition-all duration-300 hover:opacity-75'
          to={path}
        >
          {children}
        </Link>
      );
    }

    return <span className='text-placeholder'>{children}</span>;
  };

  return (
    <li className='inline-flex items-center mx-1 gap-1'>
      {!!index &&
        (renderIcon?.() || (
          <Icon
            className='clamp-3.5 last:text-red -rotate-90'
            name='common/arrow'
          />
        ))}
      <NavLink>{title}</NavLink>
    </li>
  );
};
