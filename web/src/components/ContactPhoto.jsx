import { Avatar } from "@material-ui/core";
import React, { createRef, useState } from "react";
import styled from "styled-components";


const defaultImage = "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg"

const BigAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 15px;
  border: 4px solid var(--light-color);
  cursor: pointer;
  `;

const ContactAvatar = () => {
  const [image, _setImage] = useState(null);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <label htmlFor="avatar-image-upload">
        <BigAvatar
            onClick={handleClick}
            $withBorder
            alt="Contact Photo"
            src={image || defaultImage}
            imgProps={{style: {maxHeight: "100%", maxWidth: "100%", objectFit: "cover",},}}
        />
        <input
            ref={inputFileRef}
            accept="image/jpeg,image/png"
            hidden
            id="avatar-image-upload"
            type="file"
            onChange={handleOnChange}
        />
    </label>
  );
};

export default ContactAvatar;