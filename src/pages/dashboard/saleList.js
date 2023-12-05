// Your component file where you want to use the sales list
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import SalesListItem from "../../utils/salesListItem";
// import {getSales} from "../../services/sales";

// const salesData = [
//   new SalesListItem(1, "Session 1", "Movie A", "2022-11-12 15:15:15", 20, 300),
//   // Add more SalesListItem instances as needed
// ];
const BASE_URL = 'http://localhost:8080/api/sales/all';

async function getSales() {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    if (response.ok) {
      const sales = await response.json();
      return sales;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch sales');
    }
  } catch (error) {
    console.error('Error fetching sales:', error.message);
    throw error;
  }
}

export default function SalesList() {
  const [salesData, setSalesData] = React.useState([]);

  React.useEffect(() => {
    // Fetch sales data when the component mounts
    getSales()
      .then((fetchedSales) => setSalesData(fetchedSales))
      .catch((error) => console.error("Error fetching sales:", error.message));
  }, []);
  // console.log("salesData: ", salesData);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sales table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">场次</TableCell>
            <TableCell align="left">电影名称</TableCell>
            <TableCell align="left">放映时间</TableCell>
            <TableCell align="left">销售数量</TableCell>
            <TableCell align="left">销售金额</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.map((salesItem) => (
            console.log("salesItem: ", salesItem),
            <TableRow
              key={salesItem.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {salesItem.id}
              </TableCell>
              <TableCell align="left">{salesItem.showCount}</TableCell>
              <TableCell align="left">{salesItem.movieName}</TableCell>
              <TableCell align="left">{salesItem.showTime}</TableCell>
              <TableCell align="left">{salesItem.saleCount}</TableCell>
              <TableCell align="left">{salesItem.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
