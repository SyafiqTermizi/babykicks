FROM python:3.12.11-slim-bullseye AS python-build-stage

# Install apt packages
RUN apt-get update && apt-get install --no-install-recommends -y \
    # dependencies for building Python packages
    build-essential \
    # psycopg2 dependencies
    libpq-dev

COPY pyproject.toml ./

WORKDIR /app/
RUN pip install poetry && poetry self add poetry-plugin-export && poetry export --with development --output requirements.txt
RUN pip wheel --wheel-dir /usr/src/app/wheels  -r requirements.txt

FROM python:3.12.11-slim-bullseye AS python-run-stage

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app/

RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY --from=python-build-stage /usr/src/app/wheels  /wheels/

RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
    && rm -rf /wheels/

COPY backend/scripts/entrypoint.sh /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]