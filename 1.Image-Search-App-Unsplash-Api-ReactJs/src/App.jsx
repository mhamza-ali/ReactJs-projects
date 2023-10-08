import axios from 'axios'
import {Form} from 'react-bootstrap'
import './index.css'
import { useEffect, useRef, useState } from 'react'

const Access_key = "0hnAtzQj1xfjmeNtflrXB5Aq0ZNtJ-tUB_AlFx2TaBQ"
const API_URL = "https://api.unsplash.com/search/photos"
const IMAGES_PER_PAGE = 20;

function App() {

  const searchInput = useRef(null);
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages]  = useState(0)
  const fetchImages = async () => {
    try {
      const {data} = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${Access_key}`)
      setImages(data.results)
      setTotalPages(data.total_pages)
    }
    
    catch (error) {
      console.log(error)
    }
  };

  const handleSearch = (event) =>{
    event.preventDefault()
    console.log(searchInput.current.value)
    fetchImages()
  }


  const handleSelection = (selection)=>{
    searchInput.current.value = selection
    fetchImages()
  }


  return (
    <div className='container'>
      <h1 className='title'>Image Search App</h1>
      <div className='search-input'>
      <Form onSubmit={handleSearch}>
        <Form.Control className='search-input' ref={searchInput} type="type" placeholder="Type something to search" />
      </Form>  
      </div>
      <div className='filters'>
      <div onClick={()=> handleSelection('nature')}>nature</div>
      <div onClick={()=> handleSelection('birds')}>Birds</div>
      <div onClick={()=> handleSelection('cars')}>Cars</div>

      </div>

      <div className='images'>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className='image'
              />
            ))}
          </div>

    </div>

  )
}

export default App
