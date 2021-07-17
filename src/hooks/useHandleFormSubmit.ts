import React from "react";
import type { FormEvent } from "react";

// export const handleChange = ( { target }: any ) => {
//     // const { name, value } = target;
//     // console.log({[name]: value});
    
// };

export const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log("evt.target.value", evt.target.value);  
};

export const handleFormSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { email, password, name, phone } = e.target as typeof e.target & {
        email: { value: string }
        password: { value: string }
        name: { value: string }
        phone: { value: string }        
    };

    console.log(email.value);
    console.log(password.value);
    console.log(name.value);
    console.log(phone.value);

    let opts = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            name: name.value,
            phone: phone.value
        })
    }

    await fetch('/registrar', opts)
        .then(resp => {
            if (!resp.ok) console.log("Fail");
            

            return resp.json();
        })
        .then(content => {
            console.log(content);
            
            console.log("OK");
        })

}
