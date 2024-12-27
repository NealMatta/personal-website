import AllPlaygroundCards from '@/src/components/Playground/AllPlaygroundCards';
import PageHeader from '@/src/components/PageHeader/PageHeader';

export default function Playground() {
  return (
    <>
      <PageHeader
        header={'Code Playground'}
        subHeader={
          'Where ideas take shape and skills grow—exploring, testing, and building for fun'
        }
      />
      <div className="grid gap-4 my-4 grid-cols-1 sm:grid-cols-3 ">
        <AllPlaygroundCards />
      </div>
    </>
  );
}
