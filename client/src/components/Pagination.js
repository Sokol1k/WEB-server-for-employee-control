import React from 'react'
import '../styles/pagination.scss'

function Pagination(props) {

  const changePage = (page) => {
    props.setPage(page)
  }

  const pages = () => {
    const item = []

    if (props.amountPage !== 1) {
      for (let i = 1; i <= props.amountPage; i++) {
        item.push((
          <li key={i} className="page-item"><button onClick={() => changePage(i)} className={`page-link ${i === +props.currentPage ? 'current' : ''}`}>{i}</button></li>
        ))
      }
      return item
    } else {

      return null

    }
  }

  return (
    <div className="text-center">
      <nav className="mt-2 d-inline-flex">
        <ul className="pagination flex-wrap">
          {
            props.prevPage
              ?
              <li className="page-item"><button onClick={() => changePage(props.prevPage)} className="page-link">Previous</button></li>
              :
              null
          }
          {
            pages()
          }
          {
            props.nextPage
              ?
              <li className="page-item"><button onClick={() => changePage(props.nextPage)} className="page-link">Next</button></li>
              :
              null
          }
        </ul>
      </nav>
    </div>
  )
}

export default Pagination