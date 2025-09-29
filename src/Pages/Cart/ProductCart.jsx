import { useState } from "react";
import plant from "../../assets/mandala_1265367 1.png";
import { Link } from "react-router-dom";

export function ProductCart() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fizdal",
      description:
        "Tasbeeh + 99 beads engraved design with Allah’s names and Islamic pattern",
      price: 5000.0,
      quantity: 1,
      image: plant,
    },
    {
      id: 2,
      name: "Fizdal",
      description:
        "Tasbeeh + 99 beads engraved design with Allah’s names and Islamic pattern",
      price: 5000.0,
      quantity: 1,
      image: plant,
    },
    {
      id: 3,
      name: "Fizdal",
      description:
        "Tasbeeh + 99 beads engraved design with Allah’s names and Islamic pattern",
      price: 5000.0,
      quantity: 1,
      image: plant,
    },
  ]);

  const updateQuantity = (id, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(0, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="pt-24 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="font-[Alexandria] font-bold text-[24px] sm:text-[30px] leading-[39px] text-left mb-6">
          Product List
        </h1>

        {/* Products */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm md:shadow-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0 flex justify-center sm:block">
                  <Link to={`/product-details/${product.id}`}>
                    <img
                      src={product.image}
                      className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain"
                      alt={product.name}
                    />
                  </Link>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
                    {product.name}
                  </h3>
                  <p className="font-[Montserrat] text-[#212529] font-semibold text-[13px] sm:text-[14px] leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <div className="font-[Montserrat] font-bold text-[18px] sm:text-[20px] leading-[100%] uppercase text-purple-600">
                    {product.price.toFixed(2)} EGP
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between sm:justify-start gap-3 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-lg font-bold text-red-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-lg">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-lg font-bold text-green-600"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeProduct(product.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Cart */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
