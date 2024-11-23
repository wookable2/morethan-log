import styled from "@emotion/styled"
import React, { useState, useEffect } from "react"

interface ImageData {
  url: string
  link: string
  alt: string
}

interface Props {
  images: ImageData[]
  intervalTime?: number
}

const ImageCarousel: React.FC<Props> = ({ 
  images, 
  intervalTime = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage()
    }, intervalTime)

    return () => clearInterval(timer)
  }, [intervalTime])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <StyledWrapper>
      <ImageContainer>
        <ImageLink 
          href={images[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledImage
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
          />
        </ImageLink>

        <NavButton className="left" onClick={(e) => {
          e.preventDefault()
          prevImage()
        }}>
          ←
        </NavButton>

        <NavButton className="right" onClick={(e) => {
          e.preventDefault()
          nextImage()
        }}>
          →
        </NavButton>

        <ImageCounter>
          {currentIndex + 1} / {images.length}
        </ImageCounter>
      </ImageContainer>
    </StyledWrapper>
  )
}

export default ImageCarousel

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
  margin-bottom: 1rem; 
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
`

const ImageLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => `${theme.colors.gray4}80`};
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.gray4}B3`};
  }

  &.left {
    left: 0.5rem;
  }

  &.right {
    right: 0.5rem;
  }
`

const ImageCounter = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.gray4}80`};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`