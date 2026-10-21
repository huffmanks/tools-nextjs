import { Fragment } from "react";

import { textFormatterCards, TextFormatterValues } from "./constants";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";

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
            <Grid item lg={3} md={6} xs={12}>
              <Card variant="outlined">
                <CardHeader
                  title={card.label}
                  action={
                    <>
                      {values?.output && (
                        <IconButton aria-label="copy value to clipboard" onClick={() => handleCopy(card.name)}>
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
