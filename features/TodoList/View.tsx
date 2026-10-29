import { Box, Stack, Typography } from "@mui/material";

import { useLists } from "@/hooks/useLists";

import ListCard from "@/features/TodoList/ListCard";

import OutputMessage from "@/components/common/OutputMessage";

const View = () => {
  const { lists } = useLists();

  return (
    <Box sx={{ paddingBlockEnd: 8 }}>
      <Typography
        component="p"
        sx={{
          marginBlockEnd: 5,
        }}>
        {lists?.length ? "View or edit a list below." : "Created lists will appear here."}
      </Typography>

      <ListCard />

      {lists?.length > 0 ? (
        <>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              gap: 3,
              flexWrap: "wrap",
            }}>
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </Stack>
        </>
      ) : (
        <OutputMessage message="No lists to show." />
      )}
    </Box>
  );
};

export default View;
