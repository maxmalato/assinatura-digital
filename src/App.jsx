import { useState, useRef } from 'react'
import VMasker from 'vanilla-masker'
import { toPng } from 'html-to-image'
import toast, { Toaster } from 'react-hot-toast'
import InputField from './components/InputField'
import FileUpload from './components/FileUpload'
import SignaturePreview from './components/SignaturePreview'
import { validateFields } from './utils/validateFields'

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
    const newErrors = validateFields({ name, position, phone, email, address, logo })

    setErrors(newErrors)
    if (Object.values(newErrors).some(error => error)) {
      toast.error('Por favor, preencha todos os campos.')
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
      toast.error('Erro ao gerar imagem da assinatura.')
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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <section className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center border-b pb-4">Crie sua assinatura digital</h1>

        <div className='flex flex-col gap-2'>
          {/* Nome completo */}
          <InputField
            label={"Nome completo"}
            type={"text"}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErrors({ ...errors, name: '' })
            }}
            placeholder={"Nome completo do funcionário"}
            error={errors.name}
          />

          {/* Cargo */}
          <InputField
            label={"Cargo"}
            type={"text"}
            value={position}
            onChange={(e) => {
              setPosition(e.target.value)
              setErrors({ ...errors, position: '' })
            }}
            placeholder={"Cargo do funcionário"}
            error={errors.position}
          />

          {/* Telefone */}
          <InputField
            label={"Telefone corporativo"}
            type={"text"}
            value={phone}
            onChange={e => {
              handlePhoneChange(e)
              setErrors({ ...errors, phone: '' })
            }}
            placeholder={"(99) 99999-9999"}
            error={errors.phone}
          />

          {/* E-mail */}
          <InputField
            label={"E-mail do funcionário"}
            type={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors({ ...errors, email: '' })
            }}
            placeholder={"E-mail do funcionário"}
            error={errors.email}
          />

          {/* Endereço */}
          <InputField
            label={"Endereço da unidade"}
            type={"text"}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
              if (e.target.value.length < 5) {
                setErrors({ ...errors, address: 'Endereço inválido' })
              }
              else setErrors({ ...errors, address: '' })
            }}
            placeholder={"Endereço da unidade"}
            error={errors.address}
          />

          {/* Logo da empresa */}
          <FileUpload
            onChange={e => {
              handleImageUpload(e)
              setErrors({ ...errors, logo: '' })
            }}
            error={errors.logo}
          />
        </div>

        <section>
          <h2 className="text-center text-gray-600 font-semibold mt-5 mb-2 text-2xl">Pré-visualização</h2>
        </section>

        {/* Pré-visualização */}
        <article>
          <SignaturePreview
            name={name}
            position={position}
            phone={phone}
            email={email}
            address={address}
            logo={logo}
            signatureRef={signatureRef}
          />
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
