import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import '../CartWidget/cartWidget.scss';
import Box from '@mui/material/Box';

export default function CartWidget() {
  return (
    <Box className="cart-widget">
      <Badge badgeContent={4} color="error" className="badge">
        <ShoppingCartIcon className="cart-icon" />
      </Badge>
    </Box>
  );
}
