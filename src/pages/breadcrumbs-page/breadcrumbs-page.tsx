import { Card } from '../../shared/components/card/card.tsx';
import {
  Breadcrumbs,
  BreadcrumbsItem,
} from '../../shared/components/breadcrumbs/breadcrumbs.tsx';

export const BreadcrumbsPage = () => {
  const breadcrumbs1: BreadcrumbsItem[] = [
    { path: '/form-elems', title: 'Form-elems' },
    { title: 'Input' },
  ];

  const breadcrumbs2: BreadcrumbsItem[] = [
    { path: '/form-elems', title: 'Form-elems' },
    { title: 'Input' },
  ];

  return (
    <Card title='Breadcrumbs'>
      <div className='space-y-6'>
        <Breadcrumbs breadcrumbs={breadcrumbs1} />

        <Breadcrumbs renderIcon={() => '/'} breadcrumbs={breadcrumbs2} />
      </div>
    </Card>
  );
};
