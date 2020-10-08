import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { FormGroup } from 'reactstrap';
import firebase from '../firebase/firebase';
import { isEqual } from 'lodash';
import {baseUrl} from '../shared/baseUrl';
import {databaseUrl} from '../shared/databaseUrl';

// export const addPost = () => {
//     event: 
// }


function FormFirebase () {
    // below will keep track the submitted data
    const [submitted, setSubmitted] = useState(); 
    const { register, handleSubmit, errors, reset, watch, formState } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data, e) => {

        data.date = new Date().toISOString();
        setSubmitted(data);
        // curl -X PUT -d "{
        //     "alanisawesome": {
        //       "name": "Alan Turing",
        //       "birthday": "June 23, 1912"
        //     }
        //   }" baseUrl + "forms.json"

        fetch(databaseUrl + "forms", {
            
        //   body: JSON.stringify(newComment),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Methods': 'GET, PUT,PATCH,DELETE',
            'Access-Control-Allow-Origin': '*'
          },
          method: "GET",
        })
            
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }

        }, error => {
            var err = new Error(error.message);
            throw err;
        })
        .then((resp) => {
            console.log(resp);
        }
            
        )

        // user with same firstname and lastname can edit his form field, changes in spelling may not the edit data to his form, rather create another instance
        // var username = (data.firstname.toLowerCase() + data.lastname.toLowerCase()).replace(/ /g,'');
        // query the database for existence of references in the database URL.
        // var queryRef = firebase.database().ref("forms");
    //     queryRef.once("value", snap => {
    //         // update the changed values if same username fills the form 
    //         if (snap.child(username).exists()) {
    //             console.log(data.editFormField);
    //             if(data.editFormField) {
    //                 firebase.database().ref('forms/' + username).update({
    //                     firstname: data.firstname + ' ',
    //                     lastname: data.lastname,
    //                     gender: data.gender,
    //                     email: data.email,
    //                     phonenum: data.phonenum,
    //                     skills: data.skills,
    //                     description: data.description
    //                 }, (err) => {
    //                     if(err) {
    //                         console.log("Form Data submission failed!");
    //                         alert("Form Data submission failed! Resubmit the form");
    //                     }
                        
    //                     else {
    //                         console.log('Data edited successfully');
    //                         alert('You have successfully edited!');
    //                     }
    //                 });
    //             }
    //             else {
    //                 console.log("User Already Exists! Editing will only be allowed, if the edit checkbox is selected!");
    //                 alert("Editing not allowed! User Already Exists. Please! check the edit checkbox for editing.");
    //             }
    //         }
    //         // if the user didn't exists in the database then we will create the reference with username key
    //         else {
    //             firebase.database().ref('forms/' + username).set({
    //                 firstname: data.firstname + ' ',
    //                 lastname: data.lastname,
    //                 gender: data.gender,
    //                 email: data.email,
    //                 phonenum: data.phonenum,
    //                 skills: data.skills,
    //                 description: data.description
    //             }, (err) => {
    //                 if(err) {
    //                     console.log("Form Data submission failed!");
    //                     alert("Form Data submission failed! Resubmit the form");
    //                 }
    //                 else {
    //                     console.log('Data saved successfully');
    //                     alert('You have successfully saved!');
    //                 }
    //             });
    //         }
    //     }, err => console.log(err));
        
        
    };
    // with isValid and isDirty, we can track the changes in form field
    const { isValid, isDirty, isSubmitted } = formState;
    const inputValues = watch();    

    //canEditField will check whether the user already submitted or not if submitted then allow editing when edit checkbox is checked
    const canEditField = isSubmitted === true ? isEqual(inputValues, submitted) === false ? true : false : true;
    //canSubmit will validate the user enterer data
    const canSubmit = isValid && isDirty && !isEqual(inputValues, submitted);


    return (
        <div className="container-position">
            <h1 className="mt-2 mb-2">Let's get started</h1>
            <h5 className="my-4 light-text-color"> Start with the your form! </h5>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center justify-content-center text-white" >
                <FormGroup>
                    <input name="firstname" type="text" className="input mb-3" ref={register({minLength: 3, maxLength: 15})} placeholder="First Name" disabled={!canEditField}/>
                    {errors.firstname?.type === "maxLength" && "Firstname exceed maxLength 15"}
                    {errors.firstname?.type === "minLength" && "Firstname must have 2 letters"}

                    <input name="lastname" 
                        type="text" 
                        className="input mb-3" 
                        placeholder="Last Name"
                        disabled={!canEditField}
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
                            disabled={!canEditField}
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
                            disabled={!canEditField}
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
                        disabled={!canEditField}
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
                        disabled={!canEditField}
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
    
                <select name="skills" ref={register({ required: true })} disabled={!canEditField} className="input mb-3">
                    <option>Skills</option>
                    <option value="UI">UI</option>
                    <option value="UX">UX</option>
                    <option value="Backend">Backend</option>
                    <option value="CSS">CSS</option>
                </select>
                <FormGroup>
                    <textarea name="description" className="input form-control" rows="4" ref={register} disabled={!canEditField} placeholder="Write your description here!"/>
                </FormGroup>
                
                <button type="submit" className="button" disabled={!canSubmit}>Submit</button> {/*disabled when user submits the form, will enable when user click the checkbox*/}
                {/*submit button will be disabled with same data as entered before, will enable only if edit checkbox is checked */}
                <FormGroup className="input">
                    <input
                    type="checkbox"
                    placeholder="Edit Form"
                    name="editFormField"
                    id="editForm"
                    ref={register}
                    disabled={!isSubmitted}
                    />
                    <label htmlFor="editForm" className="ml-2"> Edit the form by clicking the checkbox! </label>
                </FormGroup>
                {/*user can reset the form by click the "Reset Form Button" */}
                <input
                    className="button my-0"
                    type="button"
                    onClick={() => reset()}
                    value="Reset Form"
                />
            </form>
        </div>
    );
}

export default FormFirebase;
