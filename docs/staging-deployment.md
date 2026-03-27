# Staging Deployment

This project can run `production` and `staging` on the same VPS if they live in separate directories and use different published ports.

## Suggested layout

- Production path: `/root/Ecommerce`
- Staging path: `/root/Ecommerce-staging`

## Branches

- `main` -> production deploy job
- `staging` -> staging deploy job

## GitHub Actions variables

- Repository variable `ENABLE_DEPLOY=true` enables production deploys
- Repository variable `ENABLE_STAGING_DEPLOY=true` enables staging deploys

## GitHub environment secrets

Create a `production` environment with:

- `VPS_HOST`
- `VPS_PORT`
- `VPS_USERNAME`
- `VPS_APP_PATH`
- `VPS_SSH_KEY`

Create a `staging` environment with the same secret names, but point `VPS_APP_PATH` to the staging directory.

## Environment files

Use:

- [.env.production.example](/c:/Users/sonio/Desktop/Personal/Testing-20260316T132458Z-1-001/Testing/VisualStudioProjects/E-commerce/.env.production.example)
- [.env.staging.example](/c:/Users/sonio/Desktop/Personal/Testing-20260316T132458Z-1-001/Testing/VisualStudioProjects/E-commerce/.env.staging.example)

Typical staging ports on the same VPS:

- app HTTP: `8080`
- app HTTPS: `8443`
- postgres: `5433`

## Example staging bootstrap on the VPS

```bash
git clone -b staging https://github.com/<owner>/Ecommerce.git /root/Ecommerce-staging
cd /root/Ecommerce-staging
cp .env.staging.example .env
docker compose up -d --build
```

## Notes

- The current setup lets staging and production coexist on one VPS without container-name conflicts.
- Because production already owns standard ports `80/443`, the simplest staging URL is `http://staging.gamereason.sbs:8080`.
- The `8443` port can stay published for future experiments, but it should not be the default public health/test target on a shared single-VPS setup.
- If you want `https://staging.gamereason.sbs` on standard `443` without a custom port, add a shared edge proxy later.
