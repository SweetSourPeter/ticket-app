import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function SignIn({ handleLogin, setRegistering }) {
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      setAccount: data.get("account"),
      setPassword: data.get("password"),
      account: data.get("account"),
      password: data.get("password"),
    });
    handleLogin(data.get("account"), data.get("password"));
  };

  const handleRegisterClick = () => {
    // Assuming setRegistering is a function
    setRegistering(true);
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
            用户登录
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
              autoComplete="current-password"
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Button type="submit" variant="contained">
                登录
              </Button>
              <Button type="reset" variant="contained">
                清除
              </Button>
              <Button type="button" variant="contained" onClick={handleRegisterClick}>
                注册
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
