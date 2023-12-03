// Your component file where you want to use the customized list
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyOrdersListItem from '../../utils/myOrdersListItem';
const orders = [
  new MyOrdersListItem(1, '1242354145', 'Star Wars', '2022-11-12 13:13:13', '2022-11-12 13:13:13', 1, 45),
  new MyOrdersListItem(1, '1242354145', 'Star Wars', '2022-11-12 13:13:13', '2022-11-12 13:13:13', 1, 45),
  new MyOrdersListItem(1, '1242354145', 'Star Wars', '2022-11-12 13:13:13', '2022-11-12 13:13:13', 1, 45),
  new MyOrdersListItem(1, '1242354145', 'Star Wars', '2022-11-12 13:13:13', '2022-11-12 13:13:13', 1, 45),
  // Add more OrderListItem instances as needed
];

export default function MyOrders() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">订单编号</TableCell>
            <TableCell align="left">电影名称</TableCell>
            <TableCell align="left">放映时间</TableCell>
            <TableCell align="left">购票时间</TableCell>
            <TableCell align="left">购票数量</TableCell>
            <TableCell align="left">金额</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="left">{order.orderNumber}</TableCell>
              <TableCell align="left">{order.movieName}</TableCell>
              <TableCell align="left">{order.showTime}</TableCell>
              <TableCell align="left">{order.purchaseTime}</TableCell>
              <TableCell align="left">{order.ticketQuantity}</TableCell>
              <TableCell align="left">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
