import Axios from "axios"

export interface WikiSearchDataResponse {
  data: WikiSearchDataDetail
}

export interface WikiSearchDataDetail {
  query: {
    search: Array<WikiQuerySearch>
  }
}

export interface WikiQuerySearch {
  ns: number;
  pageid:number;
  size:number;
  snippet: string;
  timestamp: string;
  title: string;
  wordcount: number;
}

export interface FetchWikiPageDataResponse {
  data: FetchWikiPageDataDetail;
}

export interface FetchWikiPageDataDetail {
  batchcomplete: string;
  query: {
    pages: { 
      [index: string]: {
        pageid: number;
        ns: number;
        title: string;
        contentmodel: string;
        pagelanguage: string;
        pagelanguagehtmlcode: string;
        pagelanguagedir: string;
        touched: string;
        lastrevid: number;
        length: number;
        fullurl: string;
        editurl: string;
        canonicalurl: string;
      }
    }
  }
}

//axios will automatically encode URL!!!
export const WikiService = {
  serchMovie: async (title: string): Promise<WikiSearchDataDetail> => {
    return (await Axios.get<any,WikiSearchDataResponse>(process.env.WIKIPEDIA_SEARCH_URL.replace(/{value}/gm, title))).data;
  },
  fetchWikiPage: async (pageId: number): Promise<FetchWikiPageDataDetail> => {
    return (await Axios.get<any,FetchWikiPageDataResponse>(process.env.WIKIPEDIA_FETCH_URL.replace(/{pageid}/gm, pageId.toString()))).data;
  }
}