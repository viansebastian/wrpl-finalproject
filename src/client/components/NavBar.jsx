import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, ListItemIcon } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { CartContext } from "../CartContext";
import { CartProduct } from "./CartProduct";
import { Drawer, Button } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import gamenebulalogo from "../../Assets/Logo/gamenebulalogo.png";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//conditional render login/register if user is logged out
//don't render login/register is user is logged out
//render dashboard/logout if user is logged in
const guestData = [
  { name: "Home", link: "/", icon: <HomeIcon /> },
  { name: "Store", link: "/store", icon: <ShoppingBagIcon /> },
  { name: "Games", link: "/store#games", icon: <SportsEsportsIcon /> },
  { name: "Hardware", link: "/store#hardware", icon: <DevicesIcon /> },
  { name: "Merch", link: "/store#merch", icon: <CheckroomIcon /> },
];

const loggedInData = [
  { name: "Home", link: "/", icon: <HomeIcon /> },
  { name: "Store", link: "/store", icon: <ShoppingBagIcon /> },
  { name: "Games", link: "/store#games", icon: <SportsEsportsIcon /> },
  { name: "Hardware", link: "/store#hardware", icon: <DevicesIcon /> },
  { name: "Merch", link: "/store#merch", icon: <CheckroomIcon /> },
  { name: "Dashboard", link: "/dashboard", icon: <PersonIcon /> },
];

const NavBar = ({ token, setToken, admin, setAdmin, user, setUser }) => {
  //localCart used solely to re-render Navbar if there is items in localStorage
  
  const localCart = localStorage.getItem(`${user.id} cart`);
  useEffect(() => {
    async function renderNavbar(token, user) {
      if (token) {
        setToken(token);
      } else {
        setToken(null);
      }
      if (user.isadmin) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
    renderNavbar(token, user);
  }, [token, user, localCart]);


  const cart = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkout = async () => {
    await fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); //Forward uset to Stripe
        }
      });
  };
  console.log(cart.items);
  //line that handles the number in navbar for cart items
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const [cartModal, setCartModal] = useState(false);
  const handleShowCart = () => setCartModal(true);
  const handleCloseCart = () => setCartModal(false);

  const getList = (data) => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <Link to={item.link}>
          <ListItem key={index}>
            <ListItemIcon color={"primary"}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} sx={{ color: "text.primary" }} />
          </ListItem>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <div className="navbar">
        <IconButton
          onClick={() => setOpen(true)}
          aria-label="Menu"
          color="primary"
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
          {!token && getList(guestData)}
          {token && getList(loggedInData)}
        </Drawer>

        <Link to="/">
          <IconButton aria-label="Home" color="primary">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/">
          <img src={gamenebulalogo} className="logoImage" />
        </Link>

        <FormControl
          sx={{
            m: 1,
            width: "1",
            border: "1px solid red",
            borderRadius: "5px",
            boxShadow: "0px 0px 15px red",
          }}
        >
          <TextField
            InputLabelProps={{
              sx: { color: "red" },
            }}
            placeholder="Search Products"
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
            sx={{ input: { color: "white" } }}
            size="small"
            variant="outlined"
          />
        </FormControl>

        <IconButton onClick={handleShowCart} color="primary">
          <Badge badgeContent={productsCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        {!token && (
          <>
            <Link to="/login">
              <IconButton aria-label="Log in" color="primary">
                <LoginIcon />
              </IconButton>
            </Link>
          </>
        )}

        {/* Logged in links */}
        {token && admin && (
          <>
            <Link to="/dashboard">
              <IconButton aria-label="Dashboard" color="primary">
                <AccountBoxIcon />
              </IconButton>
            </Link>
          </>
        )}
        {token && (
          <>
            <Link
              to="/logout"
              onClick={() => {
                setToken(null);
                setUser({});
              }}
            >
              <IconButton aria-label="Log out" color="primary">
                <LogoutIcon />
              </IconButton>
            </Link>
          </>
        )}

        <Modal
          sx={{
            overflow: "scroll",
            position: "fixed",
            // top: '6.3%',
            // left: '90%',
            // marginLeft: 400,
            width: 400,
            height: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: `24`,
          }}
          open={cartModal}
          onClose={handleCloseCart}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="cartModal"
        >
          <>
            <Box sx={{ bgcolor: "white", p: 2, minHeight: 500 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Cart
                <IconButton
                  aria-label="close cart"
                  color="primary"
                  onClick={handleCloseCart}
                  sx={{
                    float: "right",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {productsCount > 0 ? (
                  <>
                    {cart.items.map((currentProduct, idx) => (
                      <CartProduct
                        key={idx}
                        stripe_id={currentProduct.stripe_id}
                        quantity={currentProduct.quantity}
                        price={currentProduct.price}
                        name={currentProduct.productName}
                      />
                    ))}

                    <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>
                    <Button
                      variant="contained"
                      onClick={checkout}
                      color="success"
                    >
                      Check out
                    </Button>
                  </>
                ) : (
                  <>
                    <h1>No items in cart. 😔</h1>
                    <hr />
                    <h1>Total: $0.00</h1>
                    <Button
                      variant="contained"
                      onClick={checkout}
                      color="success"
                      disabled={true}
                    >
                      Check out
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </>
        </Modal>

        {/* <Link to="/games">Games</Link>
      <Link to="/hardware">Hardware</Link>
      <Link to="/merch">Merchandise</Link> */}
      </div>
    </>
  );
};

export default NavBar;