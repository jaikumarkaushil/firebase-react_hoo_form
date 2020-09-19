import React from 'react'
import { useForm } from 'react-hook-form';
import { FormGroup } from 'reactstrap';
import firebase from '../firebase/firebase';


function FormFirebase () {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        // post operation of form data
        createAndUpdateForm(data.firstname, data.lastname, data.gender, data.email, data.phonenum, data.skills, data.description);
    };

    const createAndUpdateForm =(firstname, lastname, gender, email, phonenum, skills, description ) => {
        var formData = {
            firstname,
            lastname,
            gender,
            email,
            phonenum,
            skills,
            description
        };
        
        var newFormDataKey = firebase.database().ref().child('posts').push().key;

        var updates = {};
        updates['/forms/' + newFormDataKey] = formData;

        return firebase.database().ref().update(updates, function(error) {
            if (error) {
                console.log("The post of Form Data failed!");
            } else {
                console.log("Data Saved Successfully");
            }
        });
    }

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
                            // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                
                <button className="button mb-0">Submit</button>
            </form>
        </div>
    );
}

export default FormFirebase;


// export default class FormFirebase extends Component {
//     constructor(props) {
//         super(props);

//         this.input = React.forwardRef();
//     }
//     render() {
//         const errors = this.props.validate;
//         const { username, password, email } = this.props;
//         return (
//             <div className="container-position-auth">
//                 <h1 className="mt-5 mb-2">Let's get started</h1>
//                 <h5 className="my-4 light-text-color"> Create your free account </h5>
//                 <a href="/home" className="btn btn-social btn-google">
//                     <span className="fa fa-google"></span>
//                     Sign up with Google
//                 </a>
//                 <p className="mt-2 light-text-color" >Or sign up with email</p>
//                 <Form onSubmit={this.props.handleSubmit}>   {/*when the submit button will be clicked, it will be handled by the this.handleSubmit javascript object*/}
//                     <FormGroup row>
//                         <Label htmlFor="username" ref={this.input}></Label>
//                         <Col>
//                             <Input className="input" type="text" id="username" name="username" placeholder="User Name" value={username} valid={errors.username === ''} invalid={errors.username !== ''} onBlur={this.props.handleBlur('username')} onChange={this.props.handleInputChange} /> {/*this.handleInputChange will handle the any change or modification when we input something in the field */}
//                             <FormFeedback>{errors.username}</FormFeedback>    
//                         </Col>
//                     </FormGroup>
//                     <FormGroup row>
//                         <Label htmlFor="email" ref={this.input}></Label>
//                         <Col>
//                             <Input className="input" type="email" id="email" name="email" placeholder="Email" value={email} valid={errors.email === ''} invalid={errors.email !== ''} onBlur={this.props.handleBlur('email')} onChange={this.props.handleInputChange} />
//                             <FormFeedback>{errors.email}</FormFeedback>
//                         </Col>
//                     </FormGroup>
//                     <FormGroup row>
//                         <Label htmlFor="password" ref={this.input}></Label>
//                         <Col>
//                             <Input className="input" type="text" id="password" name="password" placeholder="Password" value={password} valid={errors.username === ''} invalid={errors.username !== ''} onBlur={this.props.handleBlur('username')} onChange={this.props.handleInputChange} /> {/*this.handleInputChange will handle the any change or modification when we input something in the field */}
//                             <FormFeedback>{errors.username}</FormFeedback>    
//                         </Col>
//                     </FormGroup>
//                     <FormGroup row>
//                         <Col className="text-center py-3">
//                             <button type="submit" className="button">
//                                 Submit
//                             </button>
//                         </Col>
//                     </FormGroup>
//                 </Form>
                
//                 <p className="light-text-color">By signing up you agree to our <strong>Terms of Service</strong></p>
//                 <p className="light-text-color">Already have an account? <Link to="/login" className="link"><strong>Log In</strong></Link></p> 
//                 <Link to="/home" className="link"><button className="button">Back to Home</button></Link>
//       </div>
//         )
//     }
// }



// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";

// import Select from "react-select";


// import "./index.css";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" }
// ];

// const MyInput = ({ name, label, register }) => {
//   return (
//     <>
//       <label htmlFor={name}>{label}</label>
//       <input name={name} placeholder="Jane" ref={register} />
//     </>
//   );
// };

// function FormFirebase() {
//   const { register, handleSubmit, setValue } = useForm();
//   const onSubmit = data => {
//     alert(JSON.stringify(data, null));
//   };
//   const [values, setReactSelect] = useState({
//     selectedOption: []
//   });

//   const handleMultiChange = selectedOption => {
//     setValue("reactSelect", selectedOption);
//     setReactSelect({ selectedOption });
//   };



//   useEffect(() => {
//     register({ name: "reactSelect" });
//   }, [register]);

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <input
//             style={{
//               marginBottom: "20px"
//             }}
//             name="HelloWorld"
//             inputRef={register}
//             placeholder="Material UI - input"
//             inputProps={{
//               "aria-label": "Description"
//             }}
//           />
//         </div>



//         <div>
//           <lable className="reactSelectLabel">React select</lable>
//           <Select
//             className="reactSelect"
//             name="filters"
//             placeholder="Filters"
//             value={values.selectedOption}
//             options={options}
//             onChange={handleMultiChange}
//             isMulti
//           />
//         </div>

//         <div>
//           <input name="firstName" type="text" placeholder="First Name" register={register} />
//         </div>

//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <input name="lastName" placeholder="Luo" ref={register} />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             name="email"
//             placeholder="bluebill1049@hotmail.com"
//             type="email"
//             ref={register}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default FormFirebase;
