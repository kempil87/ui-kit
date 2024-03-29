import { PropsWithChildren, useEffect, useRef } from 'react';
import { Button } from '../button/button.tsx';
import { ROUTES } from '../../constants/routes.tsx';
import { useLocalStorage, useOnClickOutside, useScreen } from 'usehooks-ts';
import { IconButton } from '../icon-button/icon-button.tsx';
import { useLocation } from 'react-router-dom';
import { Dropdown } from '../dropdown/dropdown.tsx';

export const Layout = ({ children }: PropsWithChildren) => {
  const sideBarRef = useRef<HTMLElement>(null);
  const [visibleSidebar, setVisibleSidebar] = useLocalStorage(
    'sidebar',
    'true'
  );

  const { pathname } = useLocation();
  const { width: screenWidth } = useScreen();

  const toggleSidebar = () =>
    setVisibleSidebar(JSON.stringify(!JSON.parse(visibleSidebar)));

  const hideSidebar = () => {
    if (screenWidth < 1024) {
      setVisibleSidebar('false');
    }
  };

  useOnClickOutside(sideBarRef, hideSidebar);

  useEffect(() => {
    hideSidebar();
  }, [pathname, screenWidth]);

  return (
    <div className=' h-full'>
      <header className='bg-bg border-b border-border z-[955] fixed h-14 inset-x-0 backdrop-blur-md'>
        <div className='flex-between h-full px-4'>
          <IconButton
            onClick={toggleSidebar}
            iconProps={{ name: 'common/collapse', className: 'size-6' }}
          />

          <div className='flex items-center gap-5'>
            <Dropdown
              className='max-sm:-right-1/2 max-sm:translate-x-1/4'
              content={
                <div className='w-80 h-96 flex flex-col justify-between'>
                  <span className='text-center block'>Notifications</span>

                  <div className='flex items-center flex-col'>
                    <svg
                      className='stroke-placeholder'
                      data-testid='geist-icon'
                      fill='none'
                      height='24'
                      shapeRendering='geometricPrecision'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      viewBox='0 0 24 24'
                      width='24'
                      aria-label='Empty inbox'
                    >
                      <path d='M22 12h-6l-2 3h-4l-2-3H2'></path>
                      <path d='M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z'></path>
                    </svg>

                    <span className='text-center text-placeholder text-sm block'>
                      Empty
                    </span>
                  </div>

                  <Button className='w-full'>Archive</Button>
                </div>
              }
            >
              <IconButton
                iconProps={{ name: 'common/notification', className: 'size-4' }}
              />
            </Dropdown>

            <Button variant='light'>Logout</Button>
          </div>
        </div>
      </header>

      <div className='flex gap-x-4 relative h-full pt-14'>
        <aside
          ref={sideBarRef}
          data-visible={visibleSidebar}
          className='bg-bg peer justify-start overflow-y-auto items-start transition-transform group duration-300 border-r data-[visible=false]:-translate-x-full border-border flex fixed z-[950] bottom-0 top-14 left-0 w-[300px]'
        >
          <div className='flex p-4 flex-col gap-2.5 w-full'>
            {ROUTES.map((el) => {
              const isActivePage = pathname.startsWith(el.path);

              return (
                <div key={el.path}>
                  {el.forms && (
                    <span className='text-sm block mb-2.5 font-medium'>
                      Form Elements
                    </span>
                  )}

                  <Button
                    {...(isActivePage && { variant: 'light' })}
                    key={el.path}
                    href={el.path}
                    className='w-full'
                  >
                    {el.title}
                  </Button>
                </div>
              );
            })}
          </div>
        </aside>

        <div className='h-full w-full transition-all duration-300 peer-data-[visible=false]:pl-0 flex flex-col lg:pl-[300px]'>
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
