import jwt from 'jsonwebtoken'

export const generateToken = async (userId)=>{
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn: '7d'
        })
        return token;
    } catch (error) {
        console.log('token error:',error);
    }
}

export const generateToken1 = async (email)=>{
    try {
        const token = jwt.sign({email},process.env.JWT_SECRET,{
            expiresIn: '1d'
        })
        return token;
    } catch (error) {
        console.log('token error:',error);
    }
}