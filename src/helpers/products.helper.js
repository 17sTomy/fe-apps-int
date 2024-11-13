export function validateCreateProductData({
  name = '',
  director = '',
  price = '',
  stock = '',
  file = '',
}) {
  let error;

  console.warn(file);
  if (!name.trim()) error = `Completar campo "Título"`;
  else if (!String(director).trim()) error = `Completar campo "Director"`;
  else if (!String(price).trim() || Number(price) < 0) error = 'Ingresar un precio válido';
  else if (!String(stock).trim() || Number(stock) < 0) error = 'Ingresar un stock válido';
  else if (!file) error = 'Adjuntar la imágen de portada';
  else return;

  throw new Error(error);
}

export function validateUpdateProductData({ name = '', price = '', stock = '', mainImage = '' }) {
  let error;

  if (!String(name).trim()) error = `Completar campo "Título"`;
  else if (!String(price).trim() || Number(price) < 0) error = 'Ingresar un precio válido';
  else if (!String(stock).trim() || Number(stock) < 0) error = 'Ingresar un stock válido';
  else if (!String(mainImage).trim()) error = 'Debés subir al menos una imágen';
  else return;

  throw new Error(error);
}
