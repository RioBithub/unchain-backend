import { BadRequest } from "../errors/BadRequest.js";
import wrapper from "../wrapper/wrapper.js";


const validateSchema = (schema, payload)=>{
  const result = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false
  })
  if (result.error) {
    return wrapper.error(new BadRequest(result.error.message));
  }
  return result.value
}

export {
  validateSchema
}