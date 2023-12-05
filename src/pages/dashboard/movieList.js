import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MovieListItem from "../../utils/movieListItem";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { getAllMovies } from "../../services/movies";
// orders.js

const BASE_URL = "http://localhost:8080/api/orders/purchase";

async function makePurchase(purchaseData) {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        "price": 100.0,            // Replace with the actual ticket price
        "ticketCount": 2,          // Replace with the actual number of tickets to purchase
        "id": "100",                 // Replace with the movie ID
        "showTime": "2023-01-10T09:10:00"  // Replace with the actual show time of the movie
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Check if the response is valid JSON, if not, handle the error differently
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to make purchase");
      } catch (jsonError) {
        // If parsing JSON fails, handle the error using the response text
        throw new Error(response.statusText || "Failed to make purchase");
      }
    }
  } catch (error) {
    console.error("Error making purchase:", error.message);
    throw error;
  }
}

export default function MovieListTable() {
  const [movies, setMovies] = useState([]);
  // const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [movieTicketCounts, setMovieTicketCounts] = useState({});

  useEffect(() => {
    // Fetch movies when the component mounts
    getAllMovies(localStorage.getItem("token"))
      .then((fetchedMovies) => {
        setMovies(fetchedMovies);
        console.log("fetchedMovies: ", fetchedMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error.message));
  }, []);

  const handlePurchase = async (movieId, price, showTime) => {
    const ticketCount = movieTicketCounts[movieId] || 1;
    try {
      const purchaseData = {
        price: price,
        ticketCount: ticketCount,
        id: movieId,
        showTime: showTime,
      };
      console.log("purchaseData: ", purchaseData);
      // Make the purchase
      const result = await makePurchase(
        purchaseData
      );
      console.log("Purchase successful:", result);

      // Update the movie list after the purchase (you may need to refetch the movies)
      const updatedMovies = await getAllMovies(localStorage.getItem("token"));
      setMovies(updatedMovies);
    } catch (error) {
      console.error("Error making purchase:", error.message);
    }
  };

  // console.log("movies: ", movies);
  // console.log("token ", localStorage.getItem("token").toString());
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">剧院名称</TableCell>
            <TableCell align="left">电影名称</TableCell>
            <TableCell align="left">放映时间</TableCell>
            <TableCell align="left">余票</TableCell>
            <TableCell align="left">票价</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow
              key={movie.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {movie.id}
              </TableCell>
              <TableCell align="left">{movie.location}</TableCell>
              <TableCell align="left">{movie.movieName}</TableCell>
              <TableCell align="left">{movie.showTime}</TableCell>
              <TableCell align="left">{movie.availableSeats}</TableCell>
              <TableCell align="left">{movie.ticketPrice}</TableCell>
              <TableCell align="left">
              <Input
                  type="number"
                  value={movieTicketCounts[movie.id] || 0}
                  onChange={(e) =>
                    setMovieTicketCounts((prevCounts) => ({
                      ...prevCounts,
                      [movie.id]: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                />
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  onClick={() =>
                    handlePurchase(movie.id, movie.ticketPrice, movie.showTime)
                  }
                >
                  订票
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
