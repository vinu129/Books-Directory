import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../Directory/utility/services/books.service";
import { IBooks } from "../Directory/utility/models/books.model";
import { Flex, Image, Input, rem, SimpleGrid, Text } from "@mantine/core";
import SkeletonView from "../Directory/components/SkeletonView";
import { Link } from "react-router-dom";
import CardUI from "../../shared/component/CardUI";
import PaginationUI from "../../shared/component/PaginationUI";
import NoRecordsFound from "./../../../public/NoRecordFound.png";
import { IconSearch } from "@tabler/icons-react";
import { debounce } from "../../shared/utility/function/Function";

function Favorite() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 12;
  const [searchText, setSearchText] = useState<string>("");
  const { data: BookdirectoryData, isFetching } = useGetBooksQuery({
    pageNumber: currentPage,
    limit: itemsPerPage,
    search: searchText,
    isFavorite: "true",
  });
  const [booksData, setBooksData] = useState<IBooks[]>();

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  useEffect(() => {
    if (BookdirectoryData) {
      setBooksData(BookdirectoryData.data.books);
      setTotalPages(Math.ceil(BookdirectoryData?.totalCount / itemsPerPage));
    }
  }, [BookdirectoryData, booksData]);
  return (
    <Flex h={"100%"} mb={20} direction={"column"} align={"center"}>
      <Flex gap={10} w={"100%"} mb={10} align={"center"} justify={"flex-end"}>
        <Input
          placeholder="Search Book Here..."
          w="350px"
          radius="sm"
          size="sm"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onChange={(e) => debounce(handleSearch, e.target.value)}
        />
      </Flex>
      {isFetching ? (
        <SkeletonView />
      ) : booksData && booksData.length > 0 ? (
        <SimpleGrid
          mt={10}
          mb={20}
          cols={{ base: 1, sm: 4, lg: 6 }}
          spacing={{ base: 6, sm: "md" }}
          verticalSpacing={{ base: 5, sm: "md" }}
        >
          {booksData &&
            booksData.map((book: IBooks) => (
              <Link
                style={{ textDecoration: "none" }}
                key={book._id}
                to={`/book-details/${book._id}`}
              >
                <CardUI data={book} />
              </Link>
            ))}
        </SimpleGrid>
      ) : (
        <Flex
          h={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}
        >
          <Image w={500} src={NoRecordsFound} />
          <Text fz={24} mt={10}>
            No Records Found.
          </Text>
        </Flex>
      )}

      {totalPages > 1 && (
        <PaginationUI
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </Flex>
  );
}

export default Favorite;
