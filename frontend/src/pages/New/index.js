import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({history}){
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },[thumbnail]
    );

    async function handleSubmit(event){
        event.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('technologies', technologies);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})`}} 
                className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">EMPRESA*</label>
            <input type="text" id="company" placeholder="Sua empresa incrível" value={company} 
            onChange={event => setCompany(event.target.value)} />

            <label htmlFor="tech">TECNOLOGIAS* <span>(separadas por vírgula)</span></label>
            <input type="text" id="tech" placeholder="Quais technologias utilizam"
            value={technologies} onChange={event => setTechnologies(event.target.value)} />

            <label htmlFor="price">VALOR DA DIÁRIA <span>(em branco para GRATUITO)</span></label>
            <input type="text" id="price" placeholder="Valor cobrado por dia" value={price} 
            onChange={event => setPrice(event.target.value)} />

            <button type="submit" className="btn">Cadastrar spot</button>

        </form>
    )
}