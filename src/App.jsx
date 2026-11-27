import { useState, useCallback } from 'react'
import heroImg from '../public/images/chilgoza-hero.png'
import flatlayImg from '../public/images/chilgoza-flatlay.png'
import lifestyleImg from '../public/images/chilgoza-lifestyle.png'

const PRODUCTS = [
  { name: 'Classic Chilgoza', detail: 'Shell-on pine nuts', size: '250g', price: 22, img: flatlayImg, position: 'center', badge: 'House favourite' },
  { name: 'The Sharing Tin',  detail: 'Shell-on pine nuts', size: '500g', price: 38, img: heroImg,    position: 'center 58%' },
  { name: 'Al Janat Gift Box', detail: 'A considered presentation', size: '750g', price: 58, img: lifestyleImg, position: 'center' },
]

function BrandMark({ className = '' }) {
  return (
    <svg className={`brand-mark ${className}`} viewBox="0 0 42 46" aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M21 3C13 11 8 19 8 27c0 8 5.8 14 13 14s13-6 13-14C34 19 29 11 21 3Z" strokeWidth="1.25" />
      <path d="M21 8v29M13 25c3-1 5.7-3.3 8-7 2.3 3.7 5 6 8 7M15 32c2.2-.7 4.2-2.3 6-4.8 1.8 2.5 3.8 4.1 6 4.8" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M18.2 13.8c0-2 1.25-3.6 2.8-3.6s2.8 1.6 2.8 3.6-1.25 3.6-2.8 3.6-2.8-1.6-2.8-3.6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Header({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header" id="top">
      <a className="logo" href="#top" aria-label="Al Janat Pine Nuts home">
        <BrandMark />
        <span><strong>AL JANAT</strong><small>PINE NUTS</small></span>
      </a>
      <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
        <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
        <a href="#quality" onClick={() => setMenuOpen(false)}>Our Standard</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>Journal</a>
      </nav>
      <div className="header-actions">
        <button className="text-button search-button" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" />
          </svg>
        </button>
        <button className="text-button cart-button" onClick={onCartOpen} aria-label="Open bag">
          Bag <span>{cartCount}</span>
        </button>
        <button className="menu-button" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <img src={heroImg} alt="Chilgoza pine nuts presented with forest green packaging" />
      <div className="hero-shade" />
      <div className="hero-content reveal">
        <p className="eyebrow light">From the mountain groves</p>
        <h1>Nature&#8217;s rarest<br /><em>harvest.</em></h1>
        <p className="hero-copy">Authentic Chilgoza pine nuts, selected for their distinctive character and presented with quiet elegance.</p>
        <a className="button button-light" href="#shop">Discover the harvest <span>&#x2197;</span></a>
      </div>
      <div className="hero-note"><span>01</span><p>Afghanistan<br />&amp; Pakistan</p></div>
      <a className="scroll-cue" href="#shop">Scroll to discover <span>&#x2193;</span></a>
    </section>
  )
}

function ProductCard({ product, index, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.img} alt={product.name} style={{ objectPosition: product.position }} />
        {product.badge && <span className="product-label">{product.badge}</span>}
        <button className="add-btn" onClick={() => onAdd(index)} aria-label={`Add ${product.name} to bag`}>+</button>
      </div>
      <div className="product-meta">
        <div>
          <h3>{product.name}</h3>
          <p>{product.detail} · {product.size}</p>
        </div>
        <p className="price">${product.price}</p>
      </div>
    </article>
  )
}

function FaqItem({ num, question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="faq-item">
      <div className={`faq-summary${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className="num">{num}</span>
        {question}
        <b className="toggle">+</b>
      </div>
      {open && <p className="faq-body">{answer}</p>}
    </div>
  )
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow light">The Al Janat letter</p>
        <h2>Notes from the <em>grove.</em></h2>
      </div>
      {submitted
        ? <p className="success-message">Thank you. We&#8217;ll be in touch.</p>
        : <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
            <label className="sr-only" htmlFor="email-input">Email address</label>
            <input id="email-input" type="email" placeholder="Your email address" required />
            <button type="submit">Join us <span>&#x2192;</span></button>
          </form>
      }
      <p className="newsletter-note">Occasional stories, serving inspiration, and new harvest notes.</p>
    </section>
  )
}

function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0)
  const count = cart.reduce((a, i) => a + i.qty, 0)
  return (
    <>
      <div className="cart-overlay visible" onClick={onClose} />
      <aside className="cart-drawer open" aria-label="Shopping bag">
        <div className="cart-head">
          <p>Your bag <span>({count})</span></p>
          <button onClick={onClose} aria-label="Close bag">&#215;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0
            ? <div className="empty-cart">
                <BrandMark />
                <h3>Your bag is empty</h3>
                <p>Add something thoughtful from our collection.</p>
                <a className="button button-dark" href="#shop" onClick={onClose}>Shop the collection</a>
              </div>
            : cart.map((item, i) => (
                <div className="cart-item" key={i}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.detail} · {item.size}</p>
                    <strong>${item.price}</strong>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(i)} aria-label="Remove">&#215;</button>
                </div>
              ))
          }
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            <div><span>Subtotal</span><strong>${total}</strong></div>
            <button className="button button-dark">Continue to checkout</button>
            <small>Taxes and shipping calculated at checkout</small>
          </div>
        )}
      </aside>
    </>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((idx) => {
    const p = PRODUCTS[idx]
    setCart(prev => {
      const ex = prev.find(i => i.name === p.name)
      if (ex) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx))
  }, [])

  const cartCount = cart.reduce((a, i) => a + i.qty, 0)

  const faqs = [
    { num: '01', q: 'What is Chilgoza?', a: 'Chilgoza is a distinctive variety of pine nut native to the mountain regions of Afghanistan and Pakistan. It is traditionally enjoyed by gently cracking the slender shell to reveal the kernel inside.', open: true },
    { num: '02', q: 'How should I store my pine nuts?', a: 'Keep them sealed in a cool, dry place away from direct sunlight. After opening, close the pack carefully to preserve their natural character.' },
    { num: '03', q: 'Are the pine nuts sold in their shells?', a: 'Yes. Our core Chilgoza selection is presented shell-on, honouring the traditional way these pine nuts are shared and enjoyed.' },
    { num: '04', q: 'Do you offer gifting options?', a: 'Our gift box is designed for thoughtful hosting and seasonal giving. Add a note at checkout and our team will include it with your order.' },
  ]

  return (
    <div className="site-shell">
      <div className="announcement"><p>Thoughtfully selected Chilgoza · Packed with care</p></div>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />

        <section className="intro section-pad">
          <p className="eyebrow">A rare mountain delicacy</p>
          <h2>Rich in tradition.<br /><em>Remarkable by nature.</em></h2>
          <p className="intro-copy">Long treasured across the mountain regions of Afghanistan and Pakistan, Chilgoza is a pine nut unlike any other—distinctive in form, ritual, and flavour.</p>
        </section>

        <section id="shop" className="shop section-pad">
          <div className="section-heading">
            <div><p className="eyebrow">The collection</p><h2>Choose your <em>ritual</em></h2></div>
            <p>Presented for everyday enjoyment, generous sharing, and thoughtful gifting.</p>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((p, i) => <ProductCard key={p.name} product={p} index={i} onAdd={addToCart} />)}
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-image">
            <img src={lifestyleImg} alt="Chilgoza pine nuts in a stoneware bowl" />
            <span className="image-caption">A harvest shaped by altitude and time</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow light">Our story</p>
            <h2>Closer to the<br /><em>source.</em></h2>
            <p>Al Janat was created to give a remarkable ingredient the presentation it deserves. We celebrate Chilgoza in its traditional shell—an invitation to slow down, gather close, and savour the simple ritual of opening each one.</p>
            <p>Our approach is considered at every step: attentive selection, careful handling, and restrained packaging that lets the harvest speak for itself.</p>
            <a href="#quality" className="line-link">Explore our standard <span>&#x2192;</span></a>
          </div>
        </section>

        <section id="quality" className="standards section-pad">
          <div className="section-heading centered">
            <p className="eyebrow">The Al Janat standard</p>
            <h2>Good things, <em>carefully done.</em></h2>
          </div>
          <div className="standard-grid">
            <article>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 4.5C12 4 6.5 7.7 5.2 14.8c3.7.7 7-.1 9.3-2.3" /><path d="M4.5 20c2.2-5.2 5.4-8.3 10-10.5" /></svg>
              <h3>Considered selection</h3><p>Chosen with attention to natural character and presentation.</p>
            </article>
            <article>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c.8 4.7 3.3 7.2 8 8-4.7.8-7.2 3.3-8 8-.8-4.7-3.3-7.2-8-8 4.7-.8 7.2-3.3 8-8Z" /><path d="M19 3v4M21 5h-4" /></svg>
              <h3>Freshly packed</h3><p>Prepared in considered quantities to preserve the experience.</p>
            </article>
            <article>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
              <h3>Simply Chilgoza</h3><p>A focused celebration of the pine nut in its traditional shell.</p>
            </article>
            <article>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></svg>
              <h3>Made to arrive well</h3><p>Protective, elegant packaging for your table or theirs.</p>
            </article>
          </div>
        </section>

        <section className="editorial">
          <div className="editorial-copy">
            <p className="eyebrow">At the table</p>
            <h2>A small ritual worth <em>sharing.</em></h2>
            <p>Pour into a favourite bowl. Crack gently. Pass them around. Chilgoza turns an unhurried evening into a moment of connection.</p>
            <a href="#shop" className="button button-dark">Shop the collection <span>&#x2197;</span></a>
          </div>
          <div className="editorial-image">
            <img src={flatlayImg} alt="Pine nuts, kernels, pine branches on stone" />
          </div>
        </section>

        <section className="testimonial">
          <p className="eyebrow light">A note from our table</p>
          <blockquote>&#8220;We believe the most memorable luxuries are natural, honest, and generous enough to share.&#8221;</blockquote>
          <p className="attribution">The Al Janat philosophy</p>
        </section>

        <section id="faq" className="faq">
          <div className="faq-intro">
            <p className="eyebrow">Good to know</p>
            <h2>Your questions,<br /><em>answered.</em></h2>
            <p>Everything you need to enjoy and care for your Chilgoza.</p>
          </div>
          <div className="faq-list">
            {faqs.map(f => <FaqItem key={f.num} num={f.num} question={f.q} answer={f.a} defaultOpen={f.open} />)}
          </div>
        </section>

        <Newsletter />
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <BrandMark />
            <p>Premium Chilgoza, thoughtfully presented for modern tables.</p>
          </div>
          <div className="footer-links"><h3>Explore</h3><a href="#shop">Shop all</a><a href="#story">Our story</a><a href="#quality">Our standard</a><a href="#faq">FAQs</a></div>
          <div className="footer-links"><h3>Help</h3><a href="mailto:hello@aljanat.com">hello@aljanat.com</a><a href="#faq">Shipping &amp; delivery</a><a href="#faq">Returns</a><a href="#faq">Care guide</a></div>
          <div className="footer-links"><h3>Follow</h3><a href="#top">Instagram</a><a href="#top">Pinterest</a><a href="#top">Facebook</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Al Janat Pine Nuts</span>
          <span>Authentic Chilgoza · Afghanistan &amp; Pakistan</span>
        </div>
      </footer>

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
    </div>
  )
}
