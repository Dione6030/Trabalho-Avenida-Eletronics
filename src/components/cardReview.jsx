import '../app.css'

function CardReview({ review, setReviews }){
    return (
        <div className='bg-cinza-vibrante rounded-lg w-64 flex items-start m-4'>
            <img src="./Imagens de perfil1.png" alt="imagem de perfil" className='w-16 h-16 rounded-full' />
            <div className='flex flex-col p-8 items-start gap-3'>
                <h3 className='text-xl font-semibold font-titulo-vibrante-tec-2 text-white'>Nome: {/*review.nome*/}</h3>
                <h4 className='text-lg font-medium text-azul-destaque'>Nota: {/*review.nota*/}/5</h4>
                <p className='text-lg font-medium text-azul-destaque'>Comentário: {/*review.comentario*/}</p>
            </div>
        </div>
    );
}

export default CardReview