import React, { useState } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';
import LoaderButton from './LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import "./BillingForm.css"

function BillingForm({ isLoading, onSubmit, ...props }) {
    const [fields, handleFieldChange] = useFormFields({
        name: '',
        storage: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCardComlete, setIsCardComplete] = useState(false);

    isLoading = isProcessing || isLoading;

    function validateForm() {
        return (
            fields.name !== '' &&
            fields.storage !== '' &&
            setIsCardComplete
        )
    }
    async function handleSubmitClick(event) {
        event.preventDefault();
        setIsProcessing(true);
        const { token, error } = await props.stripe.createToken({
            name: fields.name
        })
        setIsProcessing(false);
        onSubmit(fields.storage, { token, error })
    }
    return <form className="BillingForm" onSubmit={handleSubmitClick}>
        <FormGroup bsSize='large' controlId='storage'>
            <FormControl
                min='0'
                type='number'
                value={fields.storage}
                onChange={handleFieldChange}
                placeholder='Number of notes to store'
            />
        </FormGroup>
        <h
    </form>
}