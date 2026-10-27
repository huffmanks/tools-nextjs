import { Fragment } from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";

import { textFormatterCards } from "@/features/TextFormatter/constants";
import type { TextFormatterValues } from "@/features/TextFormatter/types";

interface CardsProps {
  values: TextFormatterValues;
  checkedCards: string[];
  handleCopy: (name: string) => void;
}

const Cards = ({ values, checkedCards, handleCopy }: CardsProps) => {
  return (
    <>
      {textFormatterCards.map((card) => (
        <Fragment key={card.name}>
          {checkedCards.includes(card.name) && (
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Card variant="outlined">
                <CardHeader
                  title={card.label}
                  action={
                    <>
                      {values?.output && (
                        <IconButton
                          aria-label="copy value to clipboard"
                          onClick={() => handleCopy(card.name)}>
                          <ContentCopyIcon />
                        </IconButton>
                      )}
                    </>
                  }
                />

                {values?.output && (
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {values[card.name]}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default Cards;
