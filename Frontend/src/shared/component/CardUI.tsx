import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import noImageFound from "./../../../public/no-img-found.png";

import { IBooks } from "../../pages/Directory/utility/models/books.model";
import { useUpdateBookMutation } from "../../pages/Directory/utility/services/books.service";

function CardUI({ data }: { data: IBooks }) {
  const [updateBook] = useUpdateBookMutation();
  function handleFavorite(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    book: IBooks
  ) {
    e.preventDefault();
    // If isFavorite TRUE then set if FALSE
    const tempVal = { ...book, isFavorite: !book.isFavorite };

    updateBook({ ...tempVal, _id: tempVal._id });
  }
  return (
    <Flex
      h={"100%"}
      p={14}
      direction={"column"}
      align={"center"}
      bg={"white"}
      style={{ border: "1px solid #e7ebe9", borderRadius: "8px" }}
      pos={"relative"}
    >
      <Flex w={"100%"} align={"start"} justify={"space-between"}>
        <Badge
          variant="light"
          size="sm"
          radius="sm"
          color={data.status === "PUBLISH" ? "green" : "blue"}
        >
          {data.status}
        </Badge>
        <UnstyledButton
          onClick={(e) => handleFavorite(e, data)}
          className="add-to-fav-btn"
        >
          {data.isFavorite == true ? (
            <IconHeartFilled size={20} color="RED" stroke={1} />
          ) : (
            <IconHeart size={20} color="Grey" stroke={1} />
          )}
        </UnstyledButton>
      </Flex>

      <Box mt={16} w={150} h={200}>
        <Image
          w={"100%"}
          src={data.thumbnailUrl ? data.thumbnailUrl : noImageFound}
          alt="Norway"
        />
      </Box>
      <Title c={"black"} order={6} ta="center">
        {data.title}
      </Title>
      {/* <Group gap={5} mt={5}>
<Text fz={12} c="dimmed">
  Author :
</Text>
<Text fz={12}>{data.authors[0]}</Text>
</Group> */}
      <Group gap={5} mt={2}>
        <Text fz={12} c="dimmed">
          Published on :
        </Text>
        <Text c={"black"} fz={12}>
          {data?.publishedDate
            ? format(parseISO(data.publishedDate), "dd-MMM-yyyy")
            : "N/A"}
        </Text>
      </Group>
    </Flex>
  );
}

export default CardUI;
