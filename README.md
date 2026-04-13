[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/proxy-parser/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/proxy-parser/actions)
[![License](https://img.shields.io/github/license/Tox1469/proxy-parser?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/proxy-parser?style=flat-square)](https://github.com/Tox1469/proxy-parser/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/proxy-parser?style=flat-square)](https://github.com/Tox1469/proxy-parser/stargazers)

---

# proxy-parser

Parser universal de strings de proxy. Aceita formatos URL (`http://user:pass@host:port`) e colon-separated (`host:port:user:pass`).

## Instalação

```bash
npm install proxy-parser
```

## Uso

```ts
import { parseProxy, formatProxy, parseList } from "proxy-parser";

parseProxy("socks5://user:pass@1.2.3.4:1080");
parseProxy("1.2.3.4:8080");
parseProxy("1.2.3.4:8080:user:pass");

formatProxy({ protocol: "http", host: "1.2.3.4", port: 8080 });
parseList(fileContents);
```

## API

- `parseProxy(str)` — retorna `ParsedProxy`
- `formatProxy(parsed)` — serializa para URL
- `parseList(multiline)` — parse de lista (ignora comentários `#`)

## Licença

MIT