import '../../public/style/Login.css'
import { useEffect, useRef, useState } from 'react';
// import GoogleIcon from '@mui/icons-material/Google';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { FirebaseAuth, userExist } from '../../FireBaseConfig/Firebase';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../FireBaseConfig/Firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login() {

  const MySwal = withReactContent(Swal)

  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [Name, setName] = useState();

  // const [newUserEmail, setNewUserEmail] = useState();
  // const [newUserPassword, setNewUserPassword] = useState('');
  // const [newUserConfirmPassword, setNewUserConfirmPassword ] = useState('');
  
  // eslint-disable-next-line no-unused-vars
  const [newUserRole, setNewUserRole ] = useState("guest");

  const login_Container = useRef();

  const signUp = () => {
    login_Container.current.classList.add(("right-panel-active"))
  }
  const signIn = () => {
    login_Container.current.classList.remove("right-panel-active");
  
  }
  
  const redirectLogin = () => {
    window.location.replace("/admin");
  }

  const redirectRegister = () => {
    window.location.replace("/");
  }

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, userStateChanged)
  },[])

  const userStateChanged = async (user) =>{
    if (user){
      // User is logged in
      const isRegistered = await userExist(user.uid);
      if (isRegistered){
        setInterval(redirectLogin, 2000);
        
      }
      else{
        setInterval(redirectRegister, 2000);
        // setInterval(3000);
        // window.location.replace("/admin");

      }
    } else{
      // show the login container when no one is logged in
    }
  }

  // -- Termina bloque para verificar el registro y asi poder redirigir a la siguiente vista -- \\

// -- Empieza bloque para registro de usuarios usando su Email -- \\

const register = async (e) => {

  e.preventDefault();
    const newUserName = e.target.newUserName.value;
    const newUserEmail = e.target.newUserEmail.value;
    const newUserPassword = e.target.newUserPassword.value;


    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword, newUserName, newUserRole)
    .then((userCredential) => {
    const user = userCredential.user;
    const docuRef = doc(db, "Users", user.reloadUserInfo.localId);
      setDoc(docuRef, {email: newUserEmail, name: newUserName, role:newUserRole})
      MySwal.fire({
        title: "Exito",
        text: "Registro de usuario exitoso",
        icon: "success"
      });
      })
      .catch((error) => {
        let errorEmailInUse = 'FirebaseError: Firebase: Error (auth/email-already-in-use).' 
        let errorEmailInvalido = 'FirebaseError: Firebase: Error (auth/invalid-email).'
        let errorPasswordTooShort = 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).'
        if(error == errorEmailInUse){
          MySwal.fire({
            title: "Error",
            text: "La direccion de correo electronico ya existe",
            icon: "error"
          });
        }else if(error == errorEmailInvalido){
        console.log(error)
        MySwal.fire({
          title: "Error",
          text: "La direccion de correo eelectronico no es valida",
          icon: "error"
        });
      } else if(error == errorPasswordTooShort){
        MySwal.fire({
          title: "Error",
          text: "La contraseña debe tener un minimo de 6 caracteres",
          icon: "error"
        });
      }
      else{
        console.log(error)
      MySwal.fire({
        title: "Error",
        text: "Ha ocurrido un error al registrar este usuario",
        icon: "error"
      });
      }
    })
    }

// -- Termina bloque para registro de usuarios usando su Email -- \\


// -- Empieza bloque para la autenticacion con diferentes provedores -- \\

// const handleOnClickGoogle = async () => {
//   const googleProvider = new GoogleAuthProvider();
//   await signInWithGoogle(googleProvider)
// }
// // debugger;
// const signInWithGoogle  = async (googleProvider) => {
//   try {
//     const res = await signInWithPopup(FirebaseAuth, googleProvider)
//     .then ((result) => {
//       const credential = googleProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log()
//       console.log(user)
//       console.log(token + ' '+ user.uid);
//       const docuRef = doc(db, "Users", user.uid);
//       setDoc(docuRef, {email: user.email, name: user.displayName, role:newUserRole})
//     })
//     console.log(res);
//   } catch{}
// }

const handleOnClickEmail = async (e) => {
  e.preventDefault();
  const Email = e.target.loginEmail.value;
  const Password = e.target.loginPassword.value;
  const auth = await getAuth();

  await signInWithEmailAndPassword(auth, Email, Password)
  .then(() => {
    MySwal.fire({
      title: "Exito",
      text: "Inicio de seccion exitoso",
      icon: "success"
    });
  })
  .catch((error) => {
    console.log(error)
    let ErrorInvalidEmail = 'FirebaseError: Firebase: Error (auth/invalid-email).'
    let ErrorInvalidCredentials = 'FirebaseError: Firebase: Error (auth/invalid-credential).'
    if(error == ErrorInvalidEmail){
      console.log(error)
        MySwal.fire({
          title: "Error",
          text: "La direccion de correo electronico no es valida",
          icon: "error"
        });
      } else if(error == ErrorInvalidCredentials){
        console.log(error)
          MySwal.fire({
            title: "Error",
            text: "El correo electronico y la contraseña no coinciden",
            icon: "error"
          });
        }
        else{
          console.log(error)
        MySwal.fire({
          title: "Error",
          text: "Ha ocurrido un error al iniciar seccion",
          icon: "error"
        });
        }
})
}

//   try{
//     signInWithEmailAndPassword(auth, Email, Password)
//   } catch(error){
//     let ErrorInvalidEmail = 'FirebaseError: Firebase: Error (auth/invalid-email).'
//     if(error == ErrorInvalidEmail){
//       console.log(error)
//         MySwal.fire({
//           title: "Error",
//           text: "La direccion de correo eelectronico no es valida",
//           icon: "error"
//         });
//     }
//   }
// }



// -- Termina bloque para la autenticacion con diferentes provedores -- \\




  return (
    <>
    <title>D` VitiCars | Login</title>
    <div className="login_View">
    <div className="login_Container" id="container" ref={login_Container}>
        <div className="form-container sign-up-container showOnly col-sm-12">
            <form onSubmit={register}>
                <h1>Create Account</h1>
                <div className="social-container">
                    {/* <a className="social" onClick={handleOnClickGoogle}><GoogleIcon /></a> */}
                    {/* <a href="#" className="social"><FacebookIcon/></a>
                    <a href="#" className="social"><LinkedInIcon/></a> */}
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" id='newUserName'/>
                <input type="email" placeholder="Email" id='newUserEmail' />
                <input type="password" placeholder="Password" id='newUserPassword' />
                <button id='register-button' type='submit'>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container col-sm-12">
            <form onSubmit={handleOnClickEmail}>
                <h1>Sign in</h1>
                {/* <div className="social-container">
                  <a className="social" onClick={handleOnClickGoogle}><GoogleIcon /></a>
                  {/* <a className="social" onClick={handleOnClickEmail}><EmailOutlinedIcon/></a> */}
                    {/* <a href="#" className="social"><LinkedInIcon/></a> */}
                {/* </div>
                <span>or use your account</span> */}
                <input type="email" placeholder="Email" id='loginEmail' />
                <input type="password" placeholder="Password" id='loginPassword'/>
                <a href="/error404">Forgot your password?</a>
                <button id='submit-button' type='submit' >Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn" onClick={signIn}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={signUp}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    
    
      </>
  )
}

export default Login