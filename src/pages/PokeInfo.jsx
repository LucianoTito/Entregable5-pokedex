import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Pokedex/Shared/Header';
import '../styles/pokeInfo.css'
import '../components/Pokedex/Shared/styles/errorMessage.css'




const PokeInfo = () => {
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();
  const [poke, setPoke] = useState();

  const handleBackClick = () => {
    window.history.back();
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const [Loading, setLoading] = useState(false)



  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    setLoading(true)
    axios.get(url)
      .then(res => {
        setPoke(res.data);
        setHasError(false);
      })  
      .catch(err => {
        setHasError(true);
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
           
  }, [id]);

  if (hasError) {
    return <> <body className='body__error'><article className='article__error'><h1 className='title__error'>The Pokemon with name "{id}" not found</h1><img className='img__error' src="/images/pokemon_error.svg" alt="poke_error" /><button className='return__button' onClick={handleBackClick}>Back</button></article></body>  </>;
    
  } else {
    return (
        <>        
        <Header/>
        <img className='pokeball__header' src="/images/pokeball (1).png" alt="pokeball" /> 

        {
          Loading ? (<img className= 'loading__gif'src="images/loading.gif" alt="pokeball_gif" />) : (
            
            <>
            <section className='poke__info-article'>

              <header className={`poke__info-header bg-${poke?.types[0].type.name}`}>
                <img className='pokemon__info-img' src={poke?.sprites.other['official-artwork'].front_default} alt="" />
              </header>

              <section className='pokemon__info-body'>
              <h2 className={`pokemon__info-id color-${poke?.types[0].type.name}`}>#{poke?.id}</h2>
                <div className='vector__1'></div>
                <div className='vector__2'></div>
                <h1 className={`pokemon__info-name color-${poke?.types[0].type.name}`}>{poke?.name}</h1>

                <div className='pokemon__info-container'>
                  <ul className='pokemon__info-type'>
                    <li className='pokemon__info-type-data'>
                      <h3>Weight:</h3>
                      <p>{poke?.weight}</p>
                    </li>
                    <li className='pokemon__info-type-data'>
                      <h3>Height:</h3>
                      <p>{poke?.height}</p>
                    </li>
                    <li className='pokemon__info-type-data'>
                      <h3>Types:</h3>
                      <div className='pokemon__info-type-values'>
                        {poke?.types.map((type) => (
                          <span className='span__1' key={type.type.name}>{type.type.name}</span>
                        ))}
                      </div>
                    </li>
                    <li className='pokemon__info-type-data'>
                      <h3>Abilities:</h3>
                      <div className='pokemon__info-type-values'>
                        {poke?.abilities.map((ability) => (
                          <span key={ability.ability.name}>{ability.ability.name}</span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='pokemon__info-stats-container'>
                  <div className='pokemon__info-stats-separator'>
                    <div className='vector__3'></div>
                    <img className='pokeball' src="/images/pokeball.png" alt="pokeball_grey" />
                    <h3 className='pokemon__info-stats-name'>Stats</h3>
                    <ul className='pokemon__info-stats-list'>
                      {poke?.stats.map(stat => (
                        <li className='pokemon__info-stats-data' key={stat.stat.url}>
                          <span className='pokemon__info-stats-labels'>{stat.stat.name}:</span>
                          <span className='label__value'>{stat.base_stat}/150</span>
                          <div className='pokemon__stats-progress-bar'>
                            <div className={`pokemon__stats-progress color-${poke?.types[0].type.name}`} style={{ width: `${stat.base_stat / 150 * 100}%` }}></div>
                          </div>

                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


              </section>
            </section><article className='poke__info-card-2'>
                <header className='poke__info-card-2-header'>

                  <h3 className='card__2-name'>Movements</h3>
                  <img className='pokeball__2' src="/images/pokeball.png" alt="pokeball_grey" />
                  <div className='vector__4'></div>
                </header>
                <section className='poke__body-card-2'>
                  <ul className='card__2-ul'>
                    {poke?.moves.slice(0, 25).map(move => (
                      <li className='card__2-li' key={move.move.name}>{move.move.name}</li>
                    ))}
                  </ul>
                </section>
              </article>
              <footer className='poke__info-footer'>
                <button className='return__button' onClick={handleBackClick}>Back</button>
                <button className='scroll__button' onClick={handleScrollToTop}>Go top</button>
              </footer>
              </>

                )
                }

                
        </>
       
      
    );
  }
};

export default PokeInfo;
