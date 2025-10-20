import React from 'react'
import type { Item } from '../types'

const ItemCard: React.FC<{ item: Item; formatter: (value: number, currency?: string) => string }> = ({ item, formatter }) => {
  const img = item.images[0]
  return (
    <article className="card" aria-label={item.title}>
      <img
        className="card-img"
        src={img.url}
        alt={img.alt}
        width={img.width ?? 400}
        height={img.height ?? 400}
        loading="lazy"
      />
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <div className="price" aria-label={`Price ${formatter(item.price.value, item.price.currency)}`}>
          {formatter(item.price.value, item.price.currency)}
        </div>
        <div className="badges" aria-label="Categories">
          {item.categories.map((c) => (
            <span className="badge" key={c}>{c}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ItemCard
