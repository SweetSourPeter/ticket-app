// Your component file where you want to use the sales list
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SalesListItem from "../../utils/salesListItem";

const salesData = [
  new SalesListItem(1, "Session 1", "Movie A", "2022-11-12 15:15:15", 20, 300),
  // Add more SalesListItem instances as needed
];

export default function SalesList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sales table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">场次</TableCell>
            <TableCell align="right">电影名称</TableCell>
            <TableCell align="right">放映时间</TableCell>
            <TableCell align="right">销售数量</TableCell>
            <TableCell align="right">销售金额</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.map((salesItem) => (
            <TableRow
              key={salesItem.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {salesItem.id}
              </TableCell>
              <TableCell align="right">{salesItem.session}</TableCell>
              <TableCell align="right">{salesItem.movieName}</TableCell>
              <TableCell align="right">{salesItem.showTime}</TableCell>
              <TableCell align="right">{salesItem.salesQuantity}</TableCell>
              <TableCell align="right">{salesItem.salesAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
