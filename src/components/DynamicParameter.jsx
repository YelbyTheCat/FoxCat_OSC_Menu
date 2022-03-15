import React from "react";
import { Form } from "react-bootstrap";
import ParameterSelectBool from "./ParameterSelectBool";

const DynamicParameter = ({ handleChange, parameters }) => {
    return Object.keys(parameters).map((key) => {

        // console.log("DEBUG: " + Object.keys(parameters).length);
        // for(let i = 0; i < inputParameters.length; i++)
        // {
            
        //         console.log("DEBUG: " + inputParameters[i]);
        //         console.log("DEBUG: " + parameters[inputParameters[i]]);
        //         if()
        //     }
            // console.log(typeof(parameters.parameter));
            //if(parameters.parameter == true)
            
        let value = parameters[key];

        console.log("DEBUG: " + typeof(value));

        if(typeof(value) === typeof(true))
        {
            console.log("DEBUG: " + key +  " " + value + " is a boolean");
            let name = key.substring(19);
            return <>
                <br />
                <Form.Label>{name}</Form.Label><br />
                <ParameterSelectBool checked={!!value} onChange={(newValue) => handleChange(key, newValue, false)} {...{value}}/><br />
            </>
        }
        else if(value >= 0 && value <= 1)
            console.log("DEBUG: " + key + " " + value + " probably a float");
        else if(value <= 1)
            console.log("DEBUG: " + key + " " + value + " probably an int");
        else
            console.log("DEBUG: Tacos");

        return <div key={key}>Butts I dont care</div>;
    });
    };
export default DynamicParameter;