import * as React from 'react';

export interface IFormRef {
  submit: () => Promise<void>
}

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
    /**
     * Ref of the form, which exposes the submit() version
     */
    ref?: React.MutableRefObject<IFormRef | undefined | null>;
    /** 
     * The amount of time to wait, in milliseconds, before calling the validation function 
     */
    validationDelay?: number;
}

export const Form: React.FC<FormProps>;

