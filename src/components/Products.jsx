import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Products = () => {
    const [query, setQuery] = useState('노트북')
    const [products, setProducts] = useState(null);
    const callAPI = async() => {
        const url='/v1/search/shop.json';
        const config = {
            headers:{'X-Naver-Client-Id': 'DSISkunI4gxjpwj6Yl6J',
                     'X-Naver-Client-Secret': 'CxLnF9_VmQ'},
            params:{'query':query, 'display':8, 'start':1}
        }
        const result = await axios(url, config);
        console.log(result.data.items);
        setProducts(result.data.items);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
    }

    if(products === null) return <h1>로딩중......</h1>
    return (
        <div>
            <h1>상품검색</h1>
            <form onSubmit={onSubmit}>
                <input value={query} onChange={(e)=>setQuery(e.target.value)}/>
                <button>검색</button>
            </form>
            <hr/>
            <div className='products'>
                {products.map(p=>
                    <div key={p.productId} className='product'>
                        <img src={p.image}/>
                        <div className='ellipsis title'dangerouslySetInnerHTML={{__html: p.title}}></div>
                        <div>{p.lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                    </div>    
                )}
            </div>
        </div>
    )
}

export default Products