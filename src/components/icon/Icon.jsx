function Icon({ id, size = 16, ...props }) {
  return (
    <svg width={size + 'px'} height={size + 'px'} {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  )
}
export default Icon
