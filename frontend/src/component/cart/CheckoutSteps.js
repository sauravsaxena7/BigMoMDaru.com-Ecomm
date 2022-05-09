


import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";


const CheckoutSteps = ({activeSteps}) =>{

  localStorage.setItem("refresh",false);


    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },

        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },

        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        },
    ]

    const stepStyle = {
        boxSizing:"border-box",
    }



    return(
        <Fragment>
        <Stepper alternativeLabel activeStep={activeSteps} style={stepStyle}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeSteps === index ? true : false}
              completed={activeSteps >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeSteps >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Fragment>
    )
}

export default CheckoutSteps;