import { ButtonPage } from '../../pages/button-page/button-page';
import { CollapsePage } from '../../pages/collapse-page/collapse-page';
import { ToastPage } from '../../pages/toast-page/toast-page.tsx';
import { BadgePage } from '../../pages/badge-page/badge-page.tsx';
import { PopoverPage } from '../../pages/popover-page/popover-page.tsx';
import { TooltipPage } from '../../pages/tooltip-page/tooltip-page.tsx';
import { ModalPage } from '../../pages/modal-page/modal-page.tsx';
import { DrawerPage } from '../../pages/drawer-page/drawer-page.tsx';
import { IconButtonPage } from '../../pages/icon-button-page/icon-button-page.tsx';
import { FloatButtonPage } from '../../pages/float-button-page/float-button-page.tsx';
import { SegmentedPage } from '../../pages/segmented-page/segmented-page.tsx';
import { InputPage } from '../../pages/input-page/input-page.tsx';
import { SwitchPage } from '../../pages/switch-page/switch-page.tsx';
import { SelectPage } from '../../pages/select-page/select-page.tsx';
import { ChipPage } from '../../pages/chip-page/chip-page.tsx';
import { PaginationPage } from '../../pages/pagination-page/pagination-page.tsx';
import { TablePage } from '../../pages/table-page/table-page.tsx';
import { CheckboxPage } from '../../pages/checkbox-page/checkbox-page.tsx';
import { TextareaPage } from '../../pages/textarea-page/textarea-page.tsx';
import { TreePage } from '../../pages/tree-page/tree-page.tsx';
import { UploaderPage } from '../../pages/uploader-page/uploader-page.tsx';
import { BreadcrumbsPage } from '../../pages/breadcrumbs-page/breadcrumbs-page.tsx';
import { TimePickerPage } from '../../pages/time-picker-page/time-picker-page.tsx';

export const ROUTES = [
  {
    path: '/buttons',
    element: <ButtonPage />,
    title: 'Button',
  },
  {
    path: '/icon-button',
    element: <IconButtonPage />,
    title: 'Icon Button',
  },
  {
    path: '/float-button',
    element: <FloatButtonPage />,
    title: 'Float Button',
  },
  {
    path: '/table',
    element: <TablePage />,
    title: 'Table',
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
    path: '/segmented',
    element: <SegmentedPage />,
    title: 'Segmented',
  },
  {
    path: '/chip',
    element: <ChipPage />,
    title: 'Chip',
  },
  {
    path: '/pagination',
    element: <PaginationPage />,
    title: 'Pagination',
  },
  {
    path: '/breadcrumbs',
    element: <BreadcrumbsPage />,
    title: 'Breadcrumbs',
  },
  {
    path: '/tree',
    element: <TreePage />,
    title: 'Tree',
  },
  {
    path: '/input',
    element: <InputPage />,
    title: 'Input',
    forms: true,
  },
  {
    path: '/textarea',
    element: <TextareaPage />,
    title: 'Textarea',
  },
  {
    path: '/select',
    element: <SelectPage />,
    title: 'Select',
  },
  {
    path: '/switch',
    element: <SwitchPage />,
    title: 'Switch',
  },
  {
    path: '/checkbox',
    element: <CheckboxPage />,
    title: 'Checkbox',
  },
  {
    path: '/uploader',
    element: <UploaderPage />,
    title: 'Uploader',
  },
  {
    path: '/time-picker-page',
    element: <TimePickerPage />,
    title: 'TimePicker',
  },
];
