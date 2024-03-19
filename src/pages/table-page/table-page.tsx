import { Table, TableColumn } from '../../shared/components/table/table.tsx';
import { Button } from '../../shared/components/button/button.tsx';

type Data = { id: number; name: string; surname: string };
export const TablePage = () => {
  const columns: TableColumn<Data>[] = [
    {
      dataKey: 'id',
      title: 'Identify',
      sortKey: 'id',
    },
    {
      dataKey: 'name',
      title: 'Name',
    },
    {
      dataKey: 'surname',
      title: 'Surname',
    },
  ];

  const columnsWithRender: TableColumn<Data>[] = [
    {
      dataKey: 'id',
      title: 'Render',
      render: (v, item, index) => (
        <span>
          rowIndex: {index}, itemName:{item.name}, ItemId:{v}
        </span>
      ),
    },
    {
      dataKey: 'id',
      title: 'Identify',
    },
    {
      dataKey: 'name',
      title: 'Name',
    },
    {
      dataKey: 'surname',
      title: 'Surname',
    },
  ];

  const data = [
    { id: 1, name: 'Joe', surname: 'Doe' },
    { id: 2, name: 'Joe2', surname: 'Doe2' },
    { id: 3, name: 'Joe3', surname: 'Doe3' },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <Table columns={columns} data={data} />

      <Table
        cardProps={{
          title: 'Table with Card',
          extra: <Button variant='light'>Create</Button>,
        }}
        columns={columns}
        data={data}
      />

      <Table
        cardProps={{
          title: 'Table with CustomRenderRow',
        }}
        columns={columnsWithRender}
        data={data}
      />

      <Table
        cardProps={{
          title: 'Table with Pagination And RowClick',
        }}
        onRowClick={(item, index) => alert(JSON.stringify({ item, index }))}
        columns={columns}
        data={data}
        pagination={{
          lastPage: 20,
          onChange: (p) => console.log(p),
          currentPage: 1,
        }}
      />

      <Table
        cardProps={{
          title: 'Table with Spinner',
        }}
        columns={columns}
        data={data}
        isLoading
      />

      <Table
        cardProps={{
          title: 'Table with Summary',
        }}
        columns={columns}
        data={data}
        summary={
          <div className='text-sm'>
            <span>entries shown: </span>
            <span>3/3</span>
          </div>
        }
      />
    </div>
  );
};
