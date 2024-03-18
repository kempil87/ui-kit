import { ButtonPage } from '../../pages/button-page/button-page';
import { CollapsePage } from '../../pages/collapse-page/collapse-page';
import { ToastPage } from '../../pages/toast-page/toast-page.tsx';
import { BadgePage } from '../../pages/badge-page/badge-page.tsx';
import { PopoverPage } from '../../pages/popover-page/popover-page.tsx';
import { TooltipPage } from '../../pages/tooltip-page/tooltip-page.tsx';
import { ModalPage } from '../../pages/modal-page/modal-page.tsx';
import { DrawerPage } from '../../pages/drawer-page/drawer-page.tsx';

export const ROUTES = [
  {
    path: '/buttons',
    element: <ButtonPage />,
    title: 'Button',
  },
  {
    path: '/collapse',
    element: <CollapsePage />,
    title: 'Collapse',
  },
  {
    path: '/toast',
    element: <ToastPage />,
    title: 'Toast',
  },
  {
    path: '/badge',
    element: <BadgePage />,
    title: 'Badge',
  },
  {
    path: '/popover',
    element: <PopoverPage />,
    title: 'Popover',
  },
  {
    path: '/tooltip',
    element: <TooltipPage />,
    title: 'Tooltip',
  },
  {
    path: '/modal',
    element: <ModalPage />,
    title: 'Modal',
  },
  {
    path: '/drawer',
    element: <DrawerPage />,
    title: 'Drawer',
  },
  {
    path: '/tooltip',
    element: <TooltipPage />,
    title: 'Tooltip',
  },
];
