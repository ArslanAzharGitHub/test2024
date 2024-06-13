const Login = async () => {
    console.log('Login is working fromadmin controllers');
}
const Register = async () => {
    console.log('Register is working fromadmin controllers');
}


const CreateProduct = async () => {
    console.log('create Product is working from admin controllers');
    return {
        message: 'Success'
    }
}



export {
    Login,
    Register,
    CreateProduct
}