# Code assessment (Frontend)

[Used template](https://github.com/FrameMuse/react-template) with minor updates, which means a bit changed template.

## Testing

```bash
# Run test suit
$ npm run test
# Run test suit with coverage
$ npm run test:cov
```

## Docker

There is configuration [`Dockerfile`](./Dockerfile).

To build and run image for production

```bash
# Build image with production target
$ docker build ./ --target production
# Run image
$ docker run [IMAGE]
```
