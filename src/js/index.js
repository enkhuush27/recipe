import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

/** web app state
 * - Hailtin query
 * - Tuhain uzuulj bga jor
 * - Likelsn joruud
 * - Zahialj bgaa jorin nairlaga
 */

const state = {};

const controlSearch = async () => {
  //Webes hailtin tulhuur ugig olj awna
  const query = searchView.getInput();

  if (query) {
    //Shineer hailtin object uusgej ugnu
    state.search = new Search(query);
    //Hailt hiihed zoriulj delgetsiin UI beltgene
    searchView.clearSearch();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //Hailtiig guitsetgene
    await state.search.doSearch();
    //Hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("hailtaar ilertsgu");
    else searchView.renderRecipes(state.search.result);
    console.log(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
