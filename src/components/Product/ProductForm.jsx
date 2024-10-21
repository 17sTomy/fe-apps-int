import { useState } from 'react';
import { createProduct } from '../services/productService';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: 0,
    price: 0.0,
    category: '',
    imageUrl: '',
    year: 2024,
    director: '',
    createdByEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      alert("Product created successfully!");
    } catch (error) {
      alert("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
      <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
      <input type="text" name="director" value={formData.director} onChange={handleChange} placeholder="Director" />
      <input type="email" name="createdByEmail" value={formData.createdByEmail} onChange={handleChange} placeholder="Created by (Email)" />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;