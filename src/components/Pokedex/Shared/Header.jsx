import React from 'react'
import './styles/header.css'

const Header = () => {
  return (
      <div className='pokedex'>
          <header className='pokedex__header'>

              <img className='pokedex_svg' src="../../public/logo-pokedex.svg" alt="pokedex_image" />
             
          </header>
          <div className='podekex__circle-container'>
              {/* <div className='pokedex__circle-1'></div>
              <div className='pokedex__circle'></div> */}
          </div>

      </div>
  )
}

export default Header