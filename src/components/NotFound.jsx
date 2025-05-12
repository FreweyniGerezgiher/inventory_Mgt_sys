import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="py-10 flex justify-center items-start bg-gray-100 h-screen">
      <div className="space-y-2 w-2/5 bg-white p-5 rounded-lg">
        <div className="font-light text-red-600 uppercase text-xl">
          Oops! Page Not found
        </div>
        <div className="text-sm text-gray-600">
          Sorry, we could not find the page you are looking for. Please check the
          URL to make sure it is correct. You can also click the button below to
          go to the home page
        </div>
        <div
          className="inline-block py-1 px-6 bg-gray-200 rounded cursor-pointer hover:opacity-75"
          onClick={() => navigate('/')}
        >
          Go home
        </div>
      </div>
    </div>
  )
}

export default NotFound
