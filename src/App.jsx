import { useState, useCallback } from 'react'
import heroImg from '../public/images/hero-new.webp'
import storyImg from '../public/images/story-section.webp'
import editorialImg from '../public/images/editorial-section.webp'
import bag1kgImg from '../public/images/bag-1kg.webp'
import bag500gImg from '../public/images/bag-500g.webp'
import giftBoxImg from '../public/images/gift-box.webp'
import nutsBowlImg from '../public/images/nuts-bowl.webp'

const PRODUCTS = [
  {
    name: 'Classic Chilgoza',
    detail: 'Shell-on pine nuts',
    size: '500g',
    price: 6000,
    originalPrice: 8000,
    img: bag500gImg,
    imgs: [bag500gImg, nutsBowlImg],
    position: 'center 20%',
    badge: 'House favourite',
    description: 'Our Classic Chilgoza is a celebration of the pine nut in its most honest form — shell-on, as nature intended. Sourced from the ancient mountain groves of Afghanistan and Pakistan, each nut is hand-selected for its distinctive slender shape and rich, buttery flavour. The gentle ritual of cracking the shell is part of the experience: slow down, gather close, and savour one of the rarest harvests on earth.',
    features: ['100% Natural & Unprocessed', 'Hand-selected from mountain groves', 'Shell-on for traditional enjoyment', 'Rich in protein, healthy fats & magnesium', 'No additives or preservatives'],
    origin: 'Afghanistan & Pakistan',
    weight: '500g Net Weight',
  },
  {
    name: 'The Sharing Tin',
    detail: 'Shell-on pine nuts',
    size: '1kg',
    price: 10000,
    originalPrice: 13500,
    img: bag1kgImg,
    imgs: [bag1kgImg, storyImg],
    position: 'center 20%',
    description: 'Designed for generous tables and unhurried evenings, The Sharing Tin brings a full kilogram of our finest Chilgoza in a presentation worthy of the occasion. Whether passed between friends after dinner or offered as a considered gift, this is the format for those who know that good things deserve to be shared without restraint. Same exceptional quality — simply more of it.',
    features: ['1kg Premium Chilgoza', 'Ideal for gatherings & gifting', 'Hand-selected grade A nuts', 'Shell-on, traditionally presented', 'Protective resealable packaging'],
    origin: 'Afghanistan & Pakistan',
    weight: '1kg Net Weight',
  },
  {
    name: 'Al Janat Gift Box',
    detail: 'Premium gift presentation',
    size: '2kg',
    price: 20000,
    originalPrice: 27000,
    img: giftBoxImg,
    imgs: [giftBoxImg, editorialImg],
    position: 'center',
    description: 'The Al Janat Gift Box is our most considered offering — two full kilograms of premium Chilgoza presented in an elegantly crafted gift tin housed within a signature forest-green box, finished with a hand-tied satin ribbon. Created for Eid, weddings, corporate occasions, and any moment that deserves a truly memorable gesture. A gift that speaks of taste, thoughtfulness, and an appreciation for the rare and the natural.',
    features: ['2kg Premium Grade Chilgoza', 'Signature gift tin & forest-green box', 'Hand-tied satin ribbon included', 'Personalised gift note at checkout', 'Perfect for Eid, weddings & corporates'],
    origin: 'Afghanistan & Pakistan',
    weight: '2kg Net Weight',
  },
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
      <div className="hero-note"><span>01</span><p>Pakistan</p></div>
      <a className="scroll-cue" href="#shop">Scroll to discover <span>&#x2193;</span></a>
    </section>
  )
}

function ProductCard({ product, index, onAdd, onView }) {
  return (
    <article className="product-card">
      <div className="product-image" onClick={() => onView(index)} style={{ cursor: 'pointer' }}>
        <img src={product.img} alt={product.name} style={{ objectPosition: product.position }} />
        {product.badge && <span className="product-label">{product.badge}</span>}
        <button className="add-btn" onClick={e => { e.stopPropagation(); onAdd(index) }} aria-label={`Add ${product.name} to bag`}>+</button>
      </div>
      <div className="product-meta">
        <div>
          <h3 onClick={() => onView(index)} style={{ cursor: 'pointer' }}>{product.name}</h3>
          <p>{product.detail} · {product.size}</p>
        </div>
        <div className="price-block">
          <span className="price-original">PKR {product.originalPrice.toLocaleString()}</span>
          <span className="price-off">25% OFF</span>
          <p className="price">PKR {product.price.toLocaleString()}</p>
        </div>
      </div>
      <button className="view-btn" onClick={() => onView(index)}>View Details</button>
    </article>
  )
}

function ProductModal({ product, index, onAdd, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  if (!product) return null
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="product-modal" role="dialog" aria-modal="true" aria-label={product.name}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&#215;</button>
        <div className="modal-inner">
          <div className="modal-gallery">
            <div className="modal-main-img">
              <img src={product.imgs[activeImg]} alt={product.name} />
            </div>
            <div className="modal-thumbs">
              {product.imgs.map((img, i) => (
                <button key={i} className={`thumb-btn${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="modal-info">
            {product.badge && <span className="modal-badge">{product.badge}</span>}
            <h2>{product.name}</h2>
            <p className="modal-detail">{product.detail} · {product.weight}</p>
            <p className="modal-origin">Origin: {product.origin}</p>
            <div className="modal-price-block">
              <span className="modal-price-original">PKR {product.originalPrice.toLocaleString()}</span>
              <span className="modal-price-off">25% OFF</span>
              <p className="modal-price">PKR {product.price.toLocaleString()}</p>
            </div>
            <p className="modal-desc">{product.description}</p>
            <ul className="modal-features">
              {product.features.map(f => <li key={f}><span>&#10003;</span> {f}</li>)}
            </ul>
            <button className="button button-dark modal-add" onClick={() => { onAdd(index); onClose() }}>
              Add to Bag <span>&#x2192;</span>
            </button>
          </div>
        </div>
      </div>
    </>
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
                    <strong>PKR {item.price.toLocaleString()}</strong>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(i)} aria-label="Remove">&#215;</button>
                </div>
              ))
          }
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            <div><span>Subtotal</span><strong>PKR {total.toLocaleString()}</strong></div>
            <button className="button button-dark">Continue to checkout</button>
            <small>Taxes and shipping calculated at checkout</small>
          </div>
        )}
      </aside>
    </>
  )
}

const POLICIES = {
  shipping: {
    title: 'Shipping & Delivery',
    icon: '🚚',
    sections: [
      {
        heading: 'Delivery Timeframes',
        items: [
          { label: 'Karachi, Lahore, Islamabad', value: '2–3 Business Days' },
          { label: 'Other Major Cities', value: '3–5 Business Days' },
          { label: 'Remote Areas', value: '5–7 Business Days' },
        ],
      },
      {
        heading: 'Shipping Charges',
        items: [
          { label: 'Orders above PKR 10,000', value: 'Free Delivery' },
          { label: 'Orders below PKR 10,000', value: 'Standard shipping charges apply' },
        ],
      },
      {
        heading: 'Important Notes',
        bullets: [
          'All orders are carefully packed to protect the product during transit.',
          'You will receive an SMS / WhatsApp notification with your tracking number once your order is dispatched.',
          'Al Janat Pine Nuts ships nationwide across Pakistan via trusted courier partners.',
          'Orders placed on weekends or public holidays are processed the next business day.',
          'During peak seasons (Eid, Ramadan), delivery may take 1–2 additional days.',
        ],
      },
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    icon: '↩️',
    sections: [
      {
        heading: 'Our Guarantee',
        para: 'At Al Janat, we stand behind the quality of every product we send. If you are not completely satisfied with your order, we are here to make it right.',
      },
      {
        heading: 'Return Eligibility',
        bullets: [
          'Returns are accepted within 7 days of delivery.',
          'The product must be unopened and in its original packaging.',
          'Items damaged during transit are eligible for a full replacement or refund.',
          'Sale or discounted items are not eligible for return unless damaged or defective.',
        ],
      },
      {
        heading: 'How to Request a Return',
        steps: [
          'Contact us at hello@aljanat.com or WhatsApp within 7 days of receiving your order.',
          'Share your order number and a photo of the item if damaged.',
          'Our team will review your request within 24 business hours.',
          'Once approved, we will arrange a free pick-up or guide you on how to send the item back.',
        ],
      },
      {
        heading: 'Refund Process',
        items: [
          { label: 'Refund Method', value: 'Original payment method or bank transfer' },
          { label: 'Processing Time', value: '5–7 Business Days after return received' },
          { label: 'Replacement', value: 'Dispatched within 2 business days of approval' },
        ],
      },
      {
        heading: 'Non-Returnable Items',
        bullets: [
          'Opened or partially consumed products.',
          'Products not in their original packaging.',
          'Gift boxes where the outer packaging has been removed.',
        ],
      },
    ],
  },
}

function PolicyModal({ type, onClose }) {
  const policy = POLICIES[type]
  if (!policy) return null
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="policy-modal-wrap">
        <div className="policy-modal" role="dialog" aria-modal="true">
          <div className="policy-header">
            <div>
              <p className="eyebrow light">Al Janat Pine Nuts</p>
              <h2>{policy.title}</h2>
            </div>
            <button className="policy-close" onClick={onClose} aria-label="Close">&#215;</button>
          </div>
          <div className="policy-body">
            {policy.sections.map((s, i) => (
              <div key={i} className="policy-section">
                <h3>{s.heading}</h3>
                {s.para && <p>{s.para}</p>}
                {s.items && (
                  <table className="policy-table">
                    <tbody>
                      {s.items.map((it, j) => (
                        <tr key={j}>
                          <td>{it.label}</td>
                          <td><strong>{it.value}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {s.bullets && (
                  <ul className="policy-list">
                    {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
                {s.steps && (
                  <ol className="policy-list policy-steps">
                    {s.steps.map((b, j) => <li key={j}>{b}</li>)}
                  </ol>
                )}
              </div>
            ))}
            <div className="policy-contact">
              <p>Questions? We&#8217;re here to help.</p>
              <a href="mailto:hello@aljanat.com" className="button button-dark">Contact Us <span>&#x2192;</span></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [modalIdx, setModalIdx] = useState(null)
  const [policyPage, setPolicyPage] = useState(null)

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

        <section id="shop" className="shop section-pad">
          <div className="section-heading">
            <div><p className="eyebrow">The collection</p><h2>Choose your <em>ritual</em></h2></div>
            <p>Presented for everyday enjoyment, generous sharing, and thoughtful gifting.</p>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((p, i) => <ProductCard key={p.name} product={p} index={i} onAdd={addToCart} onView={setModalIdx} />)}
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-image">
            <img src={storyImg} alt="Chilgoza pine nuts in a stoneware bowl" />
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
            <img src={editorialImg} alt="Pine nuts, kernels, pine branches on stone" />
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
          <div className="footer-links"><h3>Help</h3><a href="mailto:hello@aljanat.com">hello@aljanat.com</a><a href="#shipping" onClick={e=>{e.preventDefault();setPolicyPage('shipping')}}>Shipping &amp; Delivery</a><a href="#returns" onClick={e=>{e.preventDefault();setPolicyPage('returns')}}>Returns &amp; Refunds</a><a href="#faq">Care Guide</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Al Janat Pine Nuts</span>
          <span>Authentic Chilgoza · Afghanistan &amp; Pakistan</span>
        </div>
      </footer>

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      {modalIdx !== null && <ProductModal product={PRODUCTS[modalIdx]} index={modalIdx} onAdd={addToCart} onClose={() => setModalIdx(null)} />}
      {policyPage && <PolicyModal type={policyPage} onClose={() => setPolicyPage(null)} />}
    </div>
  )
}
