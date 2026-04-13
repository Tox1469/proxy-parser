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
