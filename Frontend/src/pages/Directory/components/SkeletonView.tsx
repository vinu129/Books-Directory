import { SimpleGrid } from "@mantine/core";
import SkeletonUI from "../../../shared/component/Skeleton";

function SkeletonView() {
  return (
    <SimpleGrid
      w={"100%"}
      cols={{ base: 1, sm: 4, lg: 6 }}
      spacing={{ base: 6, sm: "md" }}
      verticalSpacing={{ base: 5, sm: "md" }}
    >
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
      <SkeletonUI />
    </SimpleGrid>
  );
}

export default SkeletonView;
