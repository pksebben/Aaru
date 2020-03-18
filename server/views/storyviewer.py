import flask

import api



def retrieve_story():

bp = flask.Blueprint('storyviewer', __name__)
    
@views.route('/storyviewer/<chunkid>')
@views.route('/storyviewer')
def storyviewer(chunkid = 0):

    if chunkid == 0:
        # show the list of potential story chunks
        firstchapters = api.get_index()
        return flask.render_template('browse_sv.html', index = firstchapters)

    
    
    chunks = []
    # climb the parent tree.  I want to preserve each chunk as an object.
    
    lastchunk = api.read_chunk(chunkid)
    chunks.append(lastchunk)
    
    while lastchunk.parent:
        newchunk = api.read_chunk(lastchunk.parent)
        chunks.append(newchunk)
        lastchunk = newchunk
        
    # flip the array
    chunks.reverse()
    return flask.render_template('storyviewer.html', chunks=chunks)
