import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';


const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [validationError, setValidationError] = useState({});

  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    await axios
    .get(`/api/products/${id}/edit`)
    .then(({data}) => {

      const { title,description } = data.product;

      setTitle(title);
      setDescription(description);
      setLoading(false);
    })
    .catch(({response: {data}}) => {
      Swal.fire({
        text : data.message,
        icon : 'error'
      })
    })
  }

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const updateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('title', title);
    formData.append('description', description);
    
    if (image !== null) {
      formData.append('image', image);
    };
    
    await axios
    .post(`/api/products/${id}`, formData)
    .then(({data}) => {
      Swal.fire({
        'text' : data.message,
        'icon' : 'success'
      });

      navigate('/');
    })
    .catch(({response}) => {
      if (response.status === 422) {  // 422 - Unprocessable Entity
        setValidationError(response.data.errors);
      } else {
        console.log(response.status)
        Swal.fire({
          'icon' : 'error',
          'text' : response.data.message
        })
      }
    })

  }


  useEffect(() => {
    fetchProduct();
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
    <div className='container d-flex justify-content-center'>
      <div className='card shadow-lg w-25'>
        <div className=' card-header'>
          <h3>Update Product</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={updateProduct}>
            <Row>
              <Col>
                <Form.Group controlId='title'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type='text' value={title} onChange={(event)=> {setTitle(event.target.value)}}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type='text' value={description} onChange={(event)=> {setDescription(event.target.value)}}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type='file' onChange={changeHandler}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button type='submit' size='lg' variant='primary' className='mt-3'>Update</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct