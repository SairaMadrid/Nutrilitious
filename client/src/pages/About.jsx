import React from 'react';
import "./about.css";
import asset1 from "../assets/asset1.jpg";
import asset2 from "../assets/asset2.jpg";
import asset3 from "../assets/asset3.jpg";

export default function About() {
  return (
    <div>
        <div className='div-box1'>
            <div className='container py-2'>
        <h1 className='text-center py-2'>About Us</h1>
        <h4 className='text-center pb-2 my-4'>Welcome to Nutrilitious!</h4>
        <div className='row'>
            <div className='col'>
                <div className='img-fade'>
                <img src={asset1} className='img-about img-fluid mb-4' alt="food" />
                </div>
            </div>
            <div className='col d-flex justify-content-center align-items-center'>
                <p>At Nutrilitious, we are dedicated to revolutionizing the way you approach nutrition and cooking. Our innovative app is designed to empower you to create delicious and wholesome meals effortlessly, using the ingredients you have on hand.</p>
            </div>
        </div>
        </div>
    </div>
    <div className='container mt-2 pt-4'>
    <div className='row'> 
    <div className='col d-flex justify-content-center align-items-center'>
        <p>Say goodbye to the days of staring blankly into your fridge and wondering what to cook. Nutrilitious allows you to search for recipes based on the ingredients you have. Whether you're trying to use up leftovers or looking for creative ways to incorporate specific foods, our app has got you covered.</p>
    </div>
    <div className='col'>
    <div className='img-fade'>
    <img src={asset2} className='img-about img-fluid mb-4' alt="food" />
    </div>
    </div>
    </div>
    </div>

    <div className='div-box1'>
            <div className='container mt-2 pt-4'>
        <div className='row'>
            <div className='col'>
            <div className='img-fade'>
                <img src={asset3} className='img-about img-fluid mb-4' alt="food" />
            </div>
            </div>
            <div className='col d-flex justify-content-center align-items-center'>
                <p>Get ready for a tailored and personalized experience! By creating a profile on Nutrilitious, you unlock a world of possibilities. Save dietary preferences, allergens, and favorite cuisines, so we can curate recipes that align with your unique tastes and requirements.</p>
            </div>
        </div>
        </div>
        <h4></h4>
    </div>

    </div>
  )
}
