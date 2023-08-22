import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    await axios.get("/api/products").then(({ status, data }) => {
      if (status === 200) {
        setProducts(data.products);
        setLoading(false);
      }
    });
  };

  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      'title' : "Are you sure?",
      'icon' : "warning",
      'text' : "You won't be able to revert this!",
      'showCancelButton' : true,
      'confirmButtonColor' : "red",
      'cancelButtonColor' : "green",
      'confirmButtonText' : "Yes, delete the record!",
    })
    .then((result) => {
      return result.isConfirmed
    })
    if (!confirm) {
      return
    }

    await axios
    .delete(`/api/products/${id}`)
    .then(({data}) => {
      Swal.fire({
        'icon' : 'success',
        'text' : data.message
      })
      console.log(data);
      fetchProducts();
    })
    .catch(({response: {data}}) => {
        Swal.fire({
          'icon' : 'error',
          'text' : data.message
        })
    })
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>
          Loading...
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </h1>
      </div>
    );
  }

  return (
    <>
      <h1>List of Products</h1>
      <div>
        <table className="table table-striped border-top align-middle shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="bg-dark text-light">Product ID</th>
              <th className="bg-dark text-light">Product Title</th>
              <th className="bg-dark text-light">Product Descrption</th>
              <th className="bg-dark text-light">Product Image</th>
              <th className="bg-dark text-light">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.length > 0 &&
              products.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td>
                      <img
                        src={`http://localhost:8000/storage/products/image/${row.image}`}
                        alt={row.title}
                        width={"150px"}
                        height={"100px"}
                      />
                    </td>
                    <td>
                      <div className="d-flex justify-content-center column-gap-2">
                        <Link
                          to={`/edit/${row.id}`}
                          className="btn btn-sm btn-warning"
                        >
                          {/* Edit */}
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        {/* Delete */}
                        <Button onClick={() => {deleteProduct(row.id)}} variant="danger" size="sm">
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
