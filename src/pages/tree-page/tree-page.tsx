import { Card } from '../../shared/components/card/card.tsx';
import { Tree, TreeOption } from '../../shared/components/tree/tree.tsx';

const treeOptions: TreeOption[] = [
  {
    label: 'First Element 1.0',
    key: '1.0',
    children: [
      {
        label: 'First Element 1.1',
        key: '1.1',
        children: [
          {
            label: 'First Element 1.1.1',
            key: '1.1.1',
            children: [],
          },
        ],
      },
      {
        label: 'First Element 1.2',
        key: '1.2',
        children: [
          {
            label: 'First Element 1.2.1',
            key: '1.2.1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: 'Second Element 2.0',
    key: '2.0',
    children: [
      {
        label: 'First Element 2.1',
        key: '2.1',
        children: [],
      },
      {
        label: 'Second Element 2.2',
        key: '2.2',
        children: [],
      },
    ],
  },
];

export const TreePage = () => {
  return (
    <Card title='Tree'>
      <Tree options={treeOptions} />
    </Card>
  );
};
