import { useState, useRef } from 'react'
import VMasker from 'vanilla-masker'
import { toPng } from 'html-to-image'
import { Mail, MapPin, Phone, User } from 'lucide-react'

export default function App() {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [logo, setLogo] = useState('')
  const signatureRef = useRef()

  const [errors, setErrors] = useState({
    name: '',
    position: '',
    phone: '',
    email: '',
    address: '',
    logo: ''
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    const masked = VMasker.toPattern(value.replace(/\D/g, ''), '(99) 99999-9999')
    setPhone(masked)
  }

  const handleDownload = async () => {
    // Validação dos campos
    const newErrors = {
      name: name ? '' : 'Nome obrigatório',
      position: position ? '' : 'Cargo obrigatório',
      phone: phone ? '' : 'Telefone obrigatório',
      email: email ? '' : 'E-mail obrigatório',
      address: address ? '' : 'Endereço obrigatório',
      logo: logo ? '' : 'Logo da empresa obrigatório'
    }

    setErrors(newErrors)
    if (Object.values(newErrors).some(error => error)) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    try {
      const element = signatureRef.current
      if (!element) throw new Error('Elemento da assinatura não encontrado')

      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        style: {
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
        }
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${name.replace(/\s+/g, '_')}_assinatura.png`
      link.click()
    } catch (error) {
      console.error('Erro ao baixar a assinatura:', error)
      alert('Erro ao gerar imagem da assinatura.')
    }

    // Limpar os campos após o download
    setName('')
    setPosition('')
    setPhone('')
    setEmail('')
    setAddress('')
    setLogo('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <section className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center border-b pb-4">Crie sua assinatura digital</h1>

        <div className='flex flex-col gap-1'>
          {/* Nome completo */}
          <div>
            <label className="font-semibold">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setErrors({ ...errors, name: '' })
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Seu nome completo"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          {/* Cargo */}
          <div>
            <label className="font-semibold">Cargo</label>
            <input
              type="text"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value)
                setErrors({ ...errors, position: '' })
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Cargo na empresa"
            />
            {errors.position && <span className="text-red-500 text-xs">{errors.position}</span>}
          </div>

          {/* Telefone */}
          <div>
            <label className="font-semibold">Telefone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                handlePhoneChange(e)
                setErrors({ ...errors, phone: '' })
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="(99) 99999-9999"
              inputMode="numeric"
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>

          {/* E-mail */}
          <div>
            <label className="font-semibold">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors({ ...errors, email: '' })
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="email@exemplo.com"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          {/* Endereço */}
          <div>
            <label className="font-semibold">Endereço da unidade</label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                setErrors({ ...errors, address: '' })
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Rua, número, bairro, cidade e Estado"
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
          </div>


          {/* Logo da empresa */}
          <label className="font-semibold">Logo da empresa</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImageUpload(e)
              setErrors({ ...errors, logo: '' })
            }}
            className="w-full border-2 border-dashed border-gray-300 rounded-md p-2 cursor-pointer"
          />
          {errors.logo && <span className="text-red-500 text-xs">{errors.logo}</span>}
        </div>

        <section>
          <h2 className="text-center text-gray-600 font-semibold mt-5 mb-2 text-2xl">Pré-visualização</h2>
        </section>

        {/* Pré-visualização */}
        <article>

          <div
            ref={signatureRef}
            className="flex items-center gap-3 p-3"
          >
            {/* Logo da empresa */}
            {logo && (
              <img src={logo} alt="Logo" className="w-20 rounded-md" />
            )}

            <div className={`flex flex-col gap-1.5 justify-center pl-2 ${position || phone || email || address ? 'border-l border-slate-300' : ''}`}>
              {/* Nome do funcionário*/}
              <div className="font-medium text-ms">{name}</div>

              {/* Cargo */}
              <div className='flex gap-2 items-center'>
                {(position) && (
                  <div className='flex items-center gap-2'>
                    <User size={17} />
                    <div className='text-xs'>{position}</div>
                  </div>
                )}

                {/* Telefone corporativo */}
                {(phone) && (
                  <div className='flex items-center gap-2'>
                    <Phone size={17} />
                    <div className='text-xs'>{phone}</div>
                  </div>
                )}
              </div>

              {/* E-mail do funcionário */}
              {(email) && (
                <div className='flex items-center gap-2'>
                  <Mail size={17} />
                  <div className='text-xs'>{email.toLowerCase()}</div>
                </div>
              )}

              {/* Endereço da unidade */}
              {(address) && (
                <div className='flex items-center gap-2 mt-2'>
                  <MapPin size={17} />
                  <div className='text-xs'>{address}</div>
                </div>
              )}
            </div>
          </div>
        </article>

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4 cursor-pointer"
        >
          Baixar Assinatura
        </button>
      </section>
    </div>
  )
}
