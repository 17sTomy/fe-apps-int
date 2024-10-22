import React, { useState } from 'react';
import { createProduct, deleteProduct } from '../../services/productsService';

export const AdminPage = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productIdToDelete, setProductIdToDelete] = useState('');

  const handleCreateProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        // AGREGAR OTROS CAMPOS NECESARIOS
      };
      await createProduct(newProduct);
      alert('Producto creado con éxito');
    } catch (error) {
      console.error('Error creando producto:', error);
      alert('Error al crear el producto');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productIdToDelete);
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error al eliminar el producto');
    }
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
        <input
          type="text"
          placeholder="ID del producto"
          value={productIdToDelete}
          onChange={(e) => setProductIdToDelete(e.target.value)}
        />
        <button onClick={handleDeleteProduct}>Eliminar Producto</button>
      </div>
    </div>
  );
};
