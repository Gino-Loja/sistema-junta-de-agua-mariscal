import { useState } from 'react';

const CircleMeterWater = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <svg 
           // fill={isClicked ? "#007bff" : "#000000"}  // Cambia el color al hacer clic
            height="24px" 
            width="24px" 
            
            version="1.1" 
            id="Layer_1" 
            xmlns="http://www.w3.org/2000/svg" 
       
            viewBox="0 0 24 24" 
      
            style={{ cursor: 'pointer' }}  // Cambia el cursor para indicar que es clickeable
        >
         
                    <path className="fill-default-400" d="M256,0C114.51,0,0,114.497,0,256c0,141.491,114.497,256,256,256c141.49,0,256-114.497,256-256
                        C512,114.509,397.503,0,256,0z M256,478.609c-122.746,0-222.609-99.862-222.609-222.609S133.254,33.391,256,33.391
                        S478.609,133.254,478.609,256S378.746,478.609,256,478.609z"/>
             
            
                    <path className="fill-default-400" d="M256,66.783C151.29,66.783,66.783,151.738,66.783,256c0,48.619,18.872,97.248,55.421,133.797
                        c6.52,6.52,17.091,6.52,23.611,0l23.611-23.611c6.52-6.519,6.52-17.09,0-23.611c-6.519-6.52-17.09-6.52-23.611,0l-11.177,11.177
                        c-19.241-23.851-30.408-52.1-33.501-81.056h15.734c9.22,0,16.696-7.475,16.696-16.696c0-9.22-7.475-16.696-16.696-16.696h-15.725
                        c3.094-28.955,14.261-57.198,33.5-81.05l11.17,11.169c6.52,6.52,17.091,6.52,23.611,0c6.519-6.519,6.519-17.091,0-23.611
                        l-11.175-11.175c23.276-18.804,51.227-30.356,81.054-33.5v15.732c0,9.22,7.475,16.696,16.696,16.696
                        c9.22,0,16.696-7.475,16.696-16.696v-15.731c29.827,3.144,57.777,14.698,81.054,33.5l-72.032,72.032
                        c-7.699-4.03-16.444-6.323-25.719-6.323c-30.687,0-55.652,24.966-55.652,55.652c0,30.687,24.966,55.652,55.652,55.652
                        c30.687,0,55.652-24.966,55.652-55.652c0-9.275-2.293-18.02-6.323-25.718l72.026-72.026c19.239,23.85,30.406,52.094,33.5,81.05
                        H395.13c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h15.734c-3.093,28.956-14.26,57.206-33.501,81.056
                        l-11.177-11.177c-6.519-6.519-17.091-6.519-23.611,0c-6.52,6.52-6.52,17.091,0,23.611l23.611,23.611
                        c6.52,6.52,17.091,6.52,23.611,0c36.482-36.483,55.421-85.084,55.421-133.798C445.217,151.681,360.676,66.783,256,66.783z
                         M256,278.261c-12.275,0-22.261-9.986-22.261-22.261c0-12.275,9.986-22.261,22.261-22.261c12.275,0,22.261,9.986,22.261,22.261
                        C278.261,268.275,268.275,278.261,256,278.261z"/>
          
                    <path className="fill-default-400" d="M272.696,345.043h-33.391c-27.618,0-50.087,22.469-50.087,50.087s22.469,50.087,50.087,50.087h33.391
                        c27.618,0,50.087-22.469,50.087-50.087S300.314,345.043,272.696,345.043z M272.696,411.826h-33.391
                        c-9.206,0-16.696-7.49-16.696-16.696s7.49-16.696,16.696-16.696h33.391c9.206,0,16.696,7.49,16.696,16.696
                        S281.902,411.826,272.696,411.826z"/>
             
        </svg>
    );
};

export default CircleMeterWater;
