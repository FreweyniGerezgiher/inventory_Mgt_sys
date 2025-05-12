import { useRef } from 'react'

export default function CheckBox({ value, setter, title }) {
  const checkboxRef = useRef(null)
  const clickTargeRef = () => checkboxRef.current.click()

  return (
    <div
      className="flex space-x-3 items-center py-1 cursor-pointer"
      onClick={clickTargeRef}
    >
      <input
        type="checkbox"
        value={value}
        onKeyDown={(event) => setter(event.target.value)}
        className="w-4 h-4"
        ref={checkboxRef}
      />
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  )
}
