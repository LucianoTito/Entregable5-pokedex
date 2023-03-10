import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/trainerName.slice'
import '../styles/home.css'


const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const handleSubmit = e => {
        e.preventDefault ()
        dispatch(setNameTrainer(e.target.name.value.trim()))  
        e.target.name.value= '' /*Para cambiar el DOM */
        navigate('/pokedex')       
    }

  return (
    <article className='home__article-container'>
        <img className='home__pokedex-svg' rel="svg"  alt="pokedex_logo"  src="/images/logo-pokedex.svg" />
        <h1 className='home__article-title'>Hi Trainer!</h1>
        <h2 className='home__article-subtitle'>Give your name, to start</h2>
        <form className='home__form' onSubmit={handleSubmit}>
            <input className='home__input' placeholder='enter you name...' id ='name' type="text" />
            <button className='home__button'>Start</button>
        </form>
        
        <footer className='home__footer'>
          <img className='home__pokeball' src="/images/pokeball (1).png" alt="pokeball" />
        </footer>
        
    </article>
  )
}

export default Home