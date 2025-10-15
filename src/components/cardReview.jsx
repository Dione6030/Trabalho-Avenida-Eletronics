import '../app.css'

function CardReview({ review }){
    const usuario = review?.usuario || 'Anônimo'
    const avaliacao = review?.avaliacao || '---'
    const comentario = review?.comentario || 'Sem comentário'

    return (
        <div className='bg-cinza-vibrante rounded-lg w-72 flex items-start m-4'>
            <img src="/Imagens de perfil1.png" alt="imagem de perfil" className='w-16 h-16 rounded-full' />
            <div className='flex flex-col p-8 items-start gap-3'>
                <h3 className='text-xl font-semibold font-titulo-vibrante-tec-2 text-white'>Usuário: {usuario}</h3>
                <h4 className='text-lg font-medium text-azul-destaque'>Avaliação: {avaliacao}/5</h4>
                <p className='text-lg font-medium text-azul-destaque'>Comentário: {comentario}</p>
            </div>
        </div>
    );
}

export default CardReview