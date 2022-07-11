import * as Yup from 'yup';
import 'yup-phone';

// fullname
let fullname = Yup.string().required('nome é obrigatório').trim();
// email
let email = Yup.string().required('email é obrigatório').email('e-mail é inválido').trim();
// phone
const phoneSchema = Yup.string().phone().required();
let phone = Yup.string()
  .transform((value) => value.replace(/[^\d]/g, ''))
  .test('validation_document', 'telefone/celular inválido', (value) => {
    return phoneSchema.isValid(`+55${value}`);
  });

export default { fullname, email, phone };
