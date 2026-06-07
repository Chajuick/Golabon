/* ============================================================
   골라본 앱 라우터
   ============================================================ */
const { useState, useEffect } = React;
const GB = window.GB;

function App() {
  const [route, setRoute] = useState('home');     // home | category | detail | rejected | verify | notice | liked
  const [detailId, setDetailId] = useState(null);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gb_liked') || '[]'); } catch (e) { return []; }
  });
  useEffect(() => { localStorage.setItem('gb_liked', JSON.stringify(liked)); }, [liked]);

  const go = (r, id) => {
    if (r === 'detail') { setDetailId(id); setRoute('detail'); }
    else if (r && r.indexOf('cat:') === 0) { setActiveCat(r.slice(4)); setSearch(''); setRoute('category'); }
    else setRoute(r);
    if (r !== 'detail') window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  };
  const onLike = (id) => setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);
  const onCat = (c) => { setActiveCat(c); setSearch(''); setRoute('category'); window.scrollTo(0, 0); };
  const onSearch = () => { setRoute('category'); setActiveCat('all'); window.scrollTo(0, 0); };

  const detail = detailId ? GB.get(detailId) : null;

  return (
    <div className="app">
      <Header go={go} route={route} search={search} setSearch={setSearch} onSearch={onSearch}
        activeCat={activeCat} onCat={onCat} liked={liked} />
      <main className="main">
        {route === 'home' && <HomePage go={go} liked={liked} onLike={onLike} />}
        {route === 'category' && <CategoryPage go={go} liked={liked} onLike={onLike} activeCat={activeCat} onCat={onCat} search={search} />}
        {route === 'detail' && detail && <DetailPage p={detail} go={go} liked={liked} onLike={onLike} />}
        {route === 'rejected' && <RejectedPage go={go} liked={liked} onLike={onLike} />}
        {route === 'verify' && <VerifyPage go={go} />}
        {route === 'notice' && <NoticePage go={go} />}
        {route === 'liked' && <LikedPage go={go} liked={liked} onLike={onLike} />}
      </main>
      <Footer go={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
