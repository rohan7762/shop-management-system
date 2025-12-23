import { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../api/product.api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [editId, setEditId] = useState(null);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateProduct(editId, form);
      setEditId(null);
    } else {
      await createProduct(form);
    }
    setForm({ name: '', price: '', stock: '' });
    loadProducts();
  };

  const edit = (p) => {
    setEditId(p._id);
    setForm({ name: p.name, price: p.price, stock: p.stock });
  };

  const remove = async (id) => {
    if (window.confirm('Delete product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <button>{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} | Rs.{p.price} | Stock: {p.stock}
            <button onClick={() => edit(p)}>Edit</button>
            <button onClick={() => remove(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
