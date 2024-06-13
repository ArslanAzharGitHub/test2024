import bcrypt from 'bcrypt';

const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10, 'a');
    password = bcrypt.hashSync(password, salt);
    return password
}

export default hashPass;