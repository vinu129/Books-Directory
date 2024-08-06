import {
  Flex,
  Image,
  Input,
  MultiSelect,
  rem,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardUI from "../../shared/component/CardUI";
import { debounce } from "../../shared/utility/function/Function";
import NoRecordsFound from "./../../../public/NoRecordFound.png";
import SkeletonView from "./components/SkeletonView";
import { IBooks } from "./utility/models/books.model";
import {
  useGetBooksQuery,
  useGetFilterDropdownDataQuery,
} from "./utility/services/books.service";
import PaginationUI from "../../shared/component/PaginationUI";

function Bookdirectory() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [authors, setAuthor] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const itemsPerPage: number = 12;
  const { data: BookdirectoryData, isFetching } = useGetBooksQuery({
    pageNumber: currentPage,
    limit: itemsPerPage,
    search: searchText,
    status,
    authors,
    categories,
    isFavorite: "",
  });

  const { data: filterDropdownData } = useGetFilterDropdownDataQuery();
  const [booksData, setBooksData] = useState<IBooks[]>();
  const [statusData, setStatusData] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<string[]>([]);
  const [authorData, setAuthorData] = useState<string[]>([]);

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  function handleStatusChange(value: string | null) {
    if (!value) {
      setStatus("");
    } else {
      setStatus(value);
    }
  }

  function handleAuthorChange(value: string[]) {
    setAuthor(value);
  }

  function handleCategoryChange(value: string[]) {
    setCategories(value);
  }

  useEffect(() => {
    if (BookdirectoryData) {
      setBooksData(BookdirectoryData.data.books);
      setTotalPages(Math.ceil(BookdirectoryData.totalCount / itemsPerPage));
    }
  }, [BookdirectoryData]);

  useEffect(() => {
    if (filterDropdownData) {
      setStatusData(filterDropdownData.status);
      setCategoryData(filterDropdownData.categories);
      setAuthorData(filterDropdownData.authors);
    }
  }, [filterDropdownData]);

  return (
    <Flex h={"100%"} mb={20} direction={"column"} align={"center"}>
      <Flex gap={10} w={"100%"} mb={10} align={"center"} justify={"flex-end"}>
        <Select
          placeholder="Select Status"
          clearable
          onChange={(e) => {
            handleStatusChange(e);
          }}
          data={statusData}
          w={250}
        />
        <MultiSelect
          clearable
          placeholder="Select Category"
          data={categoryData}
          searchable
          onChange={(e) => {
            handleCategoryChange(e);
          }}
          w={250}
        />
        <MultiSelect
          clearable
          placeholder="Select Author"
          data={authorData}
          w={250}
          searchable
          onChange={(e) => {
            handleAuthorChange(e);
          }}
          comboboxProps={{ width: 200, position: "bottom-start" }}
        />
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
                to={`book-details/${book._id}`}
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

export default Bookdirectory;
