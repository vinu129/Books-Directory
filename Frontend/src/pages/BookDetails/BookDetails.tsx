import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../Directory/utility/services/books.service";
import { IBooks } from "../Directory/utility/models/books.model";
import {
  Badge,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import noImageFound from "./../../../public/no-img-found.png";
import { format, parseISO } from "date-fns";

function BookDetails() {
  const { id } = useParams();
  const { data: bookDetails } = useGetBookByIdQuery(id);
  const [bookData, setBookData] = useState<IBooks>();

  useEffect(() => {
    if (bookDetails) {
      setBookData(bookDetails);
    }
  }, [bookDetails, bookData]);
  return (
    <Container>
      <Grid p={22} style={{ borderRadius: "8px" }} bg={"white"}>
        <Grid.Col span={5}>
          {/* <Flex h={"100%"} align={"flex-start"} justify={"center"}> */}
          <Image
            pe={22}
            w={350}
            src={bookData?.thumbnailUrl ? bookData.thumbnailUrl : noImageFound}
            alt="Norway"
          />
          {/* </Flex> */}
        </Grid.Col>
        <Grid.Col span={7} ps={20} style={{ borderLeft: "1px solid #d5d8d7" }}>
          <Title c={"black"} order={2} ta="left">
            {bookData?.title}
          </Title>
          <Group c={"dimmed"} mt={6} gap={5}>
            <Text lh={1} fz={14}>
              By {bookData?.authors[0]}
            </Text>
            <Divider size={"md"} orientation="vertical" />
            <Text lh={1} fz={14}>
              {bookData?.publishedDate
                ? format(parseISO(bookData?.publishedDate), "dd MMM yyyy")
                : "N/A"}
            </Text>
          </Group>
          <Group my={16}>
            <Text>Total Pages:</Text>
            <Text fw={"bold"}> {bookData?.pageCount}</Text>
          </Group>

          <Group mt={12}>
            {bookData?.categories.map((category) => {
              return (
                <Badge
                  key={category}
                  variant="gradient"
                  gradient={{ from: "violet", to: "grape", deg: 90 }}
                  size="lg"
                  radius="lg"
                >
                  {category}
                </Badge>
              );
            })}
          </Group>
          <Text
            fz={14}
            lh={1.8}
            mt={18}
            c={bookData?.shortDescription ? "black" : "dimmed"}
          >
            {bookData?.shortDescription
              ? bookData?.shortDescription
              : "No Description Available"}
          </Text>
          <Group mt={10} gap={5}>
            <Text fz={14}>- By</Text>
            <Text fw={"bold"} fz={14}>
              {bookData?.authors.join(", ")}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default BookDetails;
