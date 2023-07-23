import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GPTBot() {

    const [output, setOutput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const generateRecipe = async () => {
        try {
          setIsTyping(true);
          const { data } = await axios(`/api/assistant`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          if (!data) {
            throw new Error("Invalid response object");
          }
          const { output } = data;
          setIsTyping(false);
          setOutput(output);
          console.log(output);
        } catch (error) {
          console.log(error);
          setErrorMessage("An error occurred while fetching the response");
        } finally {
          setIsTyping(false);
        }
      };

  return (
    <div className="">
             <h4 className="my-2 text-center">Generate a recipe with NutriGPT</h4>
             <div className="text-container p-2">
      <p className="text-bigger">
        Discover delightgul and healthy recipes personalized just for you! Click
        the button below to ask NutriGPT, our AI nutrition assistant, to
        generate a recipe that perfectly matches your cooking and eating
        preferences!
      </p>
      </div>
        <div className="text-center">
      <button className="btn btn-success my-2 px-4" onClick={generateRecipe}>
        Inspire me!
      </button>
      </div>
      <div className="my-2">
        <div className={isTyping ? "typing" : "hide"}>
          <p className="text-center">
            <i>{isTyping ? "Typing..." : ""}</i>
          </p>
        </div>
        <div className="container d-flex justify-content-center align-items-center">

        {output && 
    <div className="py-2 my-1 card w-60">
      <div class="card-body">
    <h5 class="card-title fw-semibold">Your recipe</h5>
       <pre className="text card-text">{output}</pre>
        </div>
        </div>
        }
      
        < br />
      </div>
      </div>
    </div>
  )
}
