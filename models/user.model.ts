
import { models, model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    isActive: {
        type: Boolean,
        default: true
      },
    createdAt: { type: Date, default: new Date() },
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;









// import { models, model, Schema } from 'mongoose';

// const UserSchema: Schema = new Schema({
//     fullName: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     mobile: { type: String, required: true, unique: true },
//     age : {type :String,required: true},
//     gender: {
//         type: String,
//         enum: ['Male', 'Female', 'Other'],
//         required: true
//     },
//     address: { type: String },
//     height: { type: Number },
//     weight: { type: Number,required: true },
//     alcoholConsumption: {
//         type: String,
//         enum: ['None', 'Moderate', 'Heavy']
//     },
//     smokingStatus: {
//         type: String,
//         enum: ['Non-Smoker', 'Ex-Smoker', 'Current-Smoker']
//     },
//     physicalActivity: {
//         type: String,
//         enum: ['Sedentary', 'Moderate', 'Active']
//     },
//     token: { type: String, default: '' },
//     isActive: {
//         type: Boolean,
//         default: true
//       },
//     createdAt: { type: Date, default: new Date() },
// });

// const UserModel = models.User || model('User', UserSchema);

// export default UserModel;




