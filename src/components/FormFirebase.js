import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { FormGroup } from 'reactstrap';
import firebase from '../firebase/firebase';
import { isEqual } from 'lodash';


function FormFirebase () {
    // below will keep track the submitted data
    const [submitted, setSubmitted] = useState(); 
    const { register, handleSubmit, errors, watch, formState } = useForm({
        mode: 'onChange'
    });
    const onSubmit = (data) => {
        setSubmitted(data);
        // user with same firstname and lastname can edit his form field, changes in spelling may not the edit data to his form, rather create another instance
        var username = (data.firstname.toLowerCase() + data.lastname.toLowerCase()).replace(/ /g,'');
        firebase.database().ref('forms/' + username).set({
            firstname: data.firstname + ' ',
            lastname: data.lastname,
            gender: data.gender,
            email: data.email,
            phonenum: data.phonenum,
            skills: data.skills,
            description: data.description
        }, (err) => {
            if(err) {
                console.log("Form Data submission failed!");
                alert("Form Data submission failed! Resubmit the form");
            }
            else {
                console.log('Data saved successfully');
                alert('You have successfully saved!');
            }
        })
    };
    // with isValid and isDirty, we can track the changes in form field
    const { isValid, isDirty } = formState;
    const inputValues = watch(); 

    //canSubmit will work only when user wants to edit the field
    const canSubmit = isValid && isDirty && !isEqual(inputValues, submitted);

    return (
        <div className="container-position">
            <h1 className="mt-2 mb-2">Let's get started</h1>
            <h5 className="my-4 light-text-color"> Start with the your form! </h5>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center justify-content-center text-white" >
                <FormGroup>
                    <input name="firstname" type="text" className="input mb-3" ref={register({minLength: 3, maxLength: 15})} placeholder="First Name" />
                    {errors.firstname?.type === "maxLength" && "Firstname exceed maxLength 15"}
                    {errors.firstname?.type === "minLength" && "Firstname must have 2 letters"}

                    <input name="lastname" 
                        type="text" 
                        className="input mb-3" 
                        placeholder="Last Name"
                        ref={register({ 
                                required: true, 
                                minLength: 3, 
                                maxLength: 15 
                                })} 
                    />
                    {errors.lastname?.type === "required" && "Lastname is required"}
                    {errors.lastname?.type === "maxLength" && "Lastname exceed maxLength 15"}
                    {errors.lastname?.type === "minLength" && "Lastname must have 2 letters"}
                </FormGroup>

                <FormGroup className="input mb-3" >
                    <label className="mr-5">Gender</label>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            id="inlineRadio1"
                            ref={register}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">
                            Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            id="inlineRadio2"
                            ref={register}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">
                            Female
                        </label>
                    </div>
                </FormGroup>
                    
                <FormGroup>
                    <input placeholder="Email"
                        name="email"
                        type="text"
                        className="input mb-3"
                        ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            // value: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/,
                            message: "invalid email address"
                        }
                        })}
                    />
                    {errors.email && errors.email.message}
                </FormGroup>
                <FormGroup>
                    <input placeholder="Phone No."
                        name="phonenum"
                        className="input mb-3"
                        type="tel"
                        ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Invalid! Only Number can be entered"
                        },
                        maxLength: 11, 
                        })}
                    />
                    {errors.phonenum && errors.phonenum.message}
                </FormGroup>
    
                <select name="skills" ref={register({ required: true })} className="input mb-3">
                    <option>Skills</option>
                    <option value="UI">UI</option>
                    <option value="UX">UX</option>
                    <option value="Backend">Backend</option>
                    <option value="CSS">CSS</option>
                </select>
                <FormGroup>
                    <textarea name="description" className="input form-control" rows="4" ref={register} placeholder="Write your description here!"/>
                </FormGroup>
                
                <button type="submit" className="button mb-0" disabled={!canSubmit}>Submit</button> {/*disabled when user submits the edit, will disable when user changes the field values*/}
            </form>
        </div>
    );
}

export default FormFirebase;
