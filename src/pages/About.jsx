import Logo from '../assets/logo.jpeg';
import pw1 from './pw1.png';
import pw2 from './pw2.png';
import pw3 from './pw3.png';
import bubur from './bubur.png';
import nasigo from './nasigo.png';
import awal from './awal.png';
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const slides = [
  { src: awal, alt: "daftar menu" },
  { src: pw1, alt: "paket wareg 1" },
  { src: pw2, alt: "paket wareg 2" },
  { src: pw3, alt: "paket wareg 3" },
  { src: bubur, alt: "bubur" },
  { src: nasigo, alt: "nasi" },
]

const menus = [
  { name: "PAKET WAREG 1", price: "Rp 29.000", img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/453f1c02ec959fff8cf3141fc2c89e19-1766995036315" },
  { name: "PAKET WAREG 2", price: "Rp 31.000", img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/7e764d8a5161329edb26d67dcc8eadd4-1766995048077" },
  { name: "PAKET WAREG 3", price: "Rp 33.000", img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/c9c297e2b56b57f47a9466b77ed72125-1766995060156" },
  { name: "BUBUR AYAM TELOR", price: "Rp 18.000", img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/592fedee7c9cf9780e092e813f42ecbd-1731897193745" },
  { name: "NASI GORENG TELOR", price: "Rp 18.000", img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/a82c9e85d962c95b8b82d59d68f4dcb7-1748339634775" },
]

const navLinks = ["Home", "Menu", "Outlet", "Promotion", "Corporate", "News & Events", "Contact Us"]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const goTo = (n) => {
    setCurrent((n + slides.length) % slides.length)
  }

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const handleSlide = (dir) => {
    goTo(current + dir)
    resetTimer()
  }

  return (
    <div className='m-0 p-0 font-sans text-gray-900 bg-white'>

      {/* TOP BAR */}
      <div className='bg-red-700 text-white text-xs flex justify-end items-center gap-5 px-10 py-1.5'>
        <a href='/login' className='opacity-80 hover:opacity-100'>Login</a>
        <div className='flex gap-2'>
          <span className='font-bold border-b border-white cursor-pointer'>ID</span>
          <span className='font-bold cursor-pointer opacity-70'>EN</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className='bg-white flex items-center justify-between px-10 h-16 shadow-md sticky top-0 z-50'>
        <a href='../'>
          <img src={Logo} alt='Logo HokBen' className='h-12' />
        </a>
        <ul className='hidden md:flex gap-7 list-none'>
          {navLinks.map((link) => (
            <li key={link}>
              <a href='./404' className='text-sm font-medium text-gray-800 hover:text-red-700 transition-colors'>
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a href='./order' className='bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors'>
          Order Now
        </a>
      </nav>

      {/* HERO SLIDER */}
      <div className='relative overflow-hidden bg-black'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className='min-w-full'>
              <img src={slide.src} alt={slide.alt} className='w-full h-64 md:h-[480px] object-cover block' />
            </div>
          ))}
        </div>

        <button
          className='absolute left-5 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white w-11 h-11 rounded-full text-red-700 text-xl flex items-center justify-center cursor-pointer border-none'
          onClick={() => handleSlide(-1)}
        >
          ‹
        </button>
        <button
          className='absolute right-5 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white w-11 h-11 rounded-full text-red-700 text-xl flex items-center justify-center cursor-pointer border-none'
          onClick={() => handleSlide(1)}
        >
          ›
        </button>

        <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer() }}
              className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* RECOMMENDATIONss */}
      <section className='bg-stone-50 py-14 px-10'>
        <div className='text-center mb-9'>
          <p className='text-xs font-bold tracking-widest uppercase text-red-700 mb-2'>Menu Pilihan</p>
          <h2 className='text-2xl font-bold text-gray-900'>Recommendation</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto'>
          {menus.map((menu, i) => (
            <div key={i} className='bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200'>
              <img src={menu.img} alt={menu.name} className='w-full h-40 object-cover block' />
              <div className='p-3'>
                <h3 className='text-xs font-bold mb-1.5 leading-snug'>{menu.name}</h3>
                <p className='text-sm font-bold text-red-700 mb-3'>{menu.price}</p>
                <div className='flex gap-2'>
                  <Link
                    to={`/menu/${encodeURIComponent(menu.name)}`}
                    className='flex-1 text-center text-xs font-semibold border border-red-700 text-red-700 hover:bg-red-700 hover:text-white rounded-md py-1.5 transition-colors'
                  >
                    Details
                  </Link>
                  <a href='./order' className='flex-1 text-center text-xs font-semibold bg-red-700 hover:bg-red-800 text-white rounded-md py-1.5 transition-colors'>
                    + Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* FOOTER */}
      <footer className='bg-neutral-900 text-white/75 px-10 md:px-20 pt-12 pb-7'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mb-10'>

          <div>
            <img src={Logo} alt='HokBen' className='h-10 mb-5' />
            <p className='text-xs leading-relaxed mb-5'>
              Restoran Cepat Saji autentik Bandung terfavorit dengan menu lezat dan halal. Nikmati promo terbaru dan temukan restoran Ichiban Sangu terdekat di kota Anda.
            </p>
            <div className='flex gap-3 mb-5'>
              {[
                { href: "https://www.youtube.com/hokbenable", label: "▶" },
                { href: "https://x.com/HokBen", label: "𝕏" },
                { href: "https://www.facebook.com/pages/Hoka-Hoka-Bento/22801653893", label: "f" },
                { href: "https://www.instagram.com/hokben_id/", label: "📷" },
                { href: "https://www.tiktok.com/@hokben_id", label: "♪" },
                { href: "https://wa.me/6281111500505", label: "💬" },
              ].map((s) => (
                <a key={s.href} href={s.href} target='_blank' rel='noreferrer'
                  className='w-9 h-9 bg-white/10 hover:bg-red-700 rounded-full flex items-center justify-center text-sm transition-colors'>
                  {s.label}
                </a>
              ))}
            </div>
            <div className='flex flex-col gap-2'>
              {[
                { href: "https://apps.apple.com/id/app/hokben-app/id1501134613", icon: "🍎", sub: "Download on the", name: "App Store" },
                { href: "https://play.google.com/store/apps/details?id=id.co.hokben.revamp", icon: "▶", sub: "Get it on", name: "Google Play" },
              ].map((app) => (
                <a key={app.href} href={app.href} target='_blank' rel='noreferrer'
                  className='flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2 transition-colors'>
                  <span className='text-xl'>{app.icon}</span>
                  <span className='text-xs leading-tight'>
                    <span className='block opacity-70'>{app.sub}</span>
                    <span className='font-bold text-white text-sm'>{app.name}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className='text-xs font-bold text-white uppercase tracking-widest mb-4'>Links</h5>
            <ul className='space-y-2.5'>
              {["About Us", "Contact Us", "Terms and Conditions", "Privacy Policy", "Order Tracking", "Stores"].map((l) => (
                <li key={l}><a href='/nanti' className='text-xs text-white/65 hover:text-white transition-colors'>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className='text-xs font-bold text-white uppercase tracking-widest mb-4'>Menu</h5>
            <ul className='space-y-2.5'>
              {["Home", "Menu", "Outlet", "Promotion", "News & Events"].map((l) => (
                <li key={l}><a href='./nanti' className='text-xs text-white/65 hover:text-white transition-colors'>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className='text-xs font-bold text-white uppercase tracking-widest mb-4'>Hubungi Kami</h5>
            <ul className='space-y-2.5'>
              <li><a href='mailto:cs@hokben.co.id' className='text-xs text-white/65 hover:text-white transition-colors'>erlangga@ichisangu.co.id</a></li>
              <li><a href='https://wa.me/6281111500505' className='text-xs text-white/65 hover:text-white transition-colors'>0811-1150-0505</a></li>
            </ul>
          </div>

        </div>

        <div className='border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/45'>
          <p>© 2024 PT. Erlangga Bogacore. All rights reserved.</p>
          <p>Contact: <a href='mailto:cs@hokben.co.id' className='text-white/65 hover:text-white'>erlangga@ichisangu.co.id</a></p>
        </div>
      </footer>

    </div>
  )
}