import { Key, ReactNode, useCallback, useState } from 'react';
import { IconButton } from '../icon-button/icon-button.tsx';
import cn from 'classnames';

export type TreeOption = {
  label: ReactNode;
  key: Key;
  children?: TreeOption[];
};

export interface Tree {
  options: TreeOption[];
}

export const Tree = ({ options }: Tree) => {
  const [openNodes, setOpenNodes] = useState<Set<Key>>(new Set());

  const toggleNode = useCallback((id: Key) => {
    setOpenNodes((prevOpenNodes) => {
      const newOpenNodes = new Set(prevOpenNodes);
      if (newOpenNodes.has(id)) {
        newOpenNodes.delete(id);
      } else {
        newOpenNodes.add(id);
      }
      return newOpenNodes;
    });
  }, []);

  const renderTree = useCallback(
    (elem: TreeOption) => {
      return (
        <div className='space-y-2' key={elem.key}>
          <div
            role='button'
            onClick={() => elem.children?.length && toggleNode(elem.key)}
            className={cn('inline-flex items-center gap-2', {
              'cursor-default': !elem.children?.length,
            })}
          >
            <IconButton
              className={cn('size-5', {
                invisible: !elem.children?.length,
              })}
              iconProps={{
                name: 'common/arrow',
                className: cn('!size-3 transition-all duration-300', {
                  'rotate-180': openNodes.has(elem.key),
                }),
              }}
            />
            {/*<Checkbox*/}
            {/*  className={cn({*/}
            {/*    invisible: !elem.children?.length,*/}
            {/*  })}*/}
            {/*  value={openNodes.has(elem.key)}*/}
            {/*  indeterminate={!!elem.children?.length}*/}
            {/*  onChange={() => toggleNode(elem.key)}*/}
            {/*/>*/}

            <div>{elem.label}</div>
          </div>

          <div
            style={{ height: openNodes.has(elem.key) ? '100%' : 0 }}
            className={cn('pl-4 transition-all duration-300', {
              'opacity-0 pointer-events-none': !openNodes.has(elem.key),
            })}
          >
            {elem.children?.map(renderTree)}
          </div>
        </div>
      );
    },
    [openNodes, toggleNode]
  );

  return (
    <div className='p-4 bg-bg border-border border rounded-md'>
      <div className='space-y-2'>{options.map(renderTree)}</div>
    </div>
  );
};
