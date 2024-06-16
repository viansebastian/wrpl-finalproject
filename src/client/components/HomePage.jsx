import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useState, useEffect} from 'react';
import { fetchItems } from '../api';
import React from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom';

const images = [
    {
      url: 'src/Assets/Games/jeshoots-com-250229-unsplash-1060x540.jpg',
      title: 'Games',
      width: '30%',
      align: 'center',
    },
    {
      url: 'src/Assets/Hardware/pink.jpeg',
      title: 'Hardware',
      width: '30%',
      align: 'center',
    },
    {
      url: 'src/Assets/Merch/Crazy_Racoon/crazyraccoon-store-streamer-festival-2022-02.webp',
      title: 'Merch',
      width: '30%',
      align: 'center',
    },
  ];
  
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', 
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));
  
export const HomePage = () => { 

    const Carousel = () => {
        const settings = {
            /*dots: true, */
           infinite: true,
           arrows: true,
           autoplay: true,
           speed: 500,
           slidesToShow: 2,
           slidesToScroll: 1,
};

return (
<div className='container'>
    <div className = "carousel">
   <Slider {...settings}>
       <div className="slideDiv">
            <h2 className='carouselText'>Genshin Impact</h2>
            <img className = "carouselimg" src="src/Assets/Games/Genshin Impact/genshin impact.jpg" alt="Genshin Impact Gameplay" />
        </div>

        <div className="slideDiv">
        <h2 className='carouselText'>Valorant</h2>
           <img className = "carouselimg" src="src/Assets/Games/Valorant/valorant.jpeg" alt="Valorant Gameplay" />
       </div>

        <div className="slideDiv">
        <h2 className='carouselText'>Omori</h2>
         <img className = "carouselimg" src="src/Assets/Games/Omori/omori2.jpeg" alt="Omori Gameplay" />
        </div>

        <div className="slideDiv">
        <h1 className='carouselText'>The Legend of Zelda</h1>
         <img className = "carouselimg" src="src/Assets/Games/The_Legend_of_Zelda/zelda.webp" />
        </div>

        <div className="slideDiv">
        <h1 className='carouselText'>The Exit 8</h1>
         <img className = "carouselimg" src="src/Assets/Games/The_Exit_8/exit 8.jpeg" />
        </div>

        <div className="slideDiv">
        <h1 className='carouselText'>Super Bunny Man</h1>
         <img className = "carouselimg" src="src/Assets/Games/Super_bunny_Man/superbunnyman.jpeg" />
        </div>

        <div className="slideDiv">
        <h1 className='carouselText'>Unpacking</h1>
         <img className = "carouselimg" src="src/Assets/Games/Unpacking/Screenshot02.png" />
        </div>
        
   </Slider>
 </div>
 </div>
);

}
    return (
        <>
        <div>
            <div className="homeCard">
                <h1>Welcome to 2434 Games</h1>
                <h2>Your ultimate destination for GAMES, HARDWARE, and MERCH! #1 choice for all your gaming needs!</h2>
            </div>

            <div className= "carouselcontainer">
              <Carousel />
            </div>

            <Link to="/store">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111%' }}>
            {images.map((image) => (
                <ImageButton
                focusRipple
                key={image.title}
                style={{
                    width: image.width,
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle2"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 5px)`, /*ini tulisan2 yg box putih di bawah*/
                    }}
                    >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
                </ImageButton>
            ))}
            </Box></Link>
         </div>
</>
    )
}