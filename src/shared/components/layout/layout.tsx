import { PropsWithChildren, useEffect, useRef } from 'react';
import { Button } from '../button/button.tsx';
import { ROUTES } from '../../constants/routes.tsx';
import { useLocalStorage, useOnClickOutside, useScreen } from 'usehooks-ts';
import { IconButton } from '../icon-button/icon-button.tsx';
import { useLocation } from 'react-router-dom';

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
    if (screenWidth < 1024) {
      hideSidebar();
    }
  }, [pathname, screenWidth]);

  return (
    <div className=' h-full'>
      <header className='bg-bg border-b border-border z-[955] fixed h-14 inset-x-0 backdrop-blur-md'>
        <div className='flex-between h-full px-4'>
          <IconButton
            onClick={toggleSidebar}
            iconProps={{ name: 'common/collapse', className: 'min-size-6' }}
          />

          <Button variant='light'>Logout</Button>
        </div>
      </header>

      <div className='flex gap-x-4 relative h-full pt-14'>
        <aside
          ref={sideBarRef}
          data-visible={visibleSidebar}
          className='bg-bg peer justify-start overflow-y-auto items-start transition-transform group duration-300 border-r data-[visible=false]:-translate-x-full border-border flex fixed z-[950] bottom-0 top-14 left-0 h-screen w-[300px]'
        >
          <div className='flex p-4 flex-col gap-2.5 w-full'>
            {ROUTES.map((el) => {
              const isActivePage = pathname.startsWith(el.path);

              return (
                <div>
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
