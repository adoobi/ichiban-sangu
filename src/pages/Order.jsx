import { useState } from "react"
import Logo from "./logo.png"

const menuData = [
{
id: 1,
name: "Irodori Bento 1",
price: 53637,
category: "Bento",
img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/453f1c02ec959fff8cf3141fc2c89e19-1766995036315",
},
{
id: 2,
name: "Irodori Bento 2",
price: 58182,
category: "Bento",
img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/7e764d8a5161329edb26d67dcc8eadd4-1766995048077",
},
{
id: 3,
name: "Spicy Yakimeshi",
price: 10000,
category: "Rice",
img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/a82c9e85d962c95b8b82d59d68f4dcb7-1748339634775",
},
{
id: 4,
name: "Okayu Ni Tamago",
price: 10000,
category: "Rice",
img: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/592fedee7c9cf9780e092e813f42ecbd-1731897193745",
},
]

export default function Order() {
const [search, setSearch] = useState("")
const [cart, setCart] = useState([])

const addToCart = (menu) => {
const exist = cart.find((item) => item.id === menu.id)

```
if (exist) {
  setCart(
    cart.map((item) =>
      item.id === menu.id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  )
} else {
  setCart([...cart, { ...menu, qty: 1 }])
}
```

}

const decreaseQty = (id) => {
setCart(
cart
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

return ( <div className="min-h-screen bg-stone-100">

```
  {/* HEADER */}
  <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
    <a href="/">
      <img src={Logo} className="h-12" />
    </a>

    <a
      href="/"
      className="text-red-700 font-semibold"
    >
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
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {filteredMenus.map((menu) => (
          <div
            key={menu.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={menu.img}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold">
                {menu.name}
              </h3>

              <p className="text-red-700 font-bold mt-2">
                Rp {menu.price.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => addToCart(menu)}
                className="w-full mt-4 bg-red-700 text-white py-2 rounded-lg hover:bg-red-800"
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

      <h2 className="font-bold text-xl mb-5">
        Keranjang
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Belum ada pesanan
        </p>
      ) : (
        <>
          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b pb-3"
              >
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span>
                    Rp{" "}
                    {(
                      item.price * item.qty
                    ).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                    className="w-7 h-7 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      addToCart(item)
                    }
                    className="w-7 h-7 bg-red-700 text-white rounded"
                  >
                    +
                  </button>

                </div>
              </div>
            ))}

          </div>

          <div className="border-t mt-5 pt-5">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                Rp{" "}
                {total.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={() =>
                alert("Checkout Coming Soon")
              }
              className="w-full mt-5 bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>

  </div>
</div>


)
}
