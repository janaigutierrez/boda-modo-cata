const ImagePlaceholder = ({ size = 'medium', text, icon }) => {
    const sizes = {
        small: 'w-32 h-32',
        medium: 'w-64 h-64',
        large: 'w-96 h-96',
        hero: 'w-full h-96'
    }

    return (
        <div className={`
      ${sizes[size]} 
      bg-gradient-to-br from-gray-100 to-gray-200 
      rounded-3xl flex flex-col items-center justify-center
      border-2 border-dashed border-gray-300
      text-gray-500
    `}>
            <div className="text-4xl mb-2">{icon || '📷'}</div>
            <p className="text-sm text-center px-4">
                {text || 'Foto próximamente'}
            </p>
        </div>
    )
}

export default ImagePlaceholder