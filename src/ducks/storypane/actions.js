import fetch from 'cross-fetch';
import {FETCH_CHUNKS_SUCCESS, FETCH_CHUNKS_ERROR,FETCH_CHUNKS_PENDING } from "./types";

export function fetchChunksPending() {
    return {
	type : FETCH_CHUNKS_PENDING
    }
}

export function fetchChunksSuccess(chunks) {
    return {
	type : FETCH_CHUNKS_SUCCESS,
	chunks : chunks
    }
}

export function fetchChunksError(error) {
    return {
	type : FETCH_CHUNKS_ERROR,
	error : error
    }
}

export function fetchChunks(chunkid) {
    return function(dispatch) {
	dispatch(fetchChunksPending())
	return fetch(`localhost:8080/chunks/${chunkid}`)
	    .then(
		res => res.json(),
		error => dispatch(fetchChunksError(error)) 
		    .then(json =>
			  dispatch(fetchChunksSuccess(json)))
	    )
    }
}
