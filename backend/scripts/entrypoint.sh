#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

postgres_ready() {
python << END
import socket
import time
import os

db_port = int(os.environ["POSTGRES_PORT"])
db_host = os.environ["POSTGRES_HOST"]

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
while True:
    try:
        s.connect((db_host, db_port))
        s.close()
        break
    except socket.error as ex:
        time.sleep(0.1)
END
}

until postgres_ready; do
  >&2 echo "Waiting for PostgreSQL to become available..."
  sleep 1
done

>&2 echo "PostgreSQL is available"

alembic upgrade head

exec "$@"