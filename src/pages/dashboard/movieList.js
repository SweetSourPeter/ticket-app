// Your component file where you want to use the movie list
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MovieListItem from "../../utils/movieListItem";
import Button from "@mui/material/Button";
import { Input } from "@mui/base/Input";

const movieList = [
  new MovieListItem(1, "Theater A", "Movie 1", "2022-11-15 15:30:00", 50, 10),
  new MovieListItem(2, "Theater B", "Movie 2", "2022-11-15 18:00:00", 30, 12),
];

export default function MovieListTable() {
  const [value, setValue] = React.useState(1);
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
          {movieList.map(
            (movie) => (
              console.log("movie", movie),
              (
                <TableRow
                  key={movie.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {movie.id}
                  </TableCell>
                  <TableCell align="left">{movie.theaterName}</TableCell>
                  <TableCell align="left">{movie.movieName}</TableCell>
                  <TableCell align="left">{movie.showTime}</TableCell>
                  <TableCell align="left">{movie.remainingTickets}</TableCell>
                  <TableCell align="left">{movie.ticketPrice}</TableCell>
                  <TableCell align="left">
                    <input class="MuiInput-input" type="number"/>
                  </TableCell>
                  <TableCell align="left">
                    <Button variant="contained">订票</Button>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
