import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import User from "../utils/user"

const defaultTheme = createTheme();

export default function SignUp() {
  const [user, setUser] = React.useState(new User());
  console.log(user.gender);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setUser({
      ...user,
      account: data.get('account'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      nickname: data.get('nickname'),
      email: data.get('email'),
      phone: data.get('phone'),
    });

    console.log(user);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setUser({
        ...user,
        gender: event.target.value,
      });
    console.log(user.gender);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            用户注册
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
              autoComplete="account"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="确认密码"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="nickname"
              label="昵称"
              id="nickname"
              autoComplete="nickname"
            />
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={user.gender}
                onChange={handleChange}
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel value="male" control={<Radio />} label="男" />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="女"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="邮箱"
              type="email"
              id="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="电话"
              id="phone"
              autoComplete="tel"
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Button type="button" variant="contained">
                返回
              </Button>
              <Button type="submit" variant="contained">
                注册
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
