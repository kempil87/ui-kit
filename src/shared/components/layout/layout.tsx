import { PropsWithChildren } from 'react';
import { Button } from '../button/button.tsx';
import { ROUTES } from '../../constants/routes.tsx';
import { useLocalStorage } from 'usehooks-ts';
import { IconButton } from '../icon-button/icon-button.tsx';
import { useLocation } from 'react-router-dom';

type Layout = PropsWithChildren;

export const Layout = ({ children }: Layout) => {
  const [visibleSidebar, setVisibleSidebar] = useLocalStorage(
    'sidebar',
    'true'
  );

  const { pathname } = useLocation();

  const toggleSidebar = () =>
    setVisibleSidebar(JSON.stringify(!JSON.parse(visibleSidebar)));

  return (
    <div className=' h-full'>
      <header className='bg-bg border-b border-border z-50 fixed h-14 inset-x-0 backdrop-blur-md'>
        <div className='flex-between h-full px-4'>
          <IconButton
            onClick={toggleSidebar}
            iconProps={{ name: 'common/collapse', className: 'min-size-6' }}
          />

          <Button variant='light'>Выйти</Button>
        </div>
      </header>

      <div className='flex gap-x-4 relative h-full pt-14'>
        <aside
          data-visible={visibleSidebar}
          className='bg-bg peer justify-start overflow-y-auto items-start  transition-transform group duration-300 border-r data-[visible=false]:-translate-x-full border-border flex fixed z-40 bottom-0 top-14 left-0 h-screen w-[300px]'
        >
          <div className='flex p-4 flex-col gap-2.5 w-full'>
            {ROUTES.map((el) => {
              const isActivePage = pathname.startsWith(el.path);

              return (
                <div>
                  {el.forms && (
                    <span className='text-sm block mb-2.5 font-medium'>
                      Forms Elements
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

        <div className='h-full w-full transition-all duration-300 peer-data-[visible=false]:pl-0 flex flex-col pl-[300px]'>
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
