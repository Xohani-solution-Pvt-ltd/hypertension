import { models, model, Schema, SchemaTypes, SchemaType, Model } from 'mongoose';
import { boolean } from 'yup';

const ComorbiditiesSchema:Schema= new Schema({
    userid: { type: SchemaTypes.ObjectId, ref: "User" , index: true,unique: true },
    cva:{
         type:Boolean,
         default: false
       },
      heartFailure: {
        type: Boolean,
        default: false
      },
      diabetes: {
        type: Boolean,
        default: false
      },
      pregnancy: {
        type: Boolean,
        default: false
      },
      lungDisease: {
        type: Boolean,
        default: false
      },
      coronaryArteryDisease: { userid: { type: SchemaTypes.ObjectId, ref: "User" , index: true,unique: true },
        type: Boolean,
       default: false
      },
    createdAt:{type:Date,default:new Date()},
});
const ComorbiditiesModel= models.Comorbidities || model('Comorbidities',ComorbiditiesSchema)

export default ComorbiditiesModel;