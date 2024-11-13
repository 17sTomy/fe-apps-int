export function validateDataInputs({ name, director, price, stock, mainImage }) {
  let error;

  if (!name.trim()) error = `Completar campo "Título"`;
  else if (!director.trim()) error = `Completar campo "Director"`;
  else if (!price.trim() || Number(price) < 0) error = 'Ingresar un precio válido';
  else if (!stock.trim() || Number(stock) < 0) error = 'Ingresar un stock válido';
  else if (!mainImage.trim()) error = 'Debés subir al menos una imágen';
  else return;

  throw new Error(error);
}
