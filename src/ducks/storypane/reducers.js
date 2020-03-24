import {FETCH_CHUNKS_PENDING, FETCH_CHUNKS_SUCCESS, FETCH_CHUNKS_ERROR} from './types'

const initialState = {
    pending : false,
    chunks : [],
    error : null
}

export function chunksReducer(state = initialState, action) {
    switch(action.type) {
    case FETCH_CHUNKS_PENDING:
	return {
	    ...state,
	    pending : true
	}
    case FETCH_CHUNKS_SUCCESS:
	return {
	    ...state,
	    pending : false,
	    chunks : action.payload
	}
    case FETCH_CHUNKS_ERROR:
	return {
	    ...state,
	    pending : false,
	    error : action.error
	}
    default:
	return state;
    }
}

export const getChunks = state => state.chunks;
export const getChunksPending = state => state.pending;
export const getChunksError = state => state.error;
