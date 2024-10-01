import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import "../CartWidget/cartWidget.css"

export default function CartWidget() {
  return (
    <Badge badgeContent={4} color="error" className='badge'>
      <ShoppingCartIcon className='cart-icon' />
    </Badge>
  );
};