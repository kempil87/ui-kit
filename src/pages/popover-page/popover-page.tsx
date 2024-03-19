import { Button } from '../../shared/components/button/button.tsx';
import { Popover } from '../../shared/components/popover/popover.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { Tooltip } from '../../shared/components/tooltip/tooltip.tsx';

const content = (
  <div className='flex flex-col gap-4'>
    <button className='inline-flex items-center gap-x-5 hover:opacity-75 transition-all'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 256 256'
        fill='currentColor'
        className='size-4'
      >
        <path d='M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z'></path>
      </svg>
      <span>Content1</span>
    </button>

    <button className='inline-flex items-center gap-x-5 hover:opacity-75 transition-all'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 256 256'
        fill='currentColor'
        className='size-4'
      >
        <path d='M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z'></path>
      </svg>
      <span>Content2</span>
    </button>
  </div>
);

export const PopoverPage = () => {
  return (
    <Card title='Popover'>
      <div className='gap-5 flex-wrap flex items-center'>
        <Popover content={content}>
          <Button>Hover</Button>
        </Popover>

        <Popover trigger='click' content={content}>
          <Button>Click</Button>
        </Popover>

        <Popover opened trigger='all' content={content}>
          <Button>All</Button>
        </Popover>

        <Popover disabled content={content}>
          <Tooltip
            className='whitespace-pre'
            content='This Popover has prop disabled'
          >
            <Button className='btn'>Disabled</Button>
          </Tooltip>
        </Popover>
      </div>
    </Card>
  );
};
