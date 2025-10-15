import '../../src/App.css'

function Card({ produto }){
    const imagem = produto?.imagem || 'https://via.placeholder.com/320x180?text=Sem+imagem'
    const nome = produto?.nome || 'Produto sem nome'
    const marca = produto?.marca || 'Marca não informada'
    const categoria = produto?.categoria || 'Categoria não informada'
    const subcategoria = produto?.subcategoria || 'Subcategoria não informada'
    const preco = produto?.preco || '---'

    return (
        <div className='bg-cinza-vibrante rounded-lg w-80 flex flex-col items-start'>
            <img src={imagem} alt={`Capa do ${nome}`} className='w-full h-48 rounded-t-lg' />
            <div className='flex flex-col p-6 items-start gap-2'>
                <p className='text-xl font-semibold font-titulo-vibrante-tec-2 text-white'>{nome}</p>
                <p className='text-sm font-medium text-azul-destaque'>Marca: {marca}</p>
                <p className='text-sm font-medium text-azul-destaque'>Categoria: {categoria}</p>
                <p className='text-sm font-medium text-azul-destaque'>Subcategoria: {subcategoria}</p>
                <p className='text-sm font-medium text-azul-destaque'>Preço base: R$ {preco}</p>
            </div>
            <div className='flex justify-between items-center gap-4 px-4 py-4'>
                <button className='py-2 px-2 bg-preto-vibrante rounded-lg'><a href="/agendar" className='font-texto-vibrante-tec text-azul-destaque font-semibold'>Agendar entrega</a></button>
                <button className='py-2 px-2 bg-preto-vibrante rounded-lg'><a href={`/alterando/${produto?.id}`} className='font-texto-vibrante-tec text-azul-destaque font-semibold'>Alterar</a></button>
                <button className='py-2 px-2 bg-vermelho-vibrante rounded-lg'><a href={`/reviews/${produto?.id}`} className='font-texto-vibrante-tec text-ciano-destaque font-semibold'>Ver Reviews</a></button>
            </div>
        </div>
    )
}

export default Card