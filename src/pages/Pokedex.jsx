import { useSelector } from 'react-redux'
import axios from 'axios'
import PokeCard from '../components/Pokedex/PokeCard'
import React, {useEffect,useState} from 'react'
import '../styles/pokedex.css'
import '../styles/selecTypes.css'
import '../components/Pokedex/Shared/styles/loading.css'
import '../components/Pokedex/Shared/styles/loading.css'
import { useNavigate } from 'react-router-dom'
import SelectTypes from '../components/Pokedex/SelectTypes'

const Pokedex = () => {

  const {nameTrainer} =  useSelector(state=>state)

  const [pokemons, setPokemons] = useState()

  const [selectValue, setSelectValue] = useState('allpokemons')

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const [Loading, setLoading] = useState(false)

  

  useEffect(() => {
    if (selectValue ==='allpokemons') {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=102&offset=0"
      setLoading(true)
    axios.get(url)
    .then (res=> setPokemons(res.data))
    .catch(err=>console.log(err)) 
    .finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    });
    } 
    else {

      setLoading(true)
      axios.get(selectValue)
      .then(res=> {
        const results = res.data.pokemon.map( e=> e.pokemon)
        setPokemons({results})})
      .catch(err=> console.log(err))
      .finally(setTimeout(() => {
        setLoading(false)
      }, 1000))
    }
    
  }, [selectValue])

 const navigate =  useNavigate()

  const handleSubmit = e =>{
    e.preventDefault()
    const inputValue = e.target.pokemon.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
    e.target.pokemon.value = ''
    }
     
  
  return (
  
<article className='pokedex'>
  
  <header className='pokedex__header'>
   
    <img className='pokedex_svg' src="/images/logo-pokedex.svg" alt="pokedex_logo" />
    <img className= 'pokeball__header'src="images/pokeball (1).png" alt="pokeball" />
    
  </header>
      {
        Loading ?
          (<img className= 'loading__gif'src="images/loading.gif" alt="pokeball_gif" />)
          :
          (
            <div>
              <h1 className='pokedex__title'><span className='pokedex__title-name'> {nameTrainer}</span>, here you can find your favorite pokemon</h1>
              <div className='navigator__container'>
                <form className='form' onSubmit={handleSubmit}>

                  <input id='pokemon' type="text" placeholder="search a pokemon" className='form__input' />
                  <button className='form__btn'>Search</button>
                  <SelectTypes setSelectValue={setSelectValue} className='form__select' />
                </form>
              </div>

              <section className='pokedex__container-pokemon'>
                {
                  pokemons?.results.map(pokemon => (
                    <PokeCard
                      key={pokemon.url}
                      pokemon={pokemon} />
                  ))
                }
              </section>

              <footer className='pokedex__footer'>
                <button className='return__pokedex-button' onClick={handleBackClick}>Back page</button>
                <button className='scroll__button' onClick={handleScrollToTop}>Go top</button>

              </footer>
            </div>
          )
      }
   
  
</article>

  )
}

export default Pokedex
