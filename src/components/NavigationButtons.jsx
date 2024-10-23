import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BasicButtons({ selectedButton, handleButtonClick }) {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginBottom: 4 }}>
      <Button
        variant={selectedButton === 'todos' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('todos')}
      >
        Todos
      </Button>
      <Button
        variant={selectedButton === 'destacados' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('destacados')}
      >
        Destacados
      </Button>
      <Button
        variant={selectedButton === 'categorias' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('categorias')}
      >
        Categorías
      </Button>
      <Button
        variant={selectedButton === 'vistos' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('vistos')}
      >
        Vistos
      </Button>
    </Stack>
  );
}
