import '../app.css'

function Card({ produto, setProdutos }){
    return (
        <div className='bg-cinza-vibrante rounded-lg w-64 flex flex-col items-start'>
            <img src={produto.imagem} alt="Capa do Produto" className='w-full h-auto rounded-t-lg object-cover' />
            <div className='flex flex-col p-8 items-start gap-3'>
                <h3 className='text-xl font-semibold font-titulo-vibrante-tec-2 text-white'>{produto.nome}</h3>
                <h4 className='text-lg font-medium text-azul-destaque'>Marca: {produto.marca}</h4>
                <p className='text-lg font-medium text-azul-destaque'>Categoria: {produto.categoria}</p>
                <p className='text-lg font-medium text-azul-destaque'>Preço base: R$ {produto.preco}</p>
                <p className='text-lg font-medium text-azul-destaque'>Disponível nas regiões: {produto.regioes.join('/ ')}</p>
            </div>
            <div className='flex justify-between items-center gap-4 px-8 py-4'>
                <button className='py-2 px-2 bg-preto-vibrante rounded-lg'><a href="/agendamento" className='font-texto-vibrante-tec text-azul-destaque font-semibold'>Agendar entrega</a></button>
                <button><a href="/src/Alterando.jsx">Alterar</a></button>
                <button className='py-2 px-2 bg-vermelho-vibrante rounded-lg'><a href="/reviews" className='font-texto-vibrante-tec text-ciano-destaque font-semibold'>Ver Reviews</a></button>
            </div>
        </div>
)}

export default Card