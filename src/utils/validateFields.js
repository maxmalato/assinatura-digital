export function validateFields({ name, position, phone, email, address, logo }) {
  return {
    name: name ? '' : 'Nome obrigatório',
    position: position ? '' : 'Cargo obrigatório',
    phone: phone ? '' : 'Telefone obrigatório',
    email: email ? '' : 'E-mail obrigatório',
    address: address ? '' : 'Endereço obrigatório',
    logo: logo ? '' : 'Logo da empresa obrigatório'
  }
}