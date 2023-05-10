"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const SEARCH_INDEX_NAME = process.env.SEARCH_INDEX_NAME || '';
exports.index = {
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
};
