import React from "react";
import Button from "../UI/Button";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { postAnyAuth } from "../../api/api";
const MySwal = Swal;

function NewPost() {
  const formik = useFormik({
    
    onSubmit: (values) => {
      MySwal.fire({
        title: "Create Post",
        html: (
          <div>
            <label htmlFor="title">Title:</label>
            <input id="title" type="text" placeholder="title" />
            
          </div>
        ),
        preConfirm: () => {
          // Get the title value from the input element
          const title = document.getElementById("title").value;
          // Validate the title value
          if (!title) {
            Swal.showValidationMessage("Please enter a title");
          }
          // Return the title value
          return title;
        },
      }).then((result) => {
        // Do something with the title value
        console.log(result.value);
      });
    },
  });
  return (
    <div>
      <Button
        onClick={formik.handleSubmit}
        class="w-full"
        outline
        color="transparent"
      >
        New Post
      </Button>
    </div>
  );
}

export default NewPost;
