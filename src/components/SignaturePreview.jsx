import { Mail, MapPin, Phone, User } from 'lucide-react'

export default function SignaturePreview({ name, position, phone, email, address, logo, signatureRef }) {
    return (
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
                <div className="font-medium text-sm truncate max-w-[320px]">{name.toUpperCase()}</div>

                {/* Cargo */}
                <div className='flex gap-2 items-center'>
                    {(position) && (
                        <div className='flex items-center gap-2'>
                            <User size={17} />
                            <div className='text-xs truncate max-w-[150px]'>{position}</div>
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
                        <div className='text-xs truncate max-w-[250px]'>{email.toLowerCase()}</div>
                    </div>
                )}

                {/* Endereço da unidade */}
                {(address) && (
                    <div className='flex items-center gap-2 mt-2'>
                        <MapPin size={17} />
                        <div className='text-xs truncate max-w-[250px]'>{address}</div>
                    </div>
                )}
            </div>
        </div>
    )
}