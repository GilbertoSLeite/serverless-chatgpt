import {  SearchIndex } from "@azure/search-documents";

const SEARCH_INDEX_NAME: string = process.env.SEARCH_INDEX_NAME  || '';

export const index: SearchIndex = {
  name: SEARCH_INDEX_NAME,
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true,
      },
      {
        type: "Edm.String",
        name: "title",
        searchable: true,
        sortable: true,
        facetable: true,
      },
      {
        type: "Edm.String",
        name: "content",
        searchable: true,
      }
    ],
}