import { useState, useEffect } from 'react'
export default function Pagination({ perPage = 9, currentPage = 1, length, visibleButtons = 5, cbAfterPageChange = f => f }) {
  const [pages, setPages] = useState({})
  const [buttonLength, setButtonLength] = useState(0)

  const [curPage, setCurrentPage] = useState(currentPage)
  const [currentButton, setCurrentButton] = useState(1)

  function reorder() {
    let all = Math.ceil(length / (perPage * visibleButtons))
    const btnLength = Math.ceil(length / perPage)

    let tempPages = { }
    for (let i = 0; i < all; i++) {      
      tempPages[i + 1] = []
      for (let j = i * visibleButtons; (tempPages[i + 1].length < visibleButtons && j < Math.ceil(length / perPage)); j++) {
        tempPages[i + 1].push(j + 1)
      }
    }

    setPages(tempPages)
    setButtonLength(btnLength)
  }

  function nextPage() {
    setCurrentPage(curPage + 1)
    setCurrentButton(pages[curPage + 1].at(0))
  }

  function backPage() {
    setCurrentPage(curPage - 1)
    setCurrentButton(pages[curPage - 1].at(-1))
  }

  function select(page) {
    setCurrentButton(page)
  }

  function next() {
    console.log()
    let goTo = currentButton + 1

    if (goTo > pages[curPage]?.at(-1) && pages?.[curPage + 1]) return nextPage()
    if (!pages[curPage]?.includes(goTo)) return

    if (goTo >= pages[curPage]?.at(0) && goTo <= pages[curPage].at(-1)) {
      setCurrentButton(goTo)
    }
  }

  function back() {
    let goTo = currentButton - 1

    if (goTo < pages[curPage]?.at(0) && pages?.[curPage - 1]) return backPage()
    if (!pages[curPage].includes(goTo)) return

    if (goTo >= pages[curPage]?.at(0) && goTo <= pages[curPage].at(-1)) {
      setCurrentButton(goTo)
    }
  }

  useEffect(() => {
    if (length > 0)
      cbAfterPageChange(currentButton)
  }, [currentButton])

  useEffect(() => {
    reorder()
  }, [length])

  function nextStarter() {
    let starter = (curPage * visibleButtons + 1) < buttonLength ? (curPage * visibleButtons + 1) : ''
    return starter
  }

  return (
    // <div>asdad</div>
    <div className="flex sm:flex-1 sm:items-center justify-center my-6 pb-20 z-0">
      <a
        onClick={back}
        className="relative inline-flex text-xs items-center bg-white rounded-md px-3 py-3 mr-0.5 text-gray-400 ring-1 ring-inset ring-opacity-50 ring-gray-300 hover:bg-[#8950FC] hover: focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <svg width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 17.898C15 18.972 13.7351 19.546 12.9268 18.8388L6.61617 13.3169C5.81935 12.6197 5.81935 11.3801 6.61617 10.6829L12.9268 5.16108C13.7351 4.45388 15 5.02785 15 6.1018L15 17.898Z" fill="#212121" />
        </svg>
      </a>
      {
        curPage > 1 ?
          <button onClick={backPage} className="text-gray-800 h-full flex justify-center items-center px-2">
            1 ... {pages[curPage - 1].at(-1)}
          </button> : ""
      }
      <div className="inline-flex">
        {
          pages[curPage] &&
          pages[curPage]?.map(num => {
            return (
              <button onClick={() => select(num)} className={currentButton == num ? 'selected relative z-10 inline-flex items-center ring-opacity-50 rounded-md bg-[#8950FC] px-4 py-2.5 text-xs font-bold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
                : 'relative inline-flex items-center rounded-md px-4 py-2.5 text-xs ml-0.5 ring-1 ring-inset ring-opacity-50 ring-gray-300 bg-white text-gray-400 hover:bg-[#8950FC] hover: focus:z-20 focus:outline-offset-0'} key={num}>
                {num}
              </button>
            )
          })
        }
      </div>
      {
        visibleButtons * curPage < buttonLength ?
          <button onClick={nextPage} className="text-gray-800 h-full flex justify-center items-center px-2">
            {nextStarter()} ... {buttonLength}
          </button> : ""
      }
      <a
        onClick={next}
        className="relative inline-flex items-center rounded-md px-3 py-3 ml-0.5 bg-white text-gray-400 ring-1 ring-inset ring-opacity-50 ring-gray-300 hover:bg-[#8950FC] hover: focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <svg width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:">
          <path d="M9 17.898C9 18.972 10.2649 19.546 11.0731 18.8388L17.3838 13.3169C18.1806 12.6197 18.1806 11.3801 17.3838 10.6829L11.0731 5.16108C10.2649 4.45388 9 5.02785 9 6.1018V17.898Z" fill="#212121" />
        </svg>
      </a>
    </div>
  )
}
