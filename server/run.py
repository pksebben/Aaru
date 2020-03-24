import logging, sys
import structlog
from structlog import twisted
from structlog.twisted import LoggerFactory
from twisted.python import log
from twisted.internet import task, reactor

import app, container, config, db

logger = structlog.get_logger()

def main():
    app.init()
    db.init(app.app)
    container.run(app.app, config.endpoint, config.debug)

if __name__ == "__main__":
    structlog.configure(
        processors = [twisted.EventAdapter()],
        logger_factory=twisted.LoggerFactory(),
        wrapper_class=twisted.BoundLogger,
        cache_logger_on_first_use=True
    )

    log.startLogging(sys.stderr)

    main()


