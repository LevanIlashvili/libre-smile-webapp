import LibreLink, {
    Link,
    LinkSession,
    LinkTransport,
  } from "@libre-chain/libre-link";
import LibreLinkBrowserTransport from "@libre-chain/libre-link-browser-transport";
import moment from "moment";


export interface User {
    actor: string;
    permission: string;
}

export interface WalletResponse {
    user: User | null;
    session: any;
    error: string;
}
  
class LibreClient {
    appName = `Libre Smile`;
    session: LinkSession | null;
    link: Link | null;
    transport: LinkTransport | null;
    nodeUrl = `http://lb.libre.org`;
    chainId = `38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465`;
    serverUrl = `https://libre-smile-api.herokuapp.com`;

    constructor() {
        this.session = null;
        this.transport = new LibreLinkBrowserTransport();;
        this.link = new LibreLink({
            transport: this.transport,
            chains: [
              {
                chainId: String(this.chainId),
                nodeUrl: String(this.nodeUrl),
              },
            ],
            scheme: 'libre',
          });    
    }

    login = async (): Promise<WalletResponse | undefined> => {
        try {
            this.link = new LibreLink({
                transport: new LibreLinkBrowserTransport(),
                chains: [
                {
                    chainId: String(this.chainId),
                    nodeUrl: String(this.nodeUrl),
                },
                ],
                scheme: 'libre',
            });
            const identity = await this.link.login(this.appName);
            this.session = identity.session;
            console.log(JSON.stringify({
                actor: identity.session.auth.actor.toString(),
                permission: identity.session.auth.permission.toString(),
            }));
            return {
                user: {
                    actor: identity.session.auth.actor.toString(),
                    permission: identity.session.auth.permission.toString(),
                },
                session: identity.session,
                error: "",
            };
        } catch (e: any) {
            return {
                user: null,
                session: null,
                error: e.message || "An error has occurred while logging in",
            };
        }
    };

    confirmSmile = async (username: string) => {
        const requestOptions = {
            body: JSON.stringify({
                username,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }
        await fetch(`${this.serverUrl}/transfer`, requestOptions);
    }
}

export default new LibreClient();