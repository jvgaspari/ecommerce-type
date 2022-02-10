import { Badge, Drawer, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UsuarioLogadoContext } from "../../shared/contexts";
import { ICartItem } from "../../shared/interfaces";
import { ApiException } from "../../shared/services/api/ApiException";
import { CartsService } from "../../shared/services/api/carts/CartsService";
import { StyledButton, Wrapper } from "./styles";
import { AddShoppingCart } from '@mui/icons-material';
import Cart from "../../shared/components/Cart";
import Item from "../../shared/components/Item";

export const Home = () => {

    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);

    const [products, setProducts] = useState<ICartItem[]>([])
    const [cartItems, setCartItems] = useState([] as ICartItem[]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        CartsService.getAll()
            .then((result) => {
                if(result instanceof ApiException){
                    alert(result.message);
                } else {
                    setProducts(result);
                    console.log(result);
                }
            })
    }, [products]);

    const getTotalItems = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: ICartItem) => {
        setCartItems(prev => {
          // 1. Is the item already added in the cart?
          const isItemInCart = prev.find(item => item.id === clickedItem.id);
    
          if (isItemInCart) {
            return prev.map(item =>
              item.id === clickedItem.id
                ? { ...item, amount: item.amount + 1 }
                : item
            );
          }
          // First time the item is added
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

    console.log('products', products)

    return (
        <Wrapper>
            <p>Bem-vindo à Home</p>
            <p>{nomeDoUsuario}</p>
            <Link to='/sobre'>Click me!</Link>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
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