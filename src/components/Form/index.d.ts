import * as React from 'react';

export interface FormProps {
    /**
     * This function is run when the form's submit function is called
     */
    onSubmit?: (...args: any[])=>any;
    /**
     * Runs on every change of the form
     */
    onChange?: (...args: any[])=>any;
    /**
     * Runs on every change, return value is used to display errors in components
     */
    validate?: (...args: any[])=>any;
    /**
     * Sets the initial form state
     */
    initialValues?: Object;
    /**
     * An optional ID which will be used instead of a randomly generated id
     */
    id?: string;
}

export const Form: React.FC<FormProps>;

