import {auth, googleProvider} from "../config/Firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { useState } from "react";
import { async } from "@firebase/util";


export const Auth = () =>{
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 console.log(auth?.currentUser?.email);
 const SignIn = async () =>{
    try{
     await createUserWithEmailAndPassword(auth,email,password);}
    catch(err){
        console.error(err);
    }
    };
 const SignInWithGoogle = async() =>{
    try{
     await signInWithPopup(auth,googleProvider);}
    catch(err){
        console.error(err);
    }
    };
 const LogOut = async() =>{
    try{
     await signOut(auth);}
    catch(err){
        console.error(err);
    }
    };
    return(
        <div>
            <input placeholder="email" onChange={(e) =>{setEmail(e.target.value);}}/>
            <input placeholder="password" type="password" onChange={(e) =>{setPassword(e.target.value);}}/>
            <button onClick={SignIn}>sign in</button>
            <button onClick={SignInWithGoogle}>Sign In With Google</button>
            <button onClick={LogOut}>LogOut</button>
        </div>
    )
}