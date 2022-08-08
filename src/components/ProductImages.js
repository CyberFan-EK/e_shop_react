import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = ({ images = [] }) => {
  const [main, setImage] = useState(images[0]);

  const showImage = (index) => {
    setImage(images[index]);
  };
  if (!main) {
    return null;
  }
  const { filename, url } = main;
  return (
    <Wrapper>
      <div className="main">
        <img src={url} alt={filename} />
        <div className="gallery">
          {images.map((image, index) => {
            const { filename, url, id } = image;
            return (
              <img
                key={id}
                onClick={() => {
                  showImage(index);
                }}
                src={url}
                alt={filename}
                className={`${url === main.url ? "active" : null}`}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    max-width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
    max-height: 400px;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
