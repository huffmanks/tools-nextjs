import { Skeleton } from "@mui/material";

export type SkellyType = "text" | "input" | "card";

interface SkellyProps {
  type: SkellyType;
}

export default function Skelly({ type }: SkellyProps) {
  const styles = {
    text: {
      width: 250,
      height: 20,
      marginBottom: 3,
      borderRadius: 4,
    },
    input: {
      width: "100%",
      height: 56,
      borderRadius: 1,
    },
    card: {
      width: 300,
      height: 128,
      borderRadius: 1,
    },
  };

  return <Skeleton animation="wave" variant="rectangular" sx={styles[type]} />;
}
