import {fetchChunksPending, fetchChunksSuccess, fetchChunksError} from './actions';

/* 
TODO: update this module with the config endpoint
TODO: add some mechanism to apply the chunk id
*/

function fetchChunks() {
    return dispatch => {
	dispatch(fetchChunksPending());
	fetch('localhost:8080/chunks/1')
	    .then(res => res.json())
	    .then(res => {
		if(res.error) {
		    throw(res.error)
		}
		dispatch(fetchChunksSuccess(res.chunks));
		return res.chunks;
	    })
	    .catch(error => {
		dispatch(fetchChunksError(error))
	    })
    }
}

export default fetchChunks;
