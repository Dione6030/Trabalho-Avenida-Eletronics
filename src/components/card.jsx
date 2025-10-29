import '../../src/App.css'
import Swal from 'sweetalert2'
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';

function Card({ produto }){
    const imagem = produto?.imagem || 'https://via.placeholder.com/320x180?text=Sem+imagem'
    const nome = produto?.nome || 'Produto sem nome'
    const marca = produto?.marca || 'Marca não informada'
    const categoria = produto?.categoria || 'Categoria não informada'
    const subcategoria = produto?.subcategoria || 'Subcategoria não informada'
    const preco = produto?.preco || '---'

    const [reviewsCount, setReviewsCount] = useState(0)
    const [media, setMedia] = useState(0)

    useEffect(() => {
        let abort = false
        async function carregarReviews() {
            try {
                const id = produto?.id
                if (!id) return
                const resp = await fetch(`http://localhost:3000/reviews?produtoId=${id}`)
                if (!resp.ok) throw new Error('Erro ao buscar reviews')
                const lista = await resp.json()
                if (abort) return
                const countagem = Array.isArray(lista) ? lista.length : 0
                const soma = countagem > 0 ? lista.reduce((acc, r) => acc + Number(r.avaliacao || 0), 0) : 0
                const contaMedia = countagem > 0 ? soma / countagem : 0
                setReviewsCount(countagem)
                setMedia(contaMedia)
            } catch {
                // Mantém como zero em caso de erro
                if (!abort) {
                    setReviewsCount(0)
                    setMedia(0)
                }
            }
        }
        carregarReviews()
        return () => { abort = true }
    }, [produto?.id])

    function estrelas(contaMedia) {
        const estrela = []

        for (let i = 1; i <= 5; i++) {

            if (contaMedia >= i) estrela.push(<FaStar key={i} className="text-yellow-400" />)

            else if (contaMedia >= i - 0.5) estrela.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)

            else estrela.push(<FaRegStar key={i} className="text-yellow-400" />)
        }
        return <div className="flex items-center gap-1">{estrela}</div>
    }

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
            {reviewsCount === 0 ? (
                <div className='flex items-center gap-2 px-6 pb-2'>
                    <img src="/New.png" alt="Novo" className='h-6 w-auto' />
                    <span className='text-sm text-azul-destaque'>(Sem reviews ainda)</span>
                </div>
            ) : (
                <div className='flex items-center gap-2 px-6 pb-2'>
                    {estrelas(media)}
                    <span className='text-sm text-white'>{media.toFixed(1)} ({reviewsCount})</span>
                </div>
            )}
            <div className='flex justify-between items-center gap-4 px-4 py-4'>
                <button className='py-2 px-2 bg-preto-vibrante rounded-lg'><a href={`/agendar/${produto?.id}`} className='font-texto-vibrante-tec text-azul-destaque font-semibold'>Agendar entrega</a></button>
                <button className='py-2 px-2 bg-preto-vibrante rounded-lg'><a href={`/alterando/${produto?.id}`} className='font-texto-vibrante-tec text-azul-destaque font-semibold'>Alterar</a></button>
                <button className='py-2 px-2 bg-vermelho-vibrante rounded-lg'><a href={`/reviews/${produto?.id}`} className='font-texto-vibrante-tec text-ciano-destaque font-semibold'>Ver Reviews</a></button>
            </div>
        </div>
    )
}

export default Card