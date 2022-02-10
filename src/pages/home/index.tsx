import { Badge, Box, Drawer, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UsuarioLogadoContext } from "../../shared/contexts";
import { ICartItem } from "../../shared/interfaces";
import { ApiException } from "../../shared/services/api/ApiException";
import { CartsService } from "../../shared/services/api/carts/CartsService";
import { StyledButton, Wrapper } from "./styles";
import { AddShoppingCart, Dashboard } from '@mui/icons-material';
import Cart from "../../shared/components/Cart";
import Item from "../../shared/components/Item";

export const Home = () => {

    const { modal, setModal } = useContext(UsuarioLogadoContext);

    const [products, setProducts] = useState<ICartItem[]>([])
    const [cartItems, setCartItems] = useState([] as ICartItem[]);

    useEffect(() => {
        CartsService.getAll()
            .then((result) => {
                if(result instanceof ApiException){
                    alert(result.message);
                } else {
                    setProducts(result);
                }
            })
    }, []);

    const getTotalItems = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: ICartItem) => {
        setCartItems(prev => {

          const isItemInCart = prev.find(item => item.id === clickedItem.id);
    
          if (isItemInCart) {
            return prev.map(item =>
              item.id === clickedItem.id
                ? { ...item, amount: item.amount + 1 }
                : item
            );
          }
          
          return [...prev, { ...clickedItem, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
          prev.reduce((ack, item) => {
            if (item.id === id) {
              if (item.amount === 1) return ack;
              return [...ack, { ...item, amount: item.amount - 1 }];
            } else {
              return [...ack, item];
            }
          }, [] as ICartItem[])
        );
      };

    return (
        <Wrapper>
            <Box display='flex' justifyContent='space-evenly' alignItems='center'>
              <p>Welcome Home</p>
              {/* <p>{nomeDoUsuario}</p> */}
              <Box display='flex' justifyContent='space-evenly' alignItems='center'>
                <Link to='/sobre'><Dashboard/></Link>
                Go to Dashboard
              </Box>
            </Box>
            <Drawer anchor='right' open={modal} onClose={() => setModal(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setModal(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCart />
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {products?.map(item => (
                <Grid item key={item.id} xs={12} sm={4}>
                    <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}