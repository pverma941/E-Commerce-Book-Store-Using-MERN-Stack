import { Typography ,Step,Stepper,StepLabel} from '@material-ui/core'
import React from 'react'
import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import './CheckOutStep.css'

export default function CheckOutStep({activeState}) {
    const steps=[
        {
            label:<Typography>Shiping Details</Typography>,
            icon:<LocalShippingIcon/>,
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>,
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>,
        },
    ]
    const stepStyles={
        boxSizing:"border-box"
    }
  return (
    <div>
        <Stepper alternativeLabel activeStep={activeState} style={stepStyles}>
            {steps.map((item,index)=>(
                <Step key={index} active={activeState===index?true:false} completed={activeState>=index?true:false}>
                    <StepLabel style={{color:activeState>=index?"tomato":"rgba(0,0,0,0.649)"}}icon={item.icon} > {item.label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
  )
}
