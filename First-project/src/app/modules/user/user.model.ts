import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>({
    id : {
        type : String,
        required : true,
        unique:true
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



userSchema.pre('save',async function(next){
  // console.log(this, 'pre hook : ');

  const user = this 

  //hashing password only if password exists
  if (user.password) {
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds),);
  }
  next();

})

//post save middleware /hook 
userSchema.post('save',function(doc,next){
  doc.password = ''

  next();
})



export const User = model<TUser>('User',userSchema);
