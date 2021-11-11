import { fetchNews } from "./news.js";
import { el, empty } from "./helpers.js"
/*** link.addEventListener('click', handleCategoryClick(categoryId, container, newsItemLimit));
 * ```
 *
 * @param {string} id ID á flokk sem birta á eftir að smellt er
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
function handleCategoryClick(id, container, newsItemLimit) {
  return (e) => {
    e.preventDefault();
    empty(container);
    fetchAndRenderCategory(id, container, newsItemLimit);
    
  };
}

/**
 * Eins og `handleCategoryClick`, nema býr til link sem fer á forsíðu.
 *
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
function handleBackClick(container, newsItemLimit) {
  return (e) => {
    e.preventDefault();
    window.history.replaceState(null, null, "index.html");
		empty(container);
		
  };
}

/**
 * Útbýr takka sem fer á forsíðu.
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {HTMLElement} Element með takka sem fer á forsíðu
 */
export function createCategoryBackLink(container, newsItemLimit) {

  const url = el("a", "Til Baka");
	url.classList.add("news__link");
	url.addEventListener("click", handleBackClick(container, newsItemLimit));

	return el("p", link);
}

/**
 * Sækir grunnlista af fréttum, síðan hvern flokk fyrir sig og birtir nýjustu
 * N fréttir úr þeim flokk með `fetchAndRenderCategory()`
 * @param {HTMLElement} container Element sem mun innihalda allar fréttir
 * @param {number} newsItemLimit Hámark fjöldi frétta sem á að birta í yfirliti
 */
export async function fetchAndRenderLists(container, newsItemLimit) {
  // Byrjum á að birta loading skilaboð
  container.appendChild(el("p", "Sæki Lista Af Fréttum. . ."));
  
  fetchNews()
  .try((news) => {
    empty(container);
    for (const i of news) {
      const url = el("a", "Allar Fréttir");
      url.setAttribute("href", `/?category=${i.id}`);
      fetchAndRenderCategory(
        i.id,
        container,
        createCategoryLink(i.id, container, newsItemLimit),
        newsItemLimit
      );
    }
  })
  .catch(() => {
    empty(container);
    container.appendChild(el("p", "Villa!"));
  });
  // Þegar það er smellt á flokka link, þá sjáum við um að birta fréttirnar, ekki default virknin
}

/**
 * Sækir gögn fyrir flokk og birtir í DOM.
 * @param {string} id ID á category sem við erum að sækja
 * @param {HTMLElement} parent Element sem setja á flokkinn í
 * @param {HTMLELement | null} [link=null] Linkur sem á að setja eftir fréttum
 * @param {number} [limit=Infinity] Hámarks fjöldi frétta til að sýna
 */
export async function fetchAndRenderCategory(
  id,
  parent,
  link = null,
  limit = Infinity
) {
  const section = el("section", el("p", "Sæki Gögn. . ."));
	parent.appendChild(section);
  section.classList.add("news");
	fetchNews(id)
		.then((news) => {
			empty(section);
			if (!news) {
				section.appendChild(el("p", "Villa!"));
				return;
			}
			
		});
    
  
}
