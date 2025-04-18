import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import VMasker from 'vanilla-masker'

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

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null
      })

      const dataURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'assinatura.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Erro ao baixar a assinatura:', error)
      alert('Ocorreu um erro ao baixar a assinatura. Por favor, tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-4">
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
            className="w-full border-2 border-dashed border-gray-400 rounded-md p-2"
          />
        </div>

        <div>
          <h2 className="text-center text-gray-600 font-semibold mt-6 mb-2">Pré-visualização</h2>
          <div
            ref={signatureRef}
            className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            {logo && (
              <img src={logo} alt="Logo" className="h-22 object-contain border-r pr-2" />
            )}
            <div className="flex flex-col gap-1">
              <div className='flex items-center gap-1'>
                <box-icon name='user'></box-icon>
                <span className="text-xl ">{name}</span>
              </div>
              <div className='flex items-center gap-1'>
                <box-icon name='phone'></box-icon>
                <span className='text-sm'>{phone}</span>
              </div>
              <div className='flex items-center gap-1'>
                <box-icon name='envelope' size='sm'></box-icon>
                <span className='text-sm'>{email}</span>
              </div>
              <div className='flex items-center gap-1 mt-3'>
                <box-icon name='home' size='sm'></box-icon>
                <span className='text-sm'>{address}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4"
        >
          Baixar Assinatura
        </button>
      </div>
    </div>
  )
}
