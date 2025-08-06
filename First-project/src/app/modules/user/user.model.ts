import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
    id : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },
    needsPasswordChange:{
        type : Boolean,
        default : true, 
    },
    role : {
        type : String,
        enum : ['student','faculty','admin'],
    },
    status: {
        type : String,
        enum : ['i-progress','blocked'],
        default: 'i-progress',
    },
    isDeleted :{
        type : Boolean,
        default : false,
    }
},
    {
        timestamps : true,
    },
);



export const USer = model<TUser>('User',userSchema);
