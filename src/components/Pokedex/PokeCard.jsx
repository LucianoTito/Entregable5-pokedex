import React, {useState,useEffect} from 'react'
import axios from 'axios'
import '../../styles/pokeCard.css';
import { useNavigate } from 'react-router-dom';

const PokeCard = ({pokemon}) => {

    const [poke, setPoke] = useState()

    const navigate =  useNavigate()

    useEffect(() => {
    
        axios.get(pokemon.url)
        .then(res => setPoke(res.data))
        .catch(err => console.log(err))
  
    }, [])

    const handleClick = () =>{
       navigate(`/pokedex/${poke.id}`) 
    }
    
  return (
   
      <article onClick={handleClick} className={`article__container border-${poke?.types[0].type.name}`}>
          <div className='card__border'>

              <header className={`header__container bg-${poke?.types[0].type.name}`}>
                  <img className='pokemon__img' src={poke?.sprites.other['official-artwork'].front_default} alt="" />
              </header>

              <section className='pokemon_body'>
                  <h2 className={`pokemon__name color-${poke?.types[0].type.name}`}>{poke?.name}</h2>
                  <div className='pokemon__types-container'>
                      <ul className='pokemon__type'>
                          {
                              poke?.types.map(type => (
                                  <li className='pokemon__type-data' key={type.type.name}>{type.type.name}</li>
                              ))
                          }
                      </ul>
                  </div>
                  <div className='pokemon__stats-container'>
                      <div className='pokemon__stats-separator'>
                          <ul className='pokemon__stats-list'>
                              {
                                  poke?.stats.map(stat => (
                                      <li className='pokemon__stats-data' key={stat.stat.url}>
                                          <span className='pokemon__stats-label stats__label-name'>{stat.stat.name}</span>
                                          <span className={`pokemon__stats-label label__value color-${poke?.types[0].type.name}` }>{stat.base_stat}</span>
                                      </li>
                                  ))
                              }
                          </ul>
                      </div>
                  </div>
              </section>
          </div>

      </article>

  )
}

export default PokeCard