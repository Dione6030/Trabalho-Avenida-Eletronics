import '../app.css'

export default function Card() {

    return (
        <div className='bg-cinza-vibrante rounded-b-lg w-80 flex flex-col items-start'>
            <img src="" alt="Capa do Produto" className='w-full h-48 object-cover' />
            <div className='flex flex-col p-8 items-start gap-3'>
                <h3 className='text-xl font-semibold font-titulo-vibrante-tec-2 text-white'></h3>
                <h4 className='text-lg font-medium text-azul-destaque'></h4>
                <p className='text-lg font-medium text-azul-destaque'>Preço base: R$</p>
                <p className='text-lg font-medium text-azul-destaque'>Disponível nas regiões: </p>
            </div>
            <div className='flex justify-between items-center gap-4 px-8 py-4'>
                <button className='py-2 px-2 bg-preto-vibrante rounded-lg'><a href="/agendamento" className='font-texto-vibrante-tec text-azul-destaque font-semibold'>Agendar entrega</a></button>
                <button className='py-2 px-2 bg-vermelho-vibrante rounded-lg'><a href="/reviews" className='font-texto-vibrante-tec text-ciano-destaque font-semibold'>Ver Reviews</a></button>
            </div>
        </div>
    )
}