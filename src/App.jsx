import { useState, useRef } from 'react'
import VMasker from 'vanilla-masker'
import { toPng } from 'html-to-image'
import { Home, Mail, Phone } from 'lucide-react'

export default function App() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [logo, setLogo] = useState('')
  const signatureRef = useRef()

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
    try {
      const element = signatureRef.current
      if (!element) throw new Error('Elemento da assinatura não encontrado')

      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'assinatura.png'
      link.click()
    } catch (error) {
      console.error('Erro ao baixar a assinatura:', error)
      alert('Erro ao gerar imagem da assinatura.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <section className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center border-b pb-4">Crie sua assinatura digital</h1>

        <div className="space-y-2">
          {/* Nome completo */}
          <label className="font-semibold">Nome completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Seu nome completo"
          />

          {/* Telefone */}
          <label className="font-semibold">Telefone</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="(99) 99999-9999"
            inputMode="numeric"
          />

          {/* Endereço */}
          <label className="font-semibold">Endereço</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Rua, número, bairro, cidade"
          />

          {/* E-mail */}
          <label className="font-semibold">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="email@exemplo.com"
          />

          {/* Logo da empresa */}
          <label className="font-semibold">Logo da empresa</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border-2 border-dashed border-gray-300 rounded-md p-2 cursor-pointer"
          />
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
            {logo && (
              <img src={logo} alt="Logo" className="size-26 rounded-md" />
            )}
            <div className="flex flex-col gap-1 justify-center border-l pl-2">

              <div className="font-semibold text-xl">{name}</div>

              <div className='flex items-center gap-2'>
                <Mail size={18} />
                <div className='text-sm'>{email}</div>
              </div>

              <div className='flex items-center gap-2'>
                <Phone size={18} />
                <div className='text-sm'>{phone}</div>
              </div>

              <div className='flex items-center gap-2'>
                <Home size={18} />
                <div className='text-sm'>{address}</div>
              </div>
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
