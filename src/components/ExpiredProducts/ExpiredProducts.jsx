import React, { useEffect, useState } from 'react';
import useFetchExpiredStockData from '../../hooks/useFetchExpiredStock';
import useUpdateQuantityToZero from '../../hooks/useUpdateQuantityToZero';
import './ExpiredProducts.css';

const ExpiredProducts = () => {
  const { expiredStockData, loading } = useFetchExpiredStockData();
  const { updateQuantityToZero, isLoading: updateLoading } = useUpdateQuantityToZero();
  
  
  const handleRemoveProduct = async (name, expiryDate) => {
    // Call the hook to update quantity to zero
    await updateQuantityToZero(name, expiryDate);
  };

  return (
    <div className="container bg-light p-4 rounded">
      <h1 className="text-dark fw-bold text-center">Expired Products</h1>
      {loading ? (
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <img className="justify-content-center" src="media/Loading.gif" alt="Loading..." />
          </div>
          <div className="col-4"></div>
        </div>
      ) : (
        expiredStockData.length === 0 ? (
          <p className='text-center'>No products to display. We aim to keep our inventory fresh. Please remember to sell any items marked with red stickers promptly.
            <img src="https://gifdb.com/images/high/mike-myers-thumbs-up-meme-wayne-s-world-k6mc60kkfiux96uc.gif" className='good-work-gif' alt="Great Work!" />
            {/* <MiniGame /> */}
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Quantity</th>
                  <th>Expiry Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expiredStockData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.quantity}</td>
                    <td>{item.expiry_date}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveProduct(item.name, item.expiry_date)}
                        disabled={updateLoading}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}

export default ExpiredProducts
