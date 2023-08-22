import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';




const CreateProduct = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [validationError, setValidationError] = useState({});

  const navigate = useNavigate();


  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const createProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    await axios
    .post('/api/products', formData)
    .then(({data}) => {
      Swal.fire({
        icon: 'success',
        text: data.message
      })
      navigate('/');
    })
    .catch(({response}) => {
      if (response.status === 422) {  // 422 - Unprocessable Entity
        setValidationError(response.data.errors);
      } else {
        Swal.fire({
          icon: 'error',
          text: response.data.message
        })
      }
    })
  };

  return (
    <div className='container d-flex justify-content-center'>
      <div className='card shadow-lg w-25'>
        <div className=' card-header'>
          <h1>Create Product</h1>
        </div>
        <div className='card-body'>
          <Form onSubmit={createProduct}>
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
                  <Form.Control type='file' onChange={imageHandler}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button type='submit' size='lg' variant='primary' className=' mt-3'>Create</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct