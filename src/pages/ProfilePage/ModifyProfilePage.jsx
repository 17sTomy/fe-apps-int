import React, { useState } from 'react';
import { editCustomerInfo } from '../../services/customerService';

export const EditProfilePage = () => {
  const [profileData, setProfileData] = useState({
    streetName: '',
    streetNumber: '',
    complementaryAddress: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await editCustomerInfo(profileData);
      alert('Perfil actualizado correctamente');
      console.log(updatedProfile);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un problema al actualizar el perfil.');
    }
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Calle:</label>
          <input
            type="text"
            name="streetName"
            value={profileData.streetName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Número de Calle:</label>
          <input
            type="text"
            name="streetNumber"
            value={profileData.streetNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Dirección Complementaria:</label>
          <input
            type="text"
            name="complementaryAddress"
            value={profileData.complementaryAddress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Número de Teléfono:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
