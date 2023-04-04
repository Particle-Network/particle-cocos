import {find, _decorator, Component,log, Event, Node, Button, EventHandler ,color , Label} from 'cc';
const { ccclass, property } = _decorator;
import Web3 from 'web3/dist/web3.min.js';

@ccclass('Particle')
export class Particle extends Component {
  
    @property
    public particle: any  =void 0;
    @property
    public web3: any  =void 0;
    @property
    private account: string = '';

    @property 
    private isLogin:boolean = false;




    start() {
        console.log('Hello Particle');
        // @ts-ignore
        const { ParticleNetwork, WalletEntryPosition }  = window.globalThis.particleAuth ;
        // @ts-ignore
        const { ParticleProvider } =window.globalThis.particleProvider;
        const particle =  new ParticleNetwork({
            projectId: 'your project id',
            clientKey: 'your client key',
            appId: 'your appid',
            chainName: 'Ethereum',
            chainId: 1,
            securityAccount: {
                promptSettingWhenSign: 0,
                promptMasterPasswordSettingWhenLogin: 0,
            },
            wallet: {
                displayWalletEntry: true,
                defaultWalletEntryPosition: WalletEntryPosition.BR,
                customStyle: undefined,
            },
        })
        const particleProvider = new ParticleProvider(particle.auth);
        this.particle = particle;
        // @ts-ignore
        const web3 = new Web3(particleProvider as any | ParticleProvider);
        console.log(web3);
        this.web3 = web3;
        this.isLogin = particle && particle.auth.isLogin();
        if(this.isLogin){ 
            (async ()=>{
                const accounts = await web3.eth.getAccounts();
                this.loginCall(accounts[0]);
            })()
         
        }else{
            this.logoutCall()
        }
    }
    loginCall(account:string){
        // @ts-ignore
        const containerNode = find('Canvas/container');
        const loginNode = containerNode?.getChildByName('login');
        const logoutNode = containerNode?.getChildByName('logout');
        const personalSignNode = containerNode?.getChildByName('personalSign');
        const signTypedDataV4Node = containerNode?.getChildByName('signTypedDataV4');
        const sendTransactionNode = containerNode?.getChildByName('sendTransaction');
        const accountNode = containerNode?.getChildByName('account');

        if(loginNode) loginNode.active =false;
        if(logoutNode) logoutNode.active =true;
        if(personalSignNode) personalSignNode.active =true;
        if(signTypedDataV4Node) signTypedDataV4Node.active =true;
        if(sendTransactionNode) sendTransactionNode.active =true;
        if(accountNode){
            console.log(accountNode)
            accountNode.active =true;
            const label = accountNode.getComponent(Label);
            label  && (label.string = account)
            // accountNode.string = account;
            console.log('account change:',account)
           }
    }
    logoutCall(){
           // @ts-ignore
           const containerNode = find('Canvas/container');
           const loginNode = containerNode?.getChildByName('login');
           const logoutNode = containerNode?.getChildByName('logout');
           const personalSignNode = containerNode?.getChildByName('personalSign');
           const signTypedDataV4Node = containerNode?.getChildByName('signTypedDataV4');
           const sendTransactionNode = containerNode?.getChildByName('sendTransaction');
           const accountNode = containerNode?.getChildByName('account');

           if(loginNode) loginNode.active =true;
           if(logoutNode) logoutNode.active =false;
           if(personalSignNode) personalSignNode.active =false;
           if(signTypedDataV4Node) signTypedDataV4Node.active =false;
           if(sendTransactionNode) sendTransactionNode.active =false;
           if(accountNode) accountNode.active =false;
    }

    update(deltaTime: number) {
        
    }

    loginCallback (event: Event, customEventData: string) {
        console.log(event.target)
        const nodeDom =  event.target;

        this.particle.auth
        .login({
            preferredAuthType: 'google',
            account: '',
            supportAuthTypes: 'all',
            socialLoginPrompt: 'consent',
            loginFormMode:  true,
            hideLoading:false,
        })
        .then((userInfo:any) => {
            console.log(userInfo)
            this.isLogin = true;
            this.web3.eth.getAccounts((error: any, accounts: any[]) => {
                if (error) throw error;
                const account = accounts[0];
                console.log('Address: ',account);
                window.alert('Address: \n'+account)
                this.account = account;
                this.loginCall(account);

            });

            this.destroy()
        })
        .catch((error: any) => {
            console.log('connect wallet', error);
            if (error.code !== 4011) {
                console.error(error.message);
            }
        });
    }

    logoutCallback(event?: Event, customEventData?: string){
 

        console.log('click logout')
        this.particle.auth
            .logout(true)
            .then(() => {
                this.isLogin = false;
                console.log('logout success')
                this.logoutCall();
            })
            .catch((err:any) => {
                console.log('logout error', err);
            })

    }

    async personalSign(event?: Event, customEventData?: string){
        const personalSignMessage =
        'Hello Particle Network!💰💰💰 \n\nThe fastest path from ideas to deployment in a single workflow for high performance dApps. \n\nhttps://particle.network';
        const accounts = await this.web3.eth.getAccounts();
        this.web3.eth.personal
        .sign(  personalSignMessage, accounts[0])
        .then((result:any) => {
            console.log('personal_sign success:',  JSON.stringify(result));
            window.alert('personal_sign: \n' + result)
        })
        .catch((error:AnalyserNode) => {
            console.error('personal_sign error:' , JSON.stringify(error) );
        });
    }

    async signTypedDataV4() {
        const payloadV4 = {
            types: {
                EIP712Domain: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'version',
                        type: 'string',
                    },
                    {
                        name: 'chainId',
                        type: 'uint256',
                    },
                    {
                        name: 'verifyingContract',
                        type: 'address',
                    },
                ],
                Order: [
                    {
                        name: 'exchange',
                        type: 'address',
                    },
                    {
                        name: 'maker',
                        type: 'address',
                    },
                    {
                        name: 'taker',
                        type: 'address',
                    },
                    {
                        name: 'makerRelayerFee',
                        type: 'uint256',
                    },
                    {
                        name: 'takerRelayerFee',
                        type: 'uint256',
                    },
                    {
                        name: 'makerProtocolFee',
                        type: 'uint256',
                    },
                    {
                        name: 'takerProtocolFee',
                        type: 'uint256',
                    },
                    {
                        name: 'feeRecipient',
                        type: 'address',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'target',
                        type: 'address',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticTarget',
                        type: 'address',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                    {
                        name: 'paymentToken',
                        type: 'address',
                    },
                    {
                        name: 'basePrice',
                        type: 'uint256',
                    },
                    {
                        name: 'extra',
                        type: 'uint256',
                    },
                    {
                        name: 'listingTime',
                        type: 'uint256',
                    },
                    {
                        name: 'expirationTime',
                        type: 'uint256',
                    },
                    {
                        name: 'salt',
                        type: 'uint256',
                    },
                    {
                        name: 'nonce',
                        type: 'uint256',
                    },
                ],
            },
            primaryType: 'Order',
            domain: {
                name: 'LifeForm Exchange Contract',
                version: '2.3',
                chainId: '97',
                verifyingContract: '0x9407Ec32b440aEcbDbC1Ff93324Af5FE626D4dd3',
            },
            message: {
                exchange: '0x9407Ec32b440aEcbDbC1Ff93324Af5FE626D4dd3',
                maker: '0x2CeD4F9bBfcD178F7Cf0F949249cd1C3b649bDb7',
                taker: '0x0000000000000000000000000000000000000000',
                makerRelayerFee: 50,
                takerRelayerFee: 0,
                makerProtocolFee: 0,
                takerProtocolFee: 0,
                feeMethod: 1,
                side: 1,
                saleKind: 0,
                target: '0xC4f609c43448b462a042e5E5E9E2100D070A0E04',
                howToCall: 0,
                calldata:
                    '0xf242432a0000000000000000000000002ced4f9bbfcd178f7cf0f949249cd1c3b649bdb70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025b378602000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
                replacementPattern:
                    '0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
                staticTarget: '0x0000000000000000000000000000000000000000',
                staticExtradata: '0x',
                paymentToken: '0x4f500465c89c2f8A44D1142e02338534C0c421be',
                basePrice: '1000000000000000000',
                extra: 0,
                listingTime: 1666347130,
                expirationTime: 1666606330,
                salt: '1666347130000',
                feeRecipient: '0xfE517e9d1E74787660a3202D3916367c6e363f2e',
                nonce: '0',
            },
        };
        const accounts = await this.web3.eth.getAccounts();
        const from = accounts[0];
        try {
            const params = [from,JSON.stringify(payloadV4)];
            const method = 'eth_signTypedData_v4';
            this.web3.currentProvider
                .request({
                    method,
                    params,
                })
                .then((result:any) => {
                    console.log('signTypedData_v4 result', result);
                    window.alert('signTypedData_v4:\n' + result)
                })
                .catch((err:any) => {
                    console.log('signTypedData_v4 error', err);
                });
        } catch (error:any) {
            console.error(error)
        }
    };


    async sendTransaction() {
        const address = '0x6Bc8fd522354e4244531ce3D2B99f5dF2aAE335e';
        const amount = '0.001';
        const amountWei = this.web3.utils.toWei(amount,'ether');
        const accounts = await this.web3.eth.getAccounts();

        try {
            const txnParams = {
                from: accounts[0],
                to: address,
                value: amountWei,
                type: '0x0',
                gasLimit: 21000,
            };
            this.web3.eth.sendTransaction(txnParams, (error: any, hash: string) => {
                console.log('sendTransaction', error, hash);
                if (error) {
                    if (error.code !== 4011) {
                        console.error(error.message);
                    }
                } else {
                    window.alert('sendTransaction: \n'+ hash)
                    console.log(error)
                }
            });
        } catch (error: any) {
            console.log(error)
        }
    };

}

