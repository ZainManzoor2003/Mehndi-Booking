import { useState, useMemo, useCallback } from 'react'
import './CategoryCarousel.css'

const categories = [
  { id: 1, title: 'Bridal Mehndi', image: 'https://www.thesparklingwedding.com/wp-content/uploads/2024/09/cover_02.jpg' },
  { id: 2, title: 'Arabic Mehndi', image: 'https://www.thesparklingwedding.com/wp-content/uploads/2024/09/cover_02.jpg' },
  { id: 3, title: 'Indo-Arabic', image: 'https://www.thesparklingwedding.com/wp-content/uploads/2024/09/cover_02.jpg' },
  { id: 4, title: 'Traditional', image: 'https://www.thesparklingwedding.com/wp-content/uploads/2024/09/cover_02.jpg' },
  { id: 5, title: 'Contemporary', image: 'https://www.thesparklingwedding.com/wp-content/uploads/2024/09/cover_02.jpg' },
]

function CategoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const count = categories.length

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % count), [count])
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + count) % count), [count])

  const positioned = useMemo(() => {
    return categories.map((item, index) => {
      // Compute shortest circular distance in range [-2, 2]
      let diff = (index - activeIndex + count) % count
      if (diff > Math.floor(count / 2)) diff -= count
      return { ...item, index, diff }
    })
  }, [activeIndex])

  return (
    <section className="carousel-root">
      <div className="carousel-header">
        <h2>Explore Mehndi Categories</h2>
      </div>

      <div className="carousel-root-track">
        <button className="carousel-nav left" aria-label="Previous" onClick={goPrev}>
          <span>&lsaquo;</span>
        </button>
        <button className="carousel-nav right" aria-label="Next" onClick={goNext}>
          <span>&rsaquo;</span>
        </button>



        <div className="carousel-track">
          {positioned.map(({ id, title, image, diff }) => (
            <figure key={id} className={`carousel-card pos-${diff}`}>
              <img src={image} alt={title} loading="lazy" />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CategoryCarousel


