import { PropsWithChildren } from 'react';
import { Button } from '../button/button.tsx';
import { ROUTES } from '../../contants/routes.tsx';
import { useLocalStorage } from 'usehooks-ts';

type Layout = PropsWithChildren;

export const Layout = ({ children }: Layout) => {
  const [visibleSidebar, setVisibleSidebar] = useLocalStorage(
    'sidebar',
    'true'
  );

  const toggleSidebar = () =>
    setVisibleSidebar(JSON.stringify(!JSON.parse(visibleSidebar)));

  return (
    <div className=' h-full'>
      <header className='bg-bg border-b border-border z-50 fixed h-14 inset-x-0 backdrop-blur-md'>
        <div className='flex-between h-full px-4'>
          <button
            title='Toggle Sidebar'
            onClick={toggleSidebar}
            className='items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 -ml-2 hidden size-9 p-0 lg:flex'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
              fill='currentColor'
              className='size-6'
            >
              <path d='M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z'></path>
            </svg>
            <span className='sr-only'>Toggle Sidebar</span>
          </button>

          <Button variant='light'>Выйти</Button>
        </div>
      </header>

      <div className='flex gap-x-4 relative h-full pt-14'>
        <aside
          data-visible={visibleSidebar}
          className='bg-bg peer justify-start items-start  transition-transform group duration-300 border-r data-[visible=false]:-translate-x-full border-border flex fixed z-40 bottom-0 top-14 left-0 h-screen w-[240px]'
        >
          <div className='flex p-4 flex-col gap-2.5 w-full'>
            {ROUTES.map((el) => (
              <Button key={el.path} href={el.path} className='w-full'>
                {el.title}
              </Button>
            ))}
          </div>
        </aside>

        <div className='h-full w-full transition-all duration-300 peer-data-[visible=false]:pl-0 flex flex-col pl-[240px]'>
          <main className='flex flex-col flex-1 p-4'>{children}</main>

          <footer className='bg-bg border-t border-border'>
            <div className='py-4 px-4 font-medium'>
              Created By Kempil87 - {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
