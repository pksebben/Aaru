import logging

from twisted.internet import endpoints, reactor
from twisted.python import log
from twisted.web import server, wsgi

logger = logging.getLogger(__name__)

def run(app, address, debug):
    def err_shutdown(failure):
        log.err(failure)
        reactor.callWhenRunning(reactor.stop)

    def _run():
        reactor.suggestThreadPoolSize(20)
        resource = wsgi.WSGIResource(reactor, reactor.getThreadPool(), app)
        site = server.Site(resource)
        endpoint = endpoints.serverFromString(reactor, address)
        endpoint.listen(site).addErrback(err_shutdown)
        reactor.run(installSignalHandlers=int(not debug))

    logger.info('event=\'starting twisted\' debug=%r address=%r',
                debug, address)

    if debug:
        import werkzeug.serving
        import werkzeug.debug
        app = werkzeug.debug.DebuggedApplication(app, evalex=True)
        werkzeug.serving.run_with_reloader(_run)
    else:
        _run()
