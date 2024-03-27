import { Button } from '../../shared/components/button/button.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { Collapse } from '../../shared/components/collapse/collapse.tsx';

export const CollapsePage = () => {
  return (
    <Card title='Collapse'>
      <Collapse>
        <Collapse.Item
          extra={<Button variant='light'>Extra</Button>}
          header='Header1'
        >
          Content1
        </Collapse.Item>

        <Collapse.Item header='Header1'>Content2</Collapse.Item>

        <Collapse.Item opened header='Header2'>
          Что такое Lorem Ipsum? Lorem Ipsum - это текст-"рыба", часто
          используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
          "рыбой" для текстов на латинице с начала XVI века. В то время некий
          безымянный печатник создал большую коллекцию размеров и форм шрифтов,
          используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только
          успешно пережил без заметных изменений пять веков, но и перешагнул в
          электронный дизайн. Его популяризации в новое время послужили
          публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в
          более недавнее время, программы электронной вёрстки типа Aldus
          PageMaker, в шаблонах которых используется Lorem Ipsum.
        </Collapse.Item>
      </Collapse>
    </Card>
  );
};
