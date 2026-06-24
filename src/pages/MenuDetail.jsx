import { useParams, Link } from "react-router-dom"
import { useMemo } from "react"
import Logo from '../assets/logo.jpeg';

const navLinks = ["Home", "Menu", "Outlet", "Promotion", "Corporate", "News & Events", "Contact Us"]


const menus = [
  {
    name: "PAKET WAREG 1",
    price: "Rp 29.000",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/453f1c02ec959fff8cf3141fc2c89e19-1766995036315",
    desc: "Combo bento dengan nasi hangat, chicken katsu, tamagoyaki, dan sayuran segar."
  },
  {
    name: "PAKET WAREG 2",
    price: "Rp 31.000",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/7e764d8a5161329edb26d67dcc8eadd4-1766995048077",
    desc: "Bento lengkap dengan ayam teriyaki, shrimp roll, dan salad khas Jepang."
  },
  {
    name: "PAKET WAREG 3",
    price: "Rp 33.000",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/c9c297e2b56b57f47a9466b77ed72125-1766995060156",
    desc: "Paket bento dengan chicken teriyaki, beef yakiniku, dan side dish premium."
  },
  {
    name: "BUBUR AYAM TELOR",
    price: "Rp 18.000",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/592fedee7c9cf9780e092e813f42ecbd-1731897193745",
    desc: "Bubur nasi Jepang lembut dengan telur, cocok untuk menu ringan."
  },
  {
    name: "NASI GORENG TELOR",
    price: "Rp 18.000",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/a82c9e85d962c95b8b82d59d68f4dcb7-1748339634775",
    desc: "Nasi goreng Jepang pedas dengan bumbu khas dan aroma smoky."
  }
]

export default function MenuDetail() {
  const { name } = useParams()

  const menu = useMemo(() => {
    return menus.find(m => m.name === decodeURIComponent(name))
  }, [name])

  if (!menu) {
    return (
      <div className="h-screen  p-10">
              {/* NAVBAR */}
              <nav className='bg-white flex items-center justify-between px-10 h-16 shadow-md sticky top-0 z-50'>
                <a href='/'>
                  <img src={Logo} alt='Logo HokBen' className='h-12' />
                </a>
                <ul className='hidden md:flex gap-7 list-none'>
                  {navLinks.map((link) => (
                    <li key={link}>
                      <a href='#' className='text-sm font-medium text-gray-800 hover:text-red-700 transition-colors'>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
                <a href='/order' className='bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors'>
                  Order Now
                </a>
              </nav>
        <div className="flex flex-col gap-2 items-center justify-center h-full">
            <p className="text-lg font-semibold">Menu tidak ditemukan :(</p>
            <p>Link sudah tidak tersedia atau sudah dipindahkan</p>
            <Link to="/about" className="border border-gray-200 px-4 py-2 rounded-lg inline-block mt-2 text-sm text-gray-500 hover:text-white hover:bg-red-800 transition">
            ← Kembali
            </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* TOP BAR (same style) */}
      <div className='bg-red-700 text-white text-xs flex justify-end items-center gap-5 px-10 py-1.5'>
        <Link to="/login" className='opacity-80 hover:opacity-100'>Login</Link>
        <div className='flex gap-2'>
          <span className='font-bold border-b border-white cursor-pointer'>ID</span>
          <span className='font-bold cursor-pointer opacity-70'>EN</span>
        </div>
      </div>

        {/* NAVBAR */}
        <nav className='bg-white flex items-center justify-between px-10 h-16 shadow-md sticky top-0 z-50'>
            <a href='/'>
            <img src={Logo} alt='Logo HokBen' className='h-12' />
            </a>
            <ul className='hidden md:flex gap-7 list-none'>
            {navLinks.map((link) => (
                <li key={link}>
                <a href='#' className='text-sm font-medium text-gray-800 hover:text-red-700 transition-colors'>
                    {link}
                </a>
                </li>
            ))}
            </ul>
            <a href='/order' className='bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors'>
            Order Now
            </a>
        </nav>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">

        <div className="bg-stone-50 rounded-xl overflow-hidden shadow">
          <img src={menu.img} alt={menu.name} className="w-full h-80 object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{menu.name}</h1>
          <p className="text-red-700 font-bold text-xl mb-4">{menu.price}</p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {menu.desc}
          </p>

          <div className="flex gap-3">
            <button className="px-5 py-2 border border-red-700 text-red-700 rounded-md hover:bg-red-700 hover:text-white">
              Add to Cart
            </button>
            <button className="px-5 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
              Order Now
            </button>
          </div>

          <Link to="/about" className="border border-gray-200 px-4 py-2 rounded-lg inline-block mt-6 text-sm text-gray-500 hover:text-white hover:bg-red-800 transition">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}