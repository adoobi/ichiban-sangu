import { useState, useEffect } from "react"
import Logo from "./logo.png"

const menuData = [
  {
    id: 1,
    name: "PAKET WAREG 1",
    price: 29000,
    category: "Bento",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/453f1c02ec959fff8cf3141fc2c89e19-1766995036315",
  },
  {
    id: 2,
    name: "PAKET WAREG 2",
    price: 31000,
    category: "Bento",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/7e764d8a5161329edb26d67dcc8eadd4-1766995048077",
  },
  {
    id: 3,
    name: "PAKET WAREG 3",
    price: 10000,
    category: "Rice",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/a82c9e85d962c95b8b82d59d68f4dcb7-1748339634775",
  },
  {
    id: 4,
    name: "BUBUR AYAM TELOR",
    price: 18000,
    category: "Rice",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/c9c297e2b56b57f47a9466b77ed72125-1766995060156",
  },
  {
    id: 5,
    name: "NASI GORENG TELOR",
    price: 18000,
    category: "Rice",
    img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/a82c9e85d962c95b8b82d59d68f4dcb7-1748339634775",
  },
]

export default function Order() {
  const [search, setSearch] = useState("")

  // 🧠 CART INIT
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  // 💾 SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // 💳 CHECKOUT STATE
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkout, setCheckout] = useState({
    name: "",
    phone: "",
    address: "",
  })

  const handleInput = (e) => {
    setCheckout({
      ...checkout,
      [e.target.name]: e.target.value,
    })
  }

  // ➕ ADD TO CART
  const addToCart = (menu) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === menu.id)

      if (exist) {
        return prev.map((item) =>
          item.id === menu.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      return [...prev, { ...menu, qty: 1 }]
    })
  }

  // ➖ DECREASE
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const filteredMenus = menuData.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  )

  // 🚀 CHECKOUT ACTION (WA)
  const handleCheckout = () => {
    if (cart.length === 0) return alert("Keranjang kosong!")

    if (!checkout.name || !checkout.phone || !checkout.address) {
      return alert("Lengkapi data checkout!")
    }

    const message = `
🛒 *ORDER BARU*

👤 Nama: ${checkout.name}
📞 HP: ${checkout.phone}
🏠 Alamat: ${checkout.address}

📦 Pesanan:
${cart.map((i) => `- ${i.name} x${i.qty}`).join("\n")}

💰 Total: Rp ${total.toLocaleString("id-ID")}
`

    const wa = "6281111500505"
    window.open(
      `https://wa.me/${wa}?text=${encodeURIComponent(message)}`,
      "_blank"
    )

    setCart([])
    localStorage.removeItem("cart")
    setShowCheckout(false)
    setCheckout({ name: "", phone: "", address: "" })
  }

  return (
    <div className="min-h-screen bg-stone-100">

      {/* HEADER */}
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <a href="/">
          <img src={Logo} className="h-12" />
        </a>

        <a href="/about" className="text-red-700 font-semibold">
          ← Kembali
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 p-6">

        {/* MENU */}
        <div className="lg:col-span-2">

          <div className="bg-white p-4 rounded-xl mb-5">
            <input
              type="text"
              placeholder="Cari menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {filteredMenus.map((menu) => (
              <div key={menu.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img src={menu.img} className="w-full h-48 object-cover" />

                <div className="p-4">
                  <h3 className="font-bold">{menu.name}</h3>
                  <p className="text-red-700 font-bold mt-2">
                    Rp {menu.price.toLocaleString("id-ID")}
                  </p>

                  <button
                    onClick={() => addToCart(menu)}
                    className="w-full mt-4 bg-red-700 text-white py-2 rounded-lg"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CART */}
        <div className="bg-white rounded-xl p-5 h-fit sticky top-5">

          <h2 className="font-bold text-xl mb-5">Keranjang</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Belum ada pesanan</p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span>
                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => decreaseQty(item.id)} className="w-7 h-7 bg-gray-200 rounded">
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button onClick={() => addToCart(item)} className="w-7 h-7 bg-red-700 text-white rounded">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-5">

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full mt-5 bg-red-700 text-white py-3 rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🧾 CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">Checkout</h2>

            <input
              name="name"
              placeholder="Nama"
              value={checkout.name}
              onChange={handleInput}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              name="phone"
              placeholder="No HP"
              value={checkout.phone}
              onChange={handleInput}
              className="w-full border p-2 rounded mb-3"
            />

            <textarea
              name="address"
              placeholder="Alamat"
              value={checkout.address}
              onChange={handleInput}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex gap-2 mt-4">

              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-200 p-2 rounded"
              >
                Batal
              </button>

              <button
                onClick={handleCheckout}
                className="flex-1 bg-red-700 text-white p-2 rounded"
              >
                Order
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}