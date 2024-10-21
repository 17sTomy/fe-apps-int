import React, { useState } from 'react';

export const AdminPage = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  
  const handleCreateProduct = () => {
    // FALTA AL LOGICA PARA LLAMAR AL ENDPOINT DE CREAR PRODUCTO
    console.log('Producto creado:', { productName, productDescription, productPrice, productStock });
  };

  return (
    <div>
      <h1>Administración de Productos</h1>
      <div>
        <h2>Crear Producto</h2>
        <input 
          type="text" 
          placeholder="Nombre del producto" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Descripción" 
          value={productDescription} 
          onChange={(e) => setProductDescription(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Precio" 
          value={productPrice} 
          onChange={(e) => setProductPrice(Number(e.target.value))} 
        />
        <input 
          type="number" 
          placeholder="Stock" 
          value={productStock} 
          onChange={(e) => setProductStock(Number(e.target.value))} 
        />
        <button onClick={handleCreateProduct}>Crear Producto</button>
      </div>
      <div>
        <h2>Eliminar Producto</h2>
        {/* FALTA LA LÓGICA PARA ELIMINAR PRODUCTOS */}
      </div>
    </div>
  );
};