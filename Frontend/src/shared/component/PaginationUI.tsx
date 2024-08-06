import { Pagination } from "@mantine/core";

interface IProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

function PaginationUI({ setCurrentPage, currentPage, totalPages }: IProps) {
  function setNextPage() {
    setCurrentPage(currentPage + 1);
  }
  function setPreviousPage() {
    setCurrentPage(currentPage - 1);
  }
  return (
    <Pagination
      mt={"auto"}
      mb={20}
      size={"lg"}
      withEdges
      total={totalPages}
      onNextPage={setNextPage}
      onPreviousPage={setPreviousPage}
      onChange={setCurrentPage}
    />
  );
}

export default PaginationUI;
