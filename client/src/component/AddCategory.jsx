import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { API } from "../config/api";
import Swal from "sweetalert2";

export default function AddCategories() {

  const title = " Admin Add Category";
  document.title = "Dumbflix | " + title;

  const [addFilms, setAddFilms] = useState({});

  const handleChange = (e) => {
    setAddFilms({
      ...addFilms,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const addButtonHandler = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
    
      formData.set("name", addFilms.name);

      console.log(formData);
      // Configuration Content-type
      
      // Insert data user to database
      const response = await API.post("/category", formData, config);
      console.log("add movies success : ", response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Category Success",
        showConfirmButton: false,
        timer: 2000,
      });

    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Add Category Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });
    
    return(
        <Form
          className="w-25 mt-5 pt-5 mx-auto"
          onSubmit={(e) => addButtonHandler.mutate(e)}
        >
          <h4 className="text-light fw-semibold mb-4">Add Category</h4>
              <Form.Control
                className="formInputMovies"
                placeholder="Category"
                type="text"
                style={{
                    color : "#B1B1B1",
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #D2D2D2",
                }}
                name="name"
                onChange={handleChange}
              />
          <div className="d-flex flex-row-reverse mt-4">
            <Button className="border-0 fw-bold pe-5 ps-5 bd-highlight" style={{backgroundColor:"#E50914"}} type="submit">
            Submit
            </Button>
          </div>
        </Form>
  );
};
