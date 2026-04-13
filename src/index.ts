// proxy-parser: parse proxy strings (http/https/socks4/socks5 with optional auth)
export type ProxyProtocol = "http" | "https" | "socks4" | "socks5";

export interface ParsedProxy {
  protocol: ProxyProtocol;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

const PROTOS: ProxyProtocol[] = ["http", "https", "socks4", "socks5"];

export function parseProxy(input: string): ParsedProxy {
  if (!input || typeof input !== "string") throw new Error("Empty proxy string");
  let raw = input.trim();
  let protocol: ProxyProtocol = "http";

  const schemeMatch = raw.match(/^([a-zA-Z0-9]+):\/\//);
  if (schemeMatch) {
    const p = schemeMatch[1].toLowerCase() as ProxyProtocol;
    if (!PROTOS.includes(p)) throw new Error("Unsupported protocol: " + p);
    protocol = p;
    raw = raw.slice(schemeMatch[0].length);
  }

  let username: string | undefined;
  let password: string | undefined;

  // URL style: user:pass@host:port
  const atIdx = raw.lastIndexOf("@");
  if (atIdx !== -1) {
    const auth = raw.slice(0, atIdx);
    raw = raw.slice(atIdx + 1);
    const colon = auth.indexOf(":");
    if (colon === -1) {
      username = decodeURIComponent(auth);
    } else {
      username = decodeURIComponent(auth.slice(0, colon));
      password = decodeURIComponent(auth.slice(colon + 1));
    }
  }

  // Remaining: host:port OR host:port:user:pass (colon-separated)
  const parts = raw.split(":");
  if (parts.length < 2) throw new Error("Missing port");
  const host = parts[0];
  const port = Number(parts[1]);
  if (!host) throw new Error("Missing host");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid port");

  if (parts.length === 4 && username === undefined) {
    username = parts[2];
    password = parts[3];
  } else if (parts.length > 2 && parts.length !== 4 && username === undefined) {
    throw new Error("Invalid proxy format");
  }

  return { protocol, host, port, username, password };
}

export function formatProxy(p: ParsedProxy): string {
  const auth = p.username
    ? `${encodeURIComponent(p.username)}${p.password ? ":" + encodeURIComponent(p.password) : ""}@`
    : "";
  return `${p.protocol}://${auth}${p.host}:${p.port}`;
}

export function parseList(list: string): ParsedProxy[] {
  return list
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map(parseProxy);
}
