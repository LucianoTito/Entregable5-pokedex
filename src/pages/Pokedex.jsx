import { useSelector } from 'react-redux'
import axios from 'axios'
import PokeCard from '../components/Pokedex/PokeCard'
import React, {useEffect,useState} from 'react'
import '../styles/pokedex.css'
import '../styles/selecTypes.css'
import { useNavigate } from 'react-router-dom'
import SelectTypes from '../components/Pokedex/SelectTypes'

const Pokedex = () => {

  const {nameTrainer} =  useSelector(state=>state)

  const [pokemons, setPokemons] = useState()

  const [selectValue, setSelectValue] = useState('allpokemons')

  

  useEffect(() => {
    if (selectValue ==='allpokemons') {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=102&offset=0"
    axios.get(url)
    .then (res=> setPokemons(res.data))
    .catch(err=>console.log(err)) 
    } else {
      axios.get(selectValue)
      .then(res=> {
        const results = res.data.pokemon.map( e=> e.pokemon)
        setPokemons({results})})
      .catch(err=> console.log(err))
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
<div className='pokedex'>
  <header className='pokedex__header'>
   
    <img className='pokedex_svg' src="/images/logo-pokedex.svg" alt="pokedex_logo" />
    <img className= 'pokeball__header'src="images/pokeball (1).png" alt="pokeball" />
    
  </header>
  <h1 className='pokedex__title'><span className='pokedex__title-name'> {nameTrainer}</span>, here you can find your favorite pokemon</h1>
  <div className='navigator__container'>
  <form className='form' onSubmit={handleSubmit}>
  
    <input id='pokemon' type="text" placeholder="search a pokemon" className='form__input'/>
    <button className='form__btn'>Search</button>
    <SelectTypes setSelectValue={setSelectValue} className='form__select'/>  
</form>
</div>
 
  <div className='pokedex__container-pokemon'>
    {
      pokemons?.results.map(pokemon => (
        <PokeCard
          key={pokemon.url} 
          pokemon={pokemon} />
      ))
    }
  </div>
</div>

  )
}

export default Pokedex
