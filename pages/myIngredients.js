import { useState } from "react";
import { useUser } from "../customHooks/userContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomSnackbar from "../components/CustomSnackbar";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { collection } from "firebase/firestore";

import { customAlphabet } from "nanoid";
import { firestore } from "../lib/firebase";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { Chip, Grid } from "@mui/material";

const nanoid = customAlphabet("0123456789", 6);

export default function MyIngredient() {
  const { loadingUser, user } = useUser();
  const [snapshot, loading, error] = useCollectionData(
    collection(firestore, `users/${user?.uid}/ingredients`)
  );

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const IngredientCard = ({ ingredient }) => {
    return (
      <Grid item>
        <Card sx={{ width: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={ingredient.imgURL}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {ingredient.name}
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                {ingredient.weight !== "" && (
                  <Chip label={`Weight: ${ingredient.weight}g`} />
                )}
              </Grid>
              <Grid item>
                {ingredient.volume !== "" && (
                  <Chip label={`Volume: ${ingredient.volume}ml`} />
                )}
              </Grid>
              <Grid item>
                {ingredient.price !== "" && (
                  <Chip label={`Price: $${ingredient.price}`} />
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <CssBaseline />
      <Container sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          {!loading &&
            snapshot.map((ingredient, index) => (
              <IngredientCard key={index} ingredient={ingredient} />
            ))}
        </Grid>
      </Container>
    </>
  );
}
